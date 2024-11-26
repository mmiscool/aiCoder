#!/usr/bin/env node
import {
    displayMenu,
    clearTerminal,
    printAndPause,
    input,
    getFilePath,
    launchNano,
    pressEnterToContinue,
    menuPrompt
} from './terminalHelpers.js';
import { intelligentlyMergeSnippets } from './intelligentMerge.js';
import { setupLLM } from './llmCall.js';
import { readFile, readOrLoadFromDefault, writeFile, } from './fileIO.js';
import { aiAssistedCodeChanges, implementSpecificClassMethod, loopAIcodeGeneration } from './aiAssistedCodeChanges.js';

import { spawn } from 'child_process';
import { getMethodsWithArguments, getStubMethods, showListOfClassesAndFunctions } from './classListing.js';
import './gitnoteSetup.js';
import {setupServer} from './apiServer.js';



export const debugMode = false;


// graceful shutdown
process.on('SIGINT', () => {
    printAndPause("\nExiting gracefully...");
    process.exit(0); // Exit with a success code
});


//Current target file
export const ctx = {};

ctx.targetFile = process.argv[2];
ctx.skipApprovingChanges = false;
ctx.getLastPrompt = async function () { return await readFile('./.aiCoder/last-prompt.md') };
ctx.setLastPrompt = function (prompt) {
    writeFile('./.aiCoder/last-prompt.md', prompt);
};



export async function getPremadePrompts() {
    const fileContent = await readOrLoadFromDefault('./.aiCoder/premade-prompts.md', '/prompts/premade-prompts.md');
    // read the file and place each line in an array. Ignore empty lines and lines starting with #
    const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

    // loop over each line and create a menu option
    const premadePrompts = lines.map((line, index) => {
        return {
            name: line,
            exitAfter: true,
            action: async function () {
                ctx.setLastPrompt(line);
                await aiAssistedCodeChanges(line);
            }
        }
    });


    return premadePrompts;
}





async function mainLoop(params) {
    if (!ctx.targetFile) ctx.targetFile = await getFilePath();
    setupServer();

    while (true) {


        const customPremadePrompts = await getPremadePrompts()


        let mainMenu = {
            name: function () {
                return `Editing: '${ctx.targetFile}'`;
            },
            options: [
                {
                    name: "Make AI assisted changes",
                    exitAfter: true,
                    action: async function () {
                        await aiAssistedCodeChanges();
                    }
                },
                {
                    name: `Repeat last prompt: ${await ctx.getLastPrompt() || 'none'}`,
                    action: async function () {
                        await aiAssistedCodeChanges(await ctx.getLastPrompt());
                    },
                },

                ...customPremadePrompts,
                "-",
                {
                    name: "Implement specific class method",
                    action: async function () {
                        const className = await input("Enter the class name:");
                        const methodName = await input("Enter the method name:");
                        const methodArgs = await input("Enter the method arguments:");
                        await implementSpecificClassMethod(className, methodName);

                    }
                },
                {
                    name: "Implement stub method (select from list)",
                    action: async function () {
                        const listOfMethods = await getStubMethods(await readFile(ctx.targetFile));
                        //console.log(listOfMethods);
                        // make a menu of the methods
                        const menuObject = {
                            name: "Select a method to implement",
                            message: "Select a method to implement",
                            options: [],
                        };

                        for (const className in listOfMethods) {
                            //console.log(className);
                            const methods = listOfMethods[className];

                            for (const { name, args } of methods) {
                                const argList = args.join(', ');
                                menuObject.options.push({
                                    name: `${className}.${name}(${argList})`,
                                    value: `${className}.${name}`,
                                    exitAfter: true,
                                    action: async function () {
                                        await printAndPause(`Implementing ${className}.${name}(${argList})`);
                                        await implementSpecificClassMethod(className, name);
                                        await printAndPause("Method implemented", 2);
                                    }
                                });
                            }
                        }

                        await console.log(menuObject);

                        const itemToWorkOn = await displayMenu(menuObject)

                        console.log(itemToWorkOn);
                    }
                },
                {
                    name: "Loop automagically",
                    exitAfter: true,
                    action: async function () {
                        await loopAIcodeGeneration(null, null, null);
                    }
                },
                {
                    name: `Loop last prompt: ${await ctx.getLastPrompt() || 'none'}`,
                    exitAfter: true,
                    action: async function () {
                        await loopAIcodeGeneration(await ctx.getLastPrompt(), null, null);
                    }
                },
                {
                    name: "Intelligently merge snippets",
                    action: async function () {
                        await intelligentlyMergeSnippets(ctx.targetFile);
                    }
                },
                {
                    name: "List classes and functions",
                    action: showListOfClassesAndFunctions
                },
                {
                    name: "Project settings",
                    options: [

                        {
                            name: "Setup LLM",
                            action: async function () {
                                await setupLLM();
                            }
                        },
                        {
                            name: "Edit pre-made prompts (requires restart)",
                            exitAfter: true,
                            action: async function () {
                                await readOrLoadFromDefault('./.aiCoder/premade-prompts.md', '/prompts/premade-prompts.md');
                                await launchNano('./.aiCoder/premade-prompts.md');
                            }
                        },
                        {
                            name: "Edit default system prompt",
                            action: async function () {
                                await readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md');
                                await launchNano('./.aiCoder/default-system-prompt.md');
                            }
                        },
                        {
                            name: "Edit snippet production prompt",
                            action: async function () {
                                await readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md');
                                await launchNano('./.aiCoder/snippet-production-prompt.md');
                            }
                        },
                        {
                            name: "Edit snippet validation prompt",
                            action: async function () {
                                await readOrLoadFromDefault('./.aiCoder/snippet-validation-prompt.md', '/prompts/snippet-validation-prompt.md');
                                await launchNano('./.aiCoder/snippet-validation-prompt.md');
                            }
                        },
                        {
                            name: "Skip approving changes (this session only)",
                            action: async function () {
                                ctx.skipApprovingChanges = true;
                            }
                        },


                    ]
                },
                "-",
                {
                    name: "Edit file",
                    action: async function () {
                        await launchNano(ctx.targetFile);
                    }
                },
                {
                    name: "Select another file",
                    action: async function () {
                        await printAndPause("Selecting a new file", 0);
                        ctx.targetFile = await getFilePath(ctx.targetFile);
                        await printAndPause(`Selected file: ${ctx.targetFile}`, 1);
                    }
                },
                "-", // spacer
                {
                    name: "Quit",
                    action: async function () {
                        await printAndPause("Quitting", 1);
                        process.exit(0);

                    }
                }
            ]
        };



        await clearTerminal();
        try {
            await displayMenu(mainMenu);
        }
        catch (error) {
            console.error(error);
            await printAndPause("An error occurred. Please try again", 10);
        }
    }
}

mainLoop();
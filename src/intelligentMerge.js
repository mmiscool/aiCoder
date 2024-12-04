import fs from 'fs';

import * as escodegen from 'escodegen';
import esprima from 'esprima-next';
import estraverse from 'estraverse';
import { ctx } from './main.js';
import { appendFile, readFile, readOrLoadFromDefault, writeFile, } from './fileIO.js';
import { createBackup } from './backupSystem.js';


import {
    clearTerminal,
    printAndPause,
    printCodeToTerminal,
} from './terminalHelpers.js';


export async function intelligentlyMergeSnippets(filename) {
    const manipulator = new codeManipulator(filename);
    await manipulator.mergeCode("   ");
}


export async function applySnippets(snippets) {
    // loop through the snippets and ask the user if they want to apply the changes
    for (let i = 0; i < snippets.length; i++) {
        // clear the terminal
        await clearTerminal();
        await printCodeToTerminal(snippets[i]);

        snippets.splice(i, 1);
        i--;
    }

    let cleanedSnippets = await snippets.join('\n\n\n\n\n', true);
    printAndPause('Changes applied');

    const manipulator = new codeManipulator(ctx.targetFile);
    await manipulator.mergeCode(cleanedSnippets);
}





export class codeManipulator {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async cleanUpDuplicates(ast) {
        const definitions = {
            classes: {}, // Store class methods and first definition
            variables: {}, // Track first occurrence and latest definition of root-level variables
            functions: {}, // Track latest occurrence of root-level functions
        };

        estraverse.traverse(ast, {
            enter(node, parent) {
                if (node.type === 'ClassDeclaration' && parent.type === 'Program') {
                    const className = node.id.name;

                    // Store the first definition of the class if not already recorded
                    if (!definitions.classes[className]) {
                        definitions.classes[className] = {
                            methods: {},
                            firstDefinition: node,
                        };
                    }

                    // Collect or replace methods from this class definition
                    node.body.body.forEach((method) => {
                        if (method.type === 'MethodDefinition') {
                            const methodName = method.key.name;
                            // Replace or store the latest occurrence of the method
                            definitions.classes[className].methods[methodName] = method;
                        }
                    });
                } else if (node.type === 'VariableDeclaration' && parent.type === 'Program') {
                    // Only track root-level variables
                    node.declarations.forEach((declaration) => {
                        const varName = declaration.id.name;

                        // If this is the first occurrence, store its position but allow replacement
                        if (!definitions.variables[varName]) {
                            definitions.variables[varName] = { firstOccurrence: node, latestDeclaration: node };
                        } else {
                            // Update the latest declaration for this variable
                            definitions.variables[varName].latestDeclaration = node;
                        }
                    });
                } else if (node.type === 'FunctionDeclaration' && parent.type === 'Program') {
                    const funcName = node.id.name;
                    // Replace or store the latest occurrence of the function
                    definitions.functions[funcName] = node;
                }
            },
        });

        // Merge methods into the first definition of each class
        Object.values(definitions.classes).forEach(({ methods, firstDefinition }) => {
            // Replace existing methods with the latest collected methods
            firstDefinition.body.body = Object.values(methods);
        });

        // Rebuild the AST body
        const newBody = [];

        ast.body.forEach((node) => {
            if (node.type === 'ClassDeclaration') {
                const className = node.id.name;
                if (node === definitions.classes[className].firstDefinition) {
                    newBody.push(node); // Add the merged first class definition
                }
            } else if (node.type === 'VariableDeclaration') {
                node.declarations.forEach((declaration) => {
                    const varName = declaration.id.name;
                    if (definitions.variables[varName] && definitions.variables[varName].firstOccurrence === node) {
                        // Insert the latest declaration at the position of the first occurrence
                        newBody.push(definitions.variables[varName].latestDeclaration);
                    }
                });
            } else if (node.type === 'FunctionDeclaration') {
                const funcName = node.id.name;
                if (definitions.functions[funcName] === node) {
                    newBody.push(node); // Add only the latest occurrence of the function
                }
            } else {
                newBody.push(node); // Retain other non-class, non-variable, and non-function nodes
            }
        });

        // Replace the AST body with the new filtered and merged body
        ast.body = newBody;
    }

    async mergeCode(newCode = '') {
        await createBackup(this.filePath);
        // read the existing file and append the new code to it
        await appendFile(this.filePath, "\n\n\n" + newCode);


        let existingAST = await this.parse();
        const newAST = await esprima.parseScript(newCode, {
            tolerant: true,
            //comment: true,
            range: true,
            loc: true,
            attachComment: true
        });

        //await clearTerminal();

        // remove trailing comments from the original code except for the last one under the particular node. Do this for the entire AST
        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.trailingComments) {
                    node.trailingComments = [];
                }
            }
        });



        await this.cleanUpDuplicates(existingAST);



        // iterate over the AST and remove adjacent duplicate leading comments. Test if the comments are the same and if they are, remove the duplicate
        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });

        // remove leading comments that start with ""... existing" being case insensitive
        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.filter(
                        (comment) => !comment.value.match(/... existing/i)
                    );
                }
            }
        });

        // if a comment includes  "New method:" remove the string "New method:" from the comment in a case insensitive way.
        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.map(
                        (comment) => {
                            return {
                                type: comment.type,
                                value: comment.value.replace(/New method:/i, '')
                            }
                        }
                    );
                }
            }
        });

        // Modify all comments to include a single space between the // and the comment text.
        // Also console.log the comment text
        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.map(
                        (comment) => {
                            return {
                                type: comment.type,
                                value: ` ${comment.value.trim()}`
                            }
                        }
                    );
                }
            }
        });



        const mergedCode = escodegen.generate(existingAST, { comment: true });
        await clearTerminal();
        console.log(mergedCode);
        await this.writeFile(mergedCode);
    }






    async removeClass(classNameToRemove) {
        const existingAST = this.parse();

        estraverse.replace(existingAST, {
            enter: (node) => {
                if (node.type === 'ClassDeclaration' && node.id.name === classNameToRemove) {
                    return estraverse.VisitorOption.Remove;
                }
            }
        });

        const updatedCode = escodegen.generate(existingAST);
        await this.writeFile(updatedCode);
    }

    async removeClassMethod(className, methodNameToRemove) {
        const existingAST = this.parse();

        estraverse.traverse(existingAST, {
            enter: (node) => {
                if (node.type === 'ClassDeclaration' && node.id.name === className) {
                    node.body.body = node.body.body.filter(
                        (method) => !(method.key.name === methodNameToRemove)
                    );
                }
            }
        });

        const updatedCode = escodegen.generate(existingAST);
        await this.writeFile(updatedCode);
    }

    async removeFunction(functionNameToRemove) {
        const existingAST = this.parse();

        estraverse.replace(existingAST, {
            enter: (node) => {
                if (node.type === 'FunctionDeclaration' && node.id.name === functionNameToRemove) {
                    return estraverse.VisitorOption.Remove;
                }
            }
        });

        const updatedCode = escodegen.generate(existingAST);
        await this.writeFile(updatedCode);
    }


    async parse() {
        return await esprima.parseScript(await this.readFile(), {
            tolerant: true,
            //comment: true,
            range: true,
            loc: true,
            attachComment: true
        });
    }




    async readFile() {
        return readFile(this.filePath);
    }

    async writeFile(newCode) {
        writeFile(this.filePath, newCode, );
    }
}

readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-validation-prompt.md', '/prompts/snippet-validation-prompt.md');





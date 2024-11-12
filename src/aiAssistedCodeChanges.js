//ai Assisted Code Changes
import { conversation } from "./llmCall.js";
import { clearTerminal, input, printAndPause, confirmAction, printCodeToTerminal, markdownToTerminal, pressEnterToContinue } from "./terminalHelpers.js";
import { ctx } from "./main.js";
import { readFile, readOrLoadFromDefault, appendFile } from "./fileIO.js";
import { extractCodeSnippets } from "./extractCodeSnippets.js";
import { intelligentlyMergeSnippets } from './intelligentMerge.js';

export async function aiAssistedCodeChanges(premade_llmInstructionPrompt = null, skipApprovingChanges = ctx.skipApprovingChanges) {
    // load the premade prompts
    let defaultSystemPrompt = await readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md');
    let snippetProductionPrompt = await readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md');
    let snippetValidationPrompt = await readOrLoadFromDefault('./.aiCoder/snippet-validation-prompt.md', '/prompts/snippet-validation-prompt.md');

    // load the code file contents
    let codeFileContents = await readFile(ctx.targetFile);

    // initialize the conversation
    const chat = await new conversation();
    await chat.addMessage("system", defaultSystemPrompt);
    await chat.addMessage("system", "//File contents: \n\n\n" + codeFileContents);
    await chat.addMessage("system", snippetProductionPrompt);

    await clearTerminal();
    // Loop for conversation with the AI
    while (true) {

        console.log(`Editing: '${ctx.targetFile}'`);
        console.log("q to quit, Enter to continue");
        let llmInstructionPrompt = premade_llmInstructionPrompt || await input("What would you like me to do?");

        if (llmInstructionPrompt === '') break;
        if (llmInstructionPrompt === 'q') return;

        await chat.addMessage("user", llmInstructionPrompt);

        await markdownToTerminal(await chat.callLLM());

        // break out of the loop if using a premade prompt
        if (premade_llmInstructionPrompt) break;

    }

    let lastLlmResponse = '';

    // automatically check the code snippets for valid formatting
    for (let i = 0; i < 3; i++) {
        lastLlmResponse = await chat.lastMessage();
        // send snippet validation prompt
        await chat.addMessage("system", snippetValidationPrompt);
        const snippetValidationResult = await chat.callLLM();

        // check if snippetValidationResult starts with yes in a case insensitive way
        if (snippetValidationResult.toLowerCase().startsWith('yes')) {
            break;
        }
    }

    // extract the code snippets from the laseLllmResponse variable
    let codeSnippets = extractCodeSnippets(lastLlmResponse);

    // apply the code snippets
    await applySnippets(codeSnippets, skipApprovingChanges);

}





export async function applySnippets(snippets, skipApprovingChanges = false) {
    // loop through the snippets and ask the user if they want to apply the changes
    for (let i = 0; i < snippets.length; i++) {
        // clear the terminal
        await clearTerminal();
        printCodeToTerminal(snippets[i]);

        let applySnippet = skipApprovingChanges;
        if (applySnippet === false) applySnippet = await confirmAction('Apply the following code snippet?');
        await printAndPause(applySnippet, .3);

        if (!applySnippet) {
            snippets.splice(i, 1);
            i--;
        }
    }


    // append the snippets to the code
    await appendFile(ctx.targetFile, '\n\n\n\n\n' + snippets.join('\n\n\n\n\n', true));
    console.log('Changes applied');

    // run the merge and format classes function
    await intelligentlyMergeSnippets(ctx.targetFile);
}





export async function loopAIcodeGeneration(textPrompt = null, numberOfIterations = null, skipApprovingChanges = null) {
    //await printAndPause('Starting loopAIcodeGeneration', 5);
    const magicPrompt = 'Identify any missing stub functions that need to be implemented and implement the first 5. ';
    numberOfIterations = numberOfIterations || await input("How many iterations would you like to run?", 5);
    if (skipApprovingChanges === null) skipApprovingChanges = await confirmAction('Skip approving changes (this session only)?');


    textPrompt = textPrompt || await input("What would you like me to do?", magicPrompt);

    for (let i = 0; i < numberOfIterations; i++) {
        await aiAssistedCodeChanges(textPrompt, skipApprovingChanges);
        await printAndPause(`Finished loop ${i} of ${numberOfIterations}`, 5);
        await clearTerminal();
    }

    await printAndPause("Finished", 5);
}   
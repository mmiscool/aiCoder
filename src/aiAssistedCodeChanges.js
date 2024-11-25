//ai Assisted Code Changes
import { conversation } from "./llmCall.js";
import { clearTerminal, input, printAndPause, confirmAction, printCodeToTerminal, markdownToTerminal, pressEnterToContinue } from "./terminalHelpers.js";
import { ctx } from "./main.js";
import { readFile, readOrLoadFromDefault, writeFile } from "./fileIO.js";
import { extractCodeSnippets } from "./extractCodeSnippets.js";
import { codeManipulator } from './intelligentMerge.js';

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
    await chat.addMessage("user", "//File contents: \n\n\n" + codeFileContents);
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
        await ctx.setLastPrompt(llmInstructionPrompt);
        await markdownToTerminal(await chat.callLLM());
        await printAndPause("done producing snippets", 5);


        // break out of the loop if using a premade prompt
        if (premade_llmInstructionPrompt) break;

    }




    const forceSnippetsFormat = `Convert all snippets to this format. Omit any methods that are not changed:
    \`\`\`javascript
    class exampleClass {
       // ... existing code
       exampleMethod(){
          //example code
       }
    }

    
    \`\`\`
    `;
    await chat.addMessage("user", forceSnippetsFormat);

    await chat.callLLM()
    await markdownToTerminal(await chat.lastMessage());



    let lastLlmResponse = await chat.lastMessage();

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
        await printCodeToTerminal(snippets[i]);

        let applySnippet = skipApprovingChanges;
        if (applySnippet === false) applySnippet = await confirmAction('Apply the following code snippet?');
        await printAndPause(applySnippet, .3);

        if (!applySnippet) {
            snippets.splice(i, 1);
            i--;
        }
    }

    let cleanedSnippets = await snippets.join('\n\n\n\n\n', true);
    //cleanedSnippets = await convertMonkeyPatchesToClasses(cleanedSnippets);
    //cleanedSnippets = await extractClassesAndFunctions(cleanedSnippets);

    // append the snippets to the code
    //await appendFile(ctx.targetFile, '\n\n\n\n\n' + cleanedSnippets);
    console.log('Changes applied');

    const manipulator = new codeManipulator(ctx.targetFile);
    await manipulator.mergeCode(cleanedSnippets);
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




export async function implementSpecificClassMethod(className, methodName) {
    const promptString = `Identify the ${methodName} method in the ${className} class. Implement it. 
Only modify the ${className} class. No code for any other class should be generated. 
Only work on the Wire class. Do not touch any other class.
Only work on the Wire class. Do not touch any other class. 
Only work on the Wire class. Do not touch any other class.`

    await aiAssistedCodeChanges(promptString);
}
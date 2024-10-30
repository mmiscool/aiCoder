#!/usr/bin/env node
// mergeClasses.js
import fs from 'fs';
import path, { relative } from 'path';
import * as acorn from 'acorn-loose';
import * as astring from 'astring';
import prettier from 'prettier';

import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import { clearTerminal, printCodeToTerminal, input, confirmAction, printAndPause, selectListHeight, menuPrompt, launchNano } from './terminalHelpers.js';
import { printDebugMessage } from './debugging.js';
import { extractCodeSnippets } from './extractCodeSnippets.js';
import { readFile, writeFile, appendFile, convertToRelativePath, createFolderIfNotExists } from './fileIO.js';
import { getFilePath, filePathArg } from './fileSelector.js';
import { callLLM, setupLLM } from './llmCall.js';
import { restoreFileFromBackup, } from './backupSystem.js';


// Check for a command-line argument for the file path

export const debugMode = false;


// make a hidden settings folder in the current directory
if (!fs.existsSync('.aiCoder')) {
  fs.mkdirSync('.aiCoder');
}



marked.setOptions({
  renderer: new TerminalRenderer(),
});








// Main export async function to handle parsing, modifying, and formatting the code
export async function mergeAndFormatClasses() {
  const filePath = await getFilePath();

  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse into AST with loose parsing
  let ast;
  try {
    ast = acorn.parse(fileContent, { sourceType: 'module', ecmaVersion: 'latest' });
    printDebugMessage('AST parsing successful');
  } catch (error) {
    console.error("Parsing error:", error.message);
    process.exit(1);
  }

  // Helper function to merge methods from one class into another
  function mergeClassMethods(targetClass, sourceClass) {
    const targetMethods = new Map(targetClass.body.body.map(method => [method.key.name, method]));
    sourceClass.body.body.forEach(method => {
      targetMethods.set(method.key.name, method); // Replace or add method
    });
    targetClass.body.body = Array.from(targetMethods.values()); // Update the methods list
  }

  // Traverse AST to collect and merge classes and functions
  const classesByName = new Map();
  const functionsByName = new Map();
  const newBody = [];

  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name;
      printDebugMessage(`Processing class: ${className}`);

      if (classesByName.has(className)) {
        // Duplicate class found, merge with the existing class
        const existingClass = classesByName.get(className);
        printDebugMessage(`Merging duplicate class: ${className}`);
        mergeClassMethods(existingClass, node);
      } else {
        // First occurrence of the class
        classesByName.set(className, node);
        newBody.push(node); // Add only the first occurrence
        printDebugMessage(`Added class: ${className}`);
      }
    } else if (node.type === 'FunctionDeclaration') {
      const functionName = node.id.name;
      printDebugMessage(`Processing function: ${functionName}`);

      // Track only the latest instance of each function
      functionsByName.set(functionName, node);
    } else {
      // Add non-class, non-function nodes as is
      newBody.push(node);
    }
  });

  // Add the latest instance of each function to the body
  functionsByName.forEach(functionNode => {
    newBody.push(functionNode);
  });

  // Replace the AST body with the merged classes and functions
  ast.body = newBody;

  // Generate code from the modified AST
  try {
    let updatedCode = astring.generate(ast);

    // Format the code with Prettier
    updatedCode = await prettier.format(updatedCode, {
      parser: 'babel',
      tabWidth: 4,         // Customize as needed
      useTabs: false,
      printWidth: 80,
      endOfLine: 'lf',
      semi: true,
      singleQuote: true
    });

    // Custom post-process to add extra lines between classes and functions
    updatedCode = addCustomSpacing(updatedCode);

    // Write formatted code back to the file
    await writeFile(filePath, updatedCode, true);
    console.log(`Classes and functions in ${filePath} merged and formatted successfully.`);
  } catch (error) {
    console.error("Error during code generation or formatting:", error.message);
  }
}


// Function to add custom spacing between classes and functions
function addCustomSpacing(code) {
  // Add 2 blank lines between class declarations
  code = code.replace(/}\nclass /g, '}\n\n\nclass ');

  // Add 1 blank line between methods inside classes
  code = code.replace(/}\n\s*(\w+\s*\()/g, '}\n\n    $1');

  return code;
}




export async function mainUI() {
  while (true) {
    await clearTerminal();
    await getFilePath();
    await clearTerminal();

    console.log(`Current file: (${convertToRelativePath(filePathArg)})`);

    let choices = [
      'Make AI assisted code changes',
      'Identify missing or incomplete functionality and add it',
      ...await getPremadePrompts(),
      'Merge and format classes',
      '-',
      'Project settings',
      'Restore file from backup',
      '-',
      'Select a different file',
      'Exit'
    ];


    let action = await menuPrompt({
      message: 'Select an action:',
      choices
    });


    if (action === 'Project settings') {
      await clearTerminal();
      action = await menuPrompt({
        message: 'Settings:',
        choices: [
          'Setup LLM',
          'Edit pre-made prompts',
          'Edit default system prompt',
          '-',
          'Back to main menu'
        ]
      });
    }


    if (action === 'Merge and format classes') {
      await mergeAndFormatClasses();
    }
    else if (action === 'Make AI assisted code changes') {
      await aiAssistedCodeChanges();
    }
    else if (action === 'Setup LLM') {
      await setupLLM();
    }

    else if (action === 'Edit pre-made prompts') {
      await launchNano('./.aiCoder/premade-prompts.txt');
    }
    else if (action === 'Edit default system prompt') {
      // test if the file exists and create it if it doesn't
      if (!fs.existsSync('./.aiCoder/default-system-prompt.txt')) {
        await writeFile('./.aiCoder/default-system-prompt.txt', defaultSystemPrompt);
      }
      await launchNano('./.aiCoder/default-system-prompt.txt');
    }
    else if (action === 'Select a different file') {
      await getFilePath(true);
    } else if (action === `Restore file from backup`) {
      await restoreFileFromBackup();
    } else if (action === 'Exit') {
      process.exit(0);
    } else {
      if (action !== '') await aiAssistedCodeChanges(action);
    }
  }
}

mainUI();


export async function getPremadePrompts() {
  const filePath = './.aiCoder/premade-prompts.txt';

  // if file does not exist return an empty array
  if (!fs.existsSync(filePath)) {
    // Create the file if it doesn't exist

    console.log('Creating pre-made prompts file');
    await writeFile(filePath,
      `# Add your pre-made prompts here
# Each custom prompt must all be on a single line.
# Lines starting with # are ignored.`);

    return [];

  }

  // read the file and place each line in an array. Ignore empty lines and lines starting with #
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
  return lines;
}

let defaultSystemPrompt = `
You are an expert with javascript, NURBS curves and surfaces, and 3D modeling. 
You are creating functions that will be part of a 3D modeling library.
`;


let lastResponse = '';
export async function aiAssistedCodeChanges(premadePrompt = false) {
  // AI assisted code changes
  printDebugMessage('AI assisted code changes');

  // call openAI API passing the contents of the current code file. 
  const code = await readFile(filePathArg);

  defaultSystemPrompt = await readFile('./.aiCoder/default-system-prompt.txt') || defaultSystemPrompt;

  let messages = [
    {
      role: "system",
      content: defaultSystemPrompt
    },
    {
      role: "system",
      content: `When providing code snippets include the class the function belongs to as part of your response.`
    },
    {
      role: "user",
      content: code,
    },
  ]


  // loop infinitely
  while (true) {
    let changesPrompt = '';

    if (premadePrompt) {
      changesPrompt = premadePrompt;
    } else {
      // Ask the user for the changes they want to make
      changesPrompt = await input('Tell me what you want, what you really really want (Enter to continue and merge) (q to quit) \n: ');
    }

    premadePrompt = false;



    if (changesPrompt === 'exit' || changesPrompt === 'quit' || changesPrompt === 'q') {
      break;
    }
    if (changesPrompt === '' || changesPrompt === 'apply') {
      await applyChanges();
      break;
    }

    messages.push({
      role: "user",
      content: changesPrompt,
    });


    // call the llm with the messages
    lastResponse = await callLLM(messages);
    messages.push({
      role: "assistant",
      content: lastResponse,
    });

    console.log(marked(lastResponse));
  }
}


export async function applyChanges() {
  const snippets = extractCodeSnippets(lastResponse);



  // loop through the snippets and ask the user if they want to apply the changes
  for (let i = 0; i < snippets.length; i++) {
    // clear the terminal
    await clearTerminal();
    printCodeToTerminal(snippets[i]);

    const applySnippet = await confirmAction('Apply the following code snippet?');
    await printAndPause(applySnippet);

    if (!applySnippet) {
      snippets.splice(i, 1);
      i--;
    }
  }


  // append the snippets to the code
  await appendFile(filePathArg, '\n\n\n\n\n' + snippets.join('\n\n\n\n\n', true));
  console.log('Changes applied');

  // run the merge and format classes function
  await mergeAndFormatClasses();
}







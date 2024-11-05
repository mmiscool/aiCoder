#!/usr/bin/env node
// mergeClasses.js
import fs from 'fs';
import path, { relative } from 'path';
import * as acorn from 'acorn-loose';
import * as astring from 'astring';
import prettier from 'prettier';

import './gitnoteSetup.js' ;



import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import {
  clearTerminal,
  printCodeToTerminal,
  input,
  confirmAction,
  printAndPause,
  selectListHeight,
  menuPrompt,
  launchNano,
  pressEnterToContinue,
} from './terminalHelpers.js';
import { printDebugMessage } from './debugging.js';
import { extractCodeSnippets } from './extractCodeSnippets.js';
import { readFile, writeFile, appendFile, convertToRelativePath, createFolderIfNotExists } from './fileIO.js';
import { getFilePath, filePathArg, firstLoadTryAndFindGitPath } from './fileSelector.js';
import { callLLM, setupLLM } from './llmCall.js';
import { restoreFileFromBackup, } from './backupSystem.js';
import { skip } from '@babel/traverse/lib/path/context.js';



// Check for a command-line argument for the file path

export const debugMode = false;





marked.setOptions({
  renderer: new TerminalRenderer(),
});




process.on('SIGINT', () => {
  console.log("\nExiting gracefully...");
  process.exit(0); // Exit with a success code
});



// Main export async function to handle parsing, modifying, and formatting the code
// Main export async function to handle parsing, modifying, and formatting the code
export async function mergeAndFormatClasses() {
  await organizeImportsAndDeclarations();
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

    // Merge methods, replacing or adding each method from sourceClass
    sourceClass.body.body.forEach(method => {
      targetMethods.set(method.key.name, method);
    });

    // Update the methods list in targetClass
    targetClass.body.body = Array.from(targetMethods.values());

    // Retain inheritance only if the target class does not already have it
    if (!targetClass.superClass && sourceClass.superClass) {
      targetClass.superClass = sourceClass.superClass;
    }
  }

  // Traverse AST to collect and merge classes and functions
  const classesByName = new Map();
  const functionsByName = new Map();
  const newBody = [];

  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name.toLowerCase(); // Treat class names as case-insensitive
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
      tabWidth: 4,
      useTabs: false,
      printWidth: 80,
      endOfLine: 'lf',
      semi: true,
      singleQuote: true,
      trailingComma: true,
      bracketSpacing: true,
      proseWrap: 'never',
    });
    // Ensure whitespace between classes and functions
    updatedCode = updatedCode.replace(/}\n(class|function)/g, '}\n\n$1');
    updatedCode = updatedCode.replace(/}\n(?!\n)/g, '}\n\n\n\n\n') // Adds a blank line after closing braces
      .replace(/(\b(?:class|function|const|let|var) .+?;\n)(?!\n)/g, '$1\n\n\n\n\n'); // Adds blank lines after declarations

    // Write formatted code back to the file
    await writeFile(filePath, updatedCode, true);

    console.log(`Classes and functions in ${filePath} merged and formatted successfully.`);
  } catch (error) {
    console.error("Error during code generation or formatting:", error.message);
  }
}



async function addRootLevelSpacing(code) {
  return await code
    .replace(/}\n(?!\n)/g, '}\n\n\n\n\n') // Adds a blank line after closing braces
    .replace(/(\b(?:class|function|const|let|var) .+?;\n)(?!\n)/g, '$1\n\n\n\n\n'); // Adds blank lines after declarations
};


export async function organizeImportsAndDeclarations() {
  const filePath = await getFilePath();

  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse into AST with loose parsing
  let ast;
  try {
    ast = acorn.parse(fileContent, { sourceType: 'module', ecmaVersion: 'latest' });
    console.log('AST parsing successful');
  } catch (error) {
    console.error("Parsing error:", error.message);
    process.exit(1);
  }

  // Separate imports, variable declarations, and other statements
  const importStatements = [];
  const variableDeclarations = [];
  const otherStatements = [];

  ast.body.forEach(node => {
    if (node.type === 'ImportDeclaration') {
      importStatements.push(node);
    } else if (node.type === 'VariableDeclaration') {
      variableDeclarations.push(node);
    } else {
      otherStatements.push(node);
    }
  });

  // Reorganize AST body with imports and variables at the top
  ast.body = [...importStatements, ...variableDeclarations, ...otherStatements];

  // Generate code from the modified AST
  try {
    let updatedCode = astring.generate(ast);

    // Format the code with Prettier
    updatedCode = await prettier.format(updatedCode, {
      parser: 'babel',
      tabWidth: 4,
      useTabs: false,
      printWidth: 80,
      endOfLine: 'lf',
      semi: true,
      singleQuote: true
    });


    updatedCode = await addCustomSpacing(updatedCode);
    // Write organized code back to the file
    await writeFile(filePath, updatedCode, true);
    console.log(`Imports and variable declarations in ${filePath} organized successfully.`);
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

  // Add 2 blank lines between functions
  code = code.replace(/}\nfunction /g, '}\n\n\nfunction ');



  return code;
}


let lastMenuChoice = '';
let skipApprovingChanges = false;


const magicPrompt = 'Identify missing or incomplete functionality and add it';

export async function mainUI() {
  await firstLoadTryAndFindGitPath();

  while (true) {
    await clearTerminal();
    await getFilePath();
    await clearTerminal();

    console.log(`Current file: (${convertToRelativePath(filePathArg)})`);

    let choices = [
      'Make AI assisted code changes',
      magicPrompt,
      ...await getPremadePrompts(),
      'Loop automagically',
      'Merge and format classes',
      '-',
      'List classes and functions',
      "-",
      'Project settings',
      'Restore file from backup',
      '-',
      'Select a different file',
      'Exit'
    ];


    let action = await menuPrompt({
      message: 'Select an action:',
      choices,
      default: lastMenuChoice
    });

    lastMenuChoice = action;

    if (action === 'Project settings') {
      await clearTerminal();
      action = await menuPrompt({
        message: 'Settings:',
        choices: [
          'Setup LLM',
          'Edit pre-made prompts',
          'Edit default system prompt',
          'Skip approving changes (this session only)',
          '-',
          'Back to main menu'
        ],
        default: lastMenuChoice
      });
      lastMenuChoice = action;
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
    else if (action === 'Loop automagically') {
      await loopAutomagically();
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
    } else if (action === 'Back to main menu') {
      console.log('Back to main menu');
    }
    else if (action === 'List classes and functions') {
      await showListOfClassesAndFunctions();
    }
    else if (action === 'Skip approving changes (this session only)') {
      skipApprovingChanges = true;
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
You will only only be providing javascript code snippets.
`;


async function loopAutomagically() {
  // Loop Automagically
  await clearTerminal();
  await printAndPause('Loop Automagically', 1);


  const numberOfLoops = await input('How many loops? (q to quit): ', 5);
  if (numberOfLoops === 'q') return;
  const promtToLoop = await input('What do you want to do? (q to quit): ', magicPrompt);
  if (promtToLoop === 'q') return;
  await clearTerminal();

  let oldValue = skipApprovingChanges;
  if (skipApprovingChanges === false) skipApprovingChanges = await confirmAction('Skip approving changes?');

  for (let i = 0; i < numberOfLoops; i++) {
    await aiAssistedCodeChanges(magicPrompt, true);
    const pauseTime = 20;
    await printAndPause(`Loop ${i + 1} of ${numberOfLoops} Pausing ${pauseTime} seconds . . .`, pauseTime);
  }

  skipApprovingChanges = oldValue;

  return "done";
  // call openAI API passing the contents of the current code file. 
}


let lastResponse = '';
export async function aiAssistedCodeChanges(premadePrompt = false, skipApprovingChanges = false) {
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
      content: `When providing code snippets include the class the function belongs to as part of your snippet. 
Include the class definition if you want to add or modify a function in a class.

DO NOT INCLUDE EXAMPLES OR TESTS IN YOUR CODE SNIPPETS.
DO NOT INCLUDE EXAMPLES OR TESTS IN YOUR CODE SNIPPETS.
DO NOT INCLUDE EXAMPLES OR TESTS IN YOUR CODE SNIPPETS.
      `
    },
    {
      role: "system",
      content: code,
    },
  ]


  // loop infinitely
  while (true) {
    let changesPrompt = '';

    if (premadePrompt) {
      changesPrompt = premadePrompt;
    } else if (skipApprovingChanges === false) {
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
    await clearTerminal();
    console.log("\n\n\nUser input:");
    console.log(changesPrompt);
    console.log("\n\nAI response:");
    console.log(marked(lastResponse));

    if (skipApprovingChanges) {
      await applyChanges();
      break;
    }
  }

  await printAndPause('Done prompting', 1);
}


export async function applyChanges() {
  const snippets = extractCodeSnippets(lastResponse);



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
  await appendFile(filePathArg, '\n\n\n\n\n' + snippets.join('\n\n\n\n\n', true));
  console.log('Changes applied');

  // run the merge and format classes function
  await mergeAndFormatClasses();
}




export async function showListOfClassesAndFunctions() {
  const list = await getClassAndFunctionList(await readFile(filePathArg));

  // Prompt if the user wants to include function names in the list
  const includeFunctions = await confirmAction('Include function names in the list?', false);

  // Print the list in terminal in the format: class name extends parentClass {}
  let listOfClasses = '';

  for (const className in list) {
    const { functions, superClass } = list[className];
    const extendsClause = superClass ? ` extends ${superClass}` : '';

    // Start the class declaration
    listOfClasses += `class ${className}${extendsClause} {`;

    // Optionally add function names
    if (includeFunctions) {
      listOfClasses += '\n';
      functions.forEach(func => {
        listOfClasses += `  ${func}() {}\n`;
      });
    }

    // Close the class
    listOfClasses += `}\n`; // Double newline for separation between classes
  }

  console.log(listOfClasses);

  // Prompt if the user wants to prepend the list to the file
  const prependToFile = await confirmAction('Prepend the list to the file?', false);

  if (prependToFile) {
    // Read the file
    const fileContent = await readFile(filePathArg);

    // Prepend the list to the file content
    await writeFile(filePathArg, listOfClasses + '\n\n' + fileContent);
  }


  //await press any key to continue

  //await pressEnterToContinue();

  //await printAndPause('Done', 100);
}

export function getClassAndFunctionList(code) {
  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });
  const classFunctionMap = {};

  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name;
      const superClass = node.superClass ? node.superClass.name : null;
      const functions = [];

      node.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          functions.push(classElement.key.name);
        }
      });

      classFunctionMap[className] = { functions, superClass };
    }
  });

  return classFunctionMap;
}




export function getClassAndFunctionListSorted(code) {
  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });
  const classInfo = new Map();

  // Collect information on each class and its methods, along with its parent class if it extends one
  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name;
      const parentClassName = node.superClass && node.superClass.name ? node.superClass.name : null;
      const methods = [];

      node.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          methods.push(classElement.key.name);
        }
      });

      classInfo.set(className, { className, parentClassName, methods });
    }
  });

  // Sort classes based on dependency hierarchy and alphabetically within each level
  const sortedClasses = [];
  const processedClasses = new Set();

  function addClassAndSubclasses(className) {
    if (processedClasses.has(className)) return;

    const classData = classInfo.get(className);
    if (!classData) return;

    // Add the parent class first if it exists
    if (classData.parentClassName && classInfo.has(classData.parentClassName)) {
      addClassAndSubclasses(classData.parentClassName);
    }

    // Add the current class
    sortedClasses.push(classData);
    processedClasses.add(className);
  }

  // Sort classes alphabetically before building the hierarchy
  Array.from(classInfo.keys()).sort().forEach(addClassAndSubclasses);

  // Convert sorted classes into the final output format
  const result = {};
  sortedClasses.forEach(({ className, methods }) => {
    result[className] = methods;
  });

  return result;
}

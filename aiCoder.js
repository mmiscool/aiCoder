#!/usr/bin/env node
// mergeClasses.js
import fs from 'fs';
import * as acorn from 'acorn-loose';
import * as astring from 'astring';
import prettier from 'prettier';
import inquirer from 'inquirer';
import { input, Separator } from '@inquirer/prompts';
import { OpenAI } from "openai";
import { highlight } from 'cli-highlight';
import fileSelector from 'inquirer-file-selector';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import { spawn } from 'child_process';



marked.setOptions({
  renderer: new TerminalRenderer(),
});


const debugMode = false;

// make a hidden settings folder in the current directory

if (!fs.existsSync('.aiCoder')) {
  fs.mkdirSync('.aiCoder');
}



function clearTerminal() {
  // Clears the screen buffer entirely, including scrollback history
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J\u001b[H');
}


function launchNano(filePath) {
  return new Promise((resolve, reject) => {
    const nano = spawn('nano', [filePath], { stdio: 'inherit' });

    nano.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Nano exited with code ${code}`));
      }
    });

    nano.on('error', (err) => {
      reject(new Error(`Failed to start nano: ${err.message}`));
    });
  });
}

async function printCodeToTerminal(jsCode) {
  console.log(highlight(jsCode, { language: 'javascript', theme: 'dracula' }));
}



// Check for a command-line argument for the file path
let filePathArg = process.argv[2];

async function printDebugMessage(message) {
  if (debugMode) {
    const stack = new Error().stack;
    const callerLine = stack.split("\n")[2];
    const functionName = callerLine.match(/at (\S+)/)[1];
    console.log(`Called inside function: ${functionName}`);
    console.log(message);
  }
}


// Determine file path based on argument or interactive selection
async function getFilePath() {
  if (filePathArg) {
    if (!fs.existsSync(filePathArg) || !filePathArg.endsWith('.js')) {
      console.error('Invalid file path or file is not a JavaScript file.');
      process.exit(1);
    }
    return filePathArg;
  } else {
    filePathArg = await fileSelector({
      message: 'Select a file:',
      pageSize: 20,
      filter: (filePath) => {
        printDebugMessage(filePath);
        //return true;
        if (filePath.path.includes(
          'node_modules') ||
          filePath.path.includes('.git') ||
          filePath.path.includes('.vscode')
        ) {
          return false;
        }

        // check if the file starts with a dot
        if (filePath.path.includes('/.')) {
          return false;
        }

        return true;
      }

    });


    return filePathArg;
  }
}


async function readFile(filePath) {
  printDebugMessage("Reading file:",filePath);
  return await fs.readFileSync(filePath, 'utf8');
}

async function writeFile(filePath, content) {
  printDebugMessage("Writing file:",filePath);
  await fs.writeFileSync(filePath, content, 'utf8');
}

async function appendFile(filePath, content) {
  printDebugMessage("Appending to file:",filePath);
  await fs.appendFileSync(filePath, content, 'utf8');
}




// Main async function to handle parsing, modifying, and formatting the code
async function mergeAndFormatClasses() {
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

  // Traverse AST to collect and merge classes
  const classesByName = new Map();
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
    } else {
      // Add non-class nodes as is
      newBody.push(node);
    }
  });

  // Replace the AST body with the merged classes
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
    fs.writeFileSync(filePath, updatedCode, 'utf8');
    console.log(`Classes in ${filePath} merged and formatted successfully.`);
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

// Run the async function
//mergeAndFormatClasses();



async function mainUI() {
  while (true) {
    await clearTerminal();
    await getFilePath();

    let choices = [
      'Make AI assisted code changes',
      'Identify missing or incomplete functionality and add it',
      new Separator(),
      ...await getPremadePrompts(),
      new Separator(),
      'Merge and format classes',
      'Setup openAI API key',
      'Edit pre-made prompts',
      'Select a different file',
      'Exit'
    ]

      ;

    // show a menu with options
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        pageSize: 20,
        message: 'What do you want to do?',
        choices
      }
    ]);

    if (action === 'Merge and format classes') {
      await mergeAndFormatClasses();
    }
    else if (action === 'Make AI assisted code changes') {
      await aiAssistedCodeChanges();
    }
    else if (action === 'Setup openAI API key') {
      await setupOpenAIKey(true);
    }
    else if (action === 'Edit pre-made prompts') {
      console.log('Opening nano to edit pre-made prompts');
      await launchNano('./.aiCoder/premade-prompts.txt');
    }
    else if (action === 'Select a different file') {
      filePathArg = undefined;
    }

    else if (action === 'Exit') {
      process.exit(0);
    } else {
      await aiAssistedCodeChanges(action);
    }
  }
}

mainUI();


async function getPremadePrompts() {
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


async function setupOpenAIKey(overwrite = false) {
  if (fs.existsSync('./.aiCoder/openai-key.txt') && !overwrite) {
    return fs.readFileSync('./.aiCoder/openai-key.txt', 'utf8');
  } else {
    const apiKey = await input({
      message: 'Enter your OpenAI API key:'
    });
    fs.writeFileSync('./.aiCoder/openai-key.txt', apiKey, 'utf8');
    return apiKey;
  }
}

let lastResponse = '';
async function aiAssistedCodeChanges(premadePrompt = false) {
  // AI assisted code changes
  printDebugMessage('AI assisted code changes');

  // call openAI API passing the contents of the current code file. 
  const code = await readFile(filePathArg);

  let messages = [
    {
      role: "system",
      content: `You are an expert with javascript, NURBS curves and surfaces, and 3D modeling. 
    You are creating functions that will be part of a 3D modeling library.`
    },
    {
      role: "system",
      content: `When providing code snipets include the class the function belongs to as part of your response.`
    },
    {
      role: "user",
      content: code,
    },
  ]


  // loop infinitely
  while (true) {
    let changesPrompt = '';
    if (premadePrompt == false) {
      // Ask the user for the changes they want to make
      changesPrompt = await input({
        message: 'Tell me what you want, what you really really want (Enter to continue and merge) \n: ',

      });
    } else {
      changesPrompt = premadePrompt;
      premadePrompt = false;
    }


    if (changesPrompt === 'exit') {
      break;
      process.exit(0);
    }
    if (changesPrompt === '') {
      changesPrompt = 'apply';
    }

    if (changesPrompt === 'apply') {
      await applyChanges();
      break;
    }

    messages.push({
      role: "user",
      content: changesPrompt,
    });


    // call the openAI API
    lastResponse = await getOpenAIResponse(messages);
    messages.push({
      role: "assistant",
      content: lastResponse,
    });

    console.log(marked(lastResponse));
  }
}


async function applyChanges() {
  const snipets = extractCodeSnippets(lastResponse);



  // loop through the snippets and ask the user if they want to apply the changes
  for (let i = 0; i < snipets.length; i++) {
    printCodeToTerminal(snipets[i]);

    const { apply } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'apply',
        message: `Apply the following code snippet?`
      }
    ]);

    if (!apply) {
      snipets.splice(i, 1);
      i--;
    }
  }


  // append the snippets to the code
  await appendFile(filePathArg, snipets.join('\n\n\n\n\n'));
  console.log('Changes applied');

  // run the merge and format classes function
  await mergeAndFormatClasses();
}

const openAIModel = "gpt-4o";


async function getOpenAIResponse(messages) {
  const apiKey = await setupOpenAIKey();
  let openai = new OpenAI({ apiKey });

  let responseText = '';

  const resultStream = await openai.chat.completions.create({
    model: openAIModel,
    messages,
    stream: true
  });

  for await (const chunk of resultStream) {
    const content = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(content); // Real-time printing to console
    responseText += content;
  }
  // clear the console
  clearTerminal();
  return responseText;
}




function extractCodeSnippets(markdownText) {
  const codeSnippets = [];
  const codeBlockRegex = /```[\s\S]*?```/g;

  let matches;
  while ((matches = codeBlockRegex.exec(markdownText)) !== null) {
    // Remove the backticks and any language specifier (like javascript) from the match
    const codeSnippet = matches[0].replace(/```(?:\w+)?|```/g, '').trim();

    codeSnippets.push(codeSnippet);
  }

  return codeSnippets;
}

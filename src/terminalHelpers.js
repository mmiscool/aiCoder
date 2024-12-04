import { highlight } from 'cli-highlight';
import inquirer from 'inquirer';
import { exec } from "child_process";
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import path from 'path';
import { ctx, debugMode } from './main.js';






function getCallerInfo(level = 3) {
  // Create an error object to capture the call stack
  const stack = new Error().stack;

  // Parse the stack trace to find the caller's file name and line number
  if (stack) {
    const stackLines = stack.split('\n');
    if (stackLines.length > level) {
      // Adjust for the desired level in the stack trace
      const callerInfo = stackLines[level].trim();

      // Extract the file name and line number using a regular expression
      const match = callerInfo.match(/\((.*):(\d+):\d+\)$/);
      if (match) {
        console.log(`Called from file: ${match[1]}, line: ${match[2]}`);
        return {
          fileName: match[1],
          lineNumber: parseInt(match[2], 10),
        };
      }
    }
  }

  console.log('Could not determine the caller\'s information');
  // Return null if the caller's information couldn't be determined
  return null;
}



export async function clearTerminal() {
  
  return console.log("----------------------------------------------------------------------------");

  if (ctx.ws) {
    ctx.ws.send("clear");
  }

  // Clears the screen buffer entirely, including scrollback history
  await process.stdout.write('\u001b[3J\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer up to the current line
  await process.stdout.write('\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[J');

  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[0f');
  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[0J');

}


export async function printCodeToTerminal(jsCode) {
  await console.log(await highlight(jsCode, { language: 'javascript', theme: 'dracula' }));
}


export async function printAndPause(message, secondsToPause = 2) {
  await getCallerInfo();
  return console.log(message);
  console.log(message);
  if (secondsToPause > 4) {
    return;
  } else {
    await new Promise(resolve => setTimeout(resolve, secondsToPause * 1000));
  }
}


export async function selectListHeight() {
  return process.stdout.rows - 2;
}




export async function input(promptText, defaultValue = '') {
  let promptObject = {};
  promptObject.type = 'input';
  promptObject.name = 'input';
  promptObject.message = promptText || 'Enter a value:';
  promptObject.default = defaultValue || '';
  return await (await inquirer.prompt([promptObject])).input;
}


export async function confirmAction(message, defaultValue = true) {
  let promptObject = {};
  promptObject.type = 'confirm';
  promptObject.name = 'confirm';
  promptObject.message = message || 'Are you sure?';
  promptObject.default = defaultValue;
  return await (await inquirer.prompt([promptObject])).confirm;
}


export function launchNano(filePath, lineNumber = null) {
  console.log('launchNano', filePath, lineNumber);

  // convert file path to absolute path
  filePath = path.resolve(filePath);


  const stringCommand = `code -g ${filePath}:${lineNumber}:1`;;
  console.log('stringCommand', stringCommand);
  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with VSCode:', error);
    }
  });


}



// function to press any key to continue
export async function pressEnterToContinue() {
  return await input('Press Enter to continue...');
}







// markdown pretty print
marked.setOptions({
  renderer: new TerminalRenderer(),
});

export function markdownToTerminal(markdownText) {
  console.log(marked(markdownText));
}



export async function printDebugMessage(message) {
  if (debugMode) {
    const stack = new Error().stack;
    const callerLine = stack.split("\n")[2];
    const functionName = callerLine.match(/at (\S+)/)[1];
    console.log(`Called inside function: ${functionName}`);
    console.log(message);
  }
}


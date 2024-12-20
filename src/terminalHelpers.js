import { exec } from "child_process";
import path from 'path';
import { ctx } from './main.js';
import { wss } from './apiServer.js';
import { readSetting, writeSetting } from "./fileIO.js";


export async function printDebugMessage(...message) {
  if (await readArg('-debug')) {
    //const stack = new Error().stack;
    await getCallerInfo();
    console.log(...message);
  }
}


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

  //return console.log("----------------------------------------------------------------------------");
  
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



export async function printAndPause(message, secondsToPause = 0) {
  if (await readArg('-debug')) await getCallerInfo();
  wss.clients.forEach(client => {
    client.send(message + '\n');
  });

  console.log(message);
  if (secondsToPause === 0) {
    return;
  } else {
    return await new Promise(resolve => setTimeout(resolve, secondsToPause * 1000));
  }
}


export async function printToTerminal(message) {
  process.stdout.write(message); // Real-time printing to console
  // send via websocket
  wss.clients.forEach(client => {
    client.send(message);
  });
}



export async function launchEditor(filePath, lineNumber = null) {
  // load the default editor from the setting
  const editorToUse = await readSetting('preferredEditor.txt');
  printAndPause(`Opening ${filePath} to line ${lineNumber} with ${editorToUse}`);
  if (editorToUse === 'vscode') return launchVScode(filePath, lineNumber);
  if (editorToUse === 'neovim') return launchNeovim(filePath, lineNumber);
  if (editorToUse === 'nano') return launchNano(filePath, lineNumber);
  if (editorToUse === 'vim') return launchVim(filePath, lineNumber);
  return launchVScode(filePath, lineNumber);
}

async function setEditor() {
  if (readArg('-editor')) {
    console.log('Prefered editor is set to:', await readSetting('preferredEditor.txt'));
    console.log('Options are: vscode, neovim, nano, vim');
    if (readArg('-editor') === 'vscode') await writeSetting('preferredEditor.txt', 'vscode');
    if (readArg('-editor') === 'neovim') await writeSetting('preferredEditor.txt', 'neovim');
    if (readArg('-editor') === 'nano') await writeSetting('preferredEditor.txt', 'nano');
    if (readArg('-editor') === 'vim') await writeSetting('preferredEditor.txt', 'vim');
    process.exit(0);
  }
}
setEditor();


export function launchVScode(filePath, lineNumber = null) {
  console.log('launchNano', filePath, lineNumber);

  // convert file path to absolute path
  filePath = path.resolve(filePath);


  const stringCommand = `code -g ${filePath}:${lineNumber}:1`;
  console.log('stringCommand', stringCommand);
  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with VSCode:', error);
    }
  });
}


export function launchNeovim(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Neovim
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `nvim ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Neovim:', error);
    }
  });
}

// launch regular vim 
export function launchVim(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Neovim
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `vim ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Vim:', error);
    }
  });
}


export function launchNano(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Nano
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `nano ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Nano:', error);
    }
  });
}



export function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }

  // return true if the flag is found but no value is provided
  if (index !== -1) {
    return true
  }

  return null; // Return null if the flag or its value is not found
}
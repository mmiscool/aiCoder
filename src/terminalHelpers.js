import { highlight } from 'cli-highlight';
import inquirer from 'inquirer';
import { Separator } from '@inquirer/prompts';
import { spawn, exec } from "child_process";
import fileSelector from 'inquirer-file-selector';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

import { printDebugMessage } from './debugging.js';

import fs from 'fs';
import path from 'path';


export async function clearTerminal() {

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

export async function menuPrompt(menuObject) {
  // console.log(menuObject);
  // await pressEnterToContinue();
  // replace all "-" elements with Separator
  menuObject.choices = await menuObject.choices.map((option) => {
    if (option === '-') return new Separator();
    return option;
  });
  menuObject.type = 'list';
  menuObject.name = 'action';
  menuObject.pageSize = await selectListHeight();
  menuObject.loop = false;

  // show a menu with options
  let action = await (await inquirer.prompt([menuObject])).action;

  return action;
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


export function launchNano(filePath) {
  if (isCommandAvailable('code')) return spawn('code', [filePath], { stdio: 'inherit' });


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


function isCommandAvailable(command) {
  return new Promise((resolve) => {
    const cmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;
    exec(cmd, (error) => {
      resolve(!error); // If there's no error, the command is available
    });
  });
}



// function to press any key to continue
export async function pressEnterToContinue() {
  return await input('Press Enter to continue...');
}




export async function displayMenu(menuSystem, lastSelectedName = null) {
  // Function to recursively process the menu structure
  async function processMenu(menuNode, lastSelected = null) {
    // Find the index of the last selected item by name

    while (true) {
      console.log("This is where the problem is");
      console.log(menuNode);
      console.log("This is where the problem is");
      console.log(menuNode.options);
      // Prepare the menu object with prompt text from menu name
      const menuObject = {
        message: menuNode.name, // Use menu name as the prompt text
        choices: menuNode.options.map((item) => {
          if (item === '-') return new Separator();
          return { name: item.name, value: item.name }; // Using name as value for selection matching
        }),

        default: lastSelected

      };

      // Display the menu and get the selected item by name
      await clearTerminal();

      const selectedName = await menuPrompt({ ...menuObject, default: lastSelected });
      const selectedItem = menuNode.options.find((item) => item.name === selectedName);
      lastSelected = selectedName;

      if (selectedItem.name === 'Back') {
        // If 'Back' is selected, return 'back' to exit this submenu
        return 'back';
      } else if (selectedItem.options) {
        if (!selectedItem.options.some(item => item.name === 'Back')) {
          selectedItem.options.push('-');
          selectedItem.options.push({
            name: 'Back',
            action: () => 'back'
          }); // Add 'Back' at the bottom
        }

        const submenuResult = await processMenu(selectedItem, 'Back'); // Set 'Back' as default for submenus
        selectedItem.options = selectedItem.options.filter(item => item.name !== 'Back' && item !== '-'); // Remove 'Back' and separator after returning

        if (submenuResult === 'back') {
          continue; // Go back to the previous menu
        }
      } else if (selectedItem.action) {
        // Execute the action and stay in the current menu level
        // use try-catch to handle errors in the action
        try {
          await selectedItem.action();
          if (selectedItem.exitAfter) return;

        } catch (error) {
          console.error(error);
          await pressEnterToContinue();
        }
      }
    }
  }

  // Start processing the menu with the initial selection by name
  await processMenu(menuSystem, lastSelectedName);
}




// Determine file path based on argument or interactive selection
export async function getFilePath(newFilePathArg = null) {
  const filePath = newFilePathArg;
  newFilePathArg = await fileSelector({
    message: 'Select a file:',
    pageSize: await selectListHeight() - 2,
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

  //convert to relative path taking into account the git root
  newFilePathArg = await path.relative(process.cwd(), newFilePathArg);

  return `./${newFilePathArg}`;
}




// markdown pretty print
marked.setOptions({
  renderer: new TerminalRenderer(),
});

export function markdownToTerminal(markdownText) {
  console.log(marked(markdownText));
}





// Function to create a countdown progress bar
async function countdown(seconds) {
  const totalBars = 50; // Total number of segments in the progress bar

  //console.log('Countdown:');

  for (let i = seconds; i >= 0; i--) {
    // Calculate progress percentage and the number of filled segments
    const percentage = ((seconds - i) / seconds) * 100;
    const filledBars = Math.round((percentage / 100) * totalBars);
    const emptyBars = totalBars - filledBars;

    // Create the progress bar string
    const bar = '[' + '='.repeat(filledBars) + ' '.repeat(emptyBars) + ']';
    const timeLeft = ` ${i} seconds remaining`;

    // Print the progress bar with a carriage return to overwrite each second
    process.stdout.write(`\r${bar}${timeLeft}`);

    // Wait for one second
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Move to a new line after completion
  console.log('\nCountdown completed!');
}


import { highlight } from 'cli-highlight';
import inquirer from 'inquirer';
import { Separator } from '@inquirer/prompts';
import { spawn, exec } from "child_process";



export function clearTerminal() {
  // Clears the screen buffer entirely, including scrollback history
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer up to the current line
  process.stdout.write('\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer from the current line down to the bottom of the screen
  process.stdout.write('\u001b[J');

  // Clears the screen buffer from the current line down to the bottom of the screen
  process.stdout.write('\u001b[0f');
  // Clears the screen buffer from the current line down to the bottom of the screen
  process.stdout.write('\u001b[0J');

}


export async function printCodeToTerminal(jsCode) {
  console.log(highlight(jsCode, { language: 'javascript', theme: 'dracula' }));
}


export async function printAndPause(message, secondsToPause = 2) {
  console.log(message);
  await new Promise(resolve => setTimeout(resolve, secondsToPause * 1000));
}


export async function selectListHeight() {
  return process.stdout.rows - 2;
}

export async function menuPrompt(menuObject) {
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




// function to press any key to continue
export async function pressEnterToContinue() {
  return await input('Press Enter to continue...');
}




export async function displayMenu(menuSystem, lastSelectedName = null) {
  // Function to recursively process the menu structure
  async function processMenu(menuNode, lastSelected = null) {
    // Find the index of the last selected item by name

    while (true) {
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
      const selectedName = await menuPrompt({ ...menuObject, default: lastSelected });
      const selectedItem = menuNode.options.find((item) => item.name === selectedName);
      lastSelected = selectedName;

      if (selectedItem.name === 'Back') {
        // If 'Back' is selected, return 'back' to exit this submenu
        return 'back';
      } else if (selectedItem.options) {
        // add a separator
        selectedItem.options.unshift('-');
        // If submenu exists, add a 'Back' option and process the submenu
        selectedItem.options.unshift({
          name: 'Back',
          action: () => 'back'
        });


        const submenuResult = await processMenu(selectedItem, 'Back'); // Set 'Back' as default for submenus
        selectedItem.options.shift(); // Remove 'Back' after returning

        if (submenuResult === 'back') {
          continue; // Go back to the previous menu
        }
      } else if (selectedItem.action) {
        // Execute the action and stay in the current menu level
        await selectedItem.action();
      }
    }
  }

  // Start processing the menu with the initial selection by name
  await processMenu(menuSystem, lastSelectedName);
}

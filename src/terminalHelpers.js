import { highlight } from 'cli-highlight';
import inquirer from 'inquirer';
import { Separator } from '@inquirer/prompts';
import { spawn } from "child_process";

export function clearTerminal() {
  // Clears the screen buffer entirely, including scrollback history
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J\u001b[H');
}


export async function printCodeToTerminal(jsCode) {
  console.log(highlight(jsCode, { language: 'javascript', theme: 'dracula' }));
}


export async function printAndPause(message, secondsToPause = 1) {
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

  // show a menu with options
  let action = await (await inquirer.prompt([menuObject])).action;

  return action;
}


export async function input(promptText, defaultValue = '') {
  let promptObject = {};
  promptObject.type = 'input';
  promptObject.name = 'input';
  promptObject.message = promptText|| 'Enter a value:';
  promptObject.default = defaultValue || '';
  return await (await inquirer.prompt([promptObject])).input;
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

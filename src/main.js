#!/usr/bin/env node
import {
    printAndPause,
} from './terminalHelpers.js';

import './gitnoteSetup.js';
import { setupServer } from './apiServer.js';



export const debugMode = false;


// graceful shutdown
process.on('SIGINT', () => {
    printAndPause("\nExiting gracefully...");
    process.exit(0); // Exit with a success code
});


//Current target file
export const ctx = {};

ctx.targetFile = process.argv[2];
ctx.skipApprovingChanges = false;


async function appStart(params) {
    if (!ctx.targetFile) ctx.targetFile = await getFilePath();
    setupServer();
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
  

appStart();
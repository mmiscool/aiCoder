#!/usr/bin/env node
console.log(`                                                             
      _/_/    _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/_/_/    
   _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/   
  _/_/_/_/    _/        _/        _/    _/  _/    _/  _/_/_/    _/_/_/      
 _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/     
_/    _/  _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/    _/      

https://github.com/mmiscool/aiCoder
`);

import {
  printAndPause,
} from './terminalHelpers.js';

import './gitnoteSetup.js';
import { setupServer } from './apiServer.js';






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
  return `./`;
}


appStart();
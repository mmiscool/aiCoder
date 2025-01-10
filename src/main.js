#!/usr/bin/env node
import {setupServer} from './apiServer.js';
import { getScriptFolderPath, readFile } from './fileIO.js';
import './gitnoteSetup.js';

const version = JSON.parse( await readFile( getScriptFolderPath() + '/../package.json')).version
console.log(`                                                             
      _/_/    _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/_/_/    
   _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/   
  _/_/_/_/    _/        _/        _/    _/  _/    _/  _/_/_/    _/_/_/      
 _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/     
_/    _/  _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/    _/      

v${version}
https://aicoderproject.com/
Source: https://github.com/mmiscool/aiCoder
`);



//Current target file
export const ctx = {};

setupServer();

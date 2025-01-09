#!/usr/bin/env node
console.log(`                                                             
      _/_/    _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/_/_/    
   _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/   
  _/_/_/_/    _/        _/        _/    _/  _/    _/  _/_/_/    _/_/_/      
 _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/     
_/    _/  _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/    _/      

https://aicoderproject.com/

Source: https://github.com/mmiscool/aiCoder
`);


import {setupServer} from './apiServer.js';
import './gitnoteSetup.js';

//Current target file
export const ctx = {};

setupServer();

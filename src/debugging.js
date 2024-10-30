import { debugMode } from "./aiCoder.js";

export async function printDebugMessage(message) {
  if (debugMode) {
    const stack = new Error().stack;
    const callerLine = stack.split("\n")[2];
    const functionName = callerLine.match(/at (\S+)/)[1];
    console.log(`Called inside function: ${functionName}`);
    console.log(message);
  }
}

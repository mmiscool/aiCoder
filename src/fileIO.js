import fs from 'fs';
import path, { relative, dirname } from 'path';
import { printDebugMessage } from './debugging.js';
import { createBackup } from './backupSystem.js';
import { printAndPause } from './terminalHelpers.js';
import { fileURLToPath } from 'url';

// Helper functions to read, write, and append to files
// backups to be created in the ./.aiCoder/backups folder
// backup file names should be the original file name and path with a timestamp appended to it

export async function readFile(filePath) {
    printDebugMessage("Reading file:", filePath);
    try {
        return await fs.readFileSync(filePath, 'utf8');
    }
    catch (error) {
        //console.log('Error reading file:', error);
        return null;
    }

}

export async function writeFile(filePath, content, makeBackup = false) {
    printDebugMessage("Writing file:", filePath);
    filePath = await convertToRelativePath(filePath);
    if (makeBackup) await createBackup(filePath);
    await fs.writeFileSync(filePath, content, 'utf8');
}

export async function appendFile(filePath, content, makeBackup = false) {
    printDebugMessage("Appending to file:", filePath);
    filePath = await convertToRelativePath(filePath);
    if (makeBackup) await createBackup(filePath);
    await fs.appendFileSync(filePath, content, 'utf8');
}


export function convertToRelativePath(filePath) {
    // check if the file path is already relative
    printDebugMessage('filePath:', filePath);
    // test if filePath is a string
    if (typeof filePath !== 'string') {
        console.log('filePath is not a string:', filePath);
        return filePath
    }
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return filePath;
    }
    return path.relative(process.cwd(), filePath);
}


export async function createFolderIfNotExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}






export async function readOrLoadFromDefault(filePath, defaultFilePath) {
    defaultFilePath = await getScriptFolderPath() + defaultFilePath;
    let fileContent = await readFile(filePath);
    if (fileContent === null) {
        console.log('File not found, creating new file:', filePath);
        fileContent = await readFile(defaultFilePath);
        await writeFile(filePath, fileContent);
    }
    return fileContent;
}




export function getScriptFolderPath() {
    // Retrieve the current file's directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname;
}


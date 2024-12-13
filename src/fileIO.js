import fs from 'fs';
import path, { dirname } from 'path';
import { createBackup } from './backupSystem.js';
import { pressEnterToContinue, printAndPause, printDebugMessage } from './terminalHelpers.js';
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
        console.log(`File not found: ${filePath}`);
        //console.log('Error reading file:', error);
        return null;
    }

}



export async function writeFile(filePath, content, makeBackup = false) {
    if (typeof content !== 'string') {
        await printAndPause('Content is not a string:');
        await printAndPause(content);
        await pressEnterToContinue();

    }
    // create the folders in the file path if they don't exist
    let folderPath = path.dirname(filePath);
    await createFolderIfNotExists(folderPath);
    printDebugMessage("Writing file:", filePath);
    filePath = await convertToRelativePath(filePath);
    if (makeBackup) await createBackup(filePath);
    await fs.writeFileSync(filePath, content, 'utf8');
    await printAndPause(`File written: ${filePath}`);
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






export async function readOrLoadFromDefault(filePath, defaultFilePath = null) {
    //console.log('Reading or loading from default:', filePath);
    defaultFilePath = await getScriptFolderPath() + defaultFilePath;
    let fileContent = await readFile(filePath);
    if (fileContent === null) {
        console.log('Creating new file:', filePath);
        fileContent = await readFile(defaultFilePath);
        await writeFile(filePath, fileContent);
    } else {
        //console.log('File exists:', filePath);
    }
    return fileContent;
}



export async function readSetting(fileName) {
    // by default the settings are stored in the ./.aiCoder folder. 
    // If the file is not found we will use the readOrLoadFromDefault function to create a new file with the default settings
    return await readOrLoadFromDefault(`./.aiCoder/${fileName}`, `/${fileName}`);
}

export async function writeSetting(fileName, content) {
    // by default the settings are stored in the ./.aiCoder folder. 
    await writeFile(`./.aiCoder/${fileName}`, content);
}


export async function moveFile(oldPath, newPath) {
    // create the folders in the file path if they don't exist
    try {
        let folderPath = path.dirname(newPath);
        await createFolderIfNotExists(folderPath);
        printDebugMessage("Moving file:", oldPath, newPath);
        await fs.renameSync(oldPath, newPath);
        await printAndPause(`File moved: ${oldPath} to ${newPath}`);
    } catch (error) {
        //console.log(`Error moving file: ${oldPath} to ${newPath}`);
        //console.log('Error moving file:', error);
    }

}




export function getScriptFolderPath() {
    // Retrieve the current file's directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname;
}








export function getAllFiles(folderPath) {
    const result = [];

    function readDirRecursively(currentPath) {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });
        items.forEach(item => {
            const itemPath = path.join(currentPath, item.name);
            const relativePath = path.relative(folderPath, itemPath);
            if (item.isDirectory()) {
                readDirRecursively(itemPath);
            } else {
                if (relativePath.startsWith('.aiCoder')) return;
                if (relativePath.startsWith('node_modules')) return;
                if (relativePath.startsWith('.git')) return;



                result.push("./" + relativePath);
            }
        });
    }

    readDirRecursively(folderPath);
    return result;
}
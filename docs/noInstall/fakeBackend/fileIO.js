import { fileSystem } from '../fs/fileSystem.js';
import { createBackup } from './backupSystem.js';


const browserFS = new fileSystem();

export async function readFile(filePath) {
    console.log('Reading file:', filePath);
    try {
        return await browserFS.readFile(filePath);
    } catch (error) {
        console.log(`File not found: ${filePath}`);
        return null;
    }
}

export async function writeFile(filePath, content, makeBackup = false) {
    if (typeof content !== 'string') {
        await console.log('Content is not a string:', content);
    }

    console.log('Writing file:', filePath);
    if (makeBackup) {
        await createBackup(filePath);
    }
    await browserFS.writeFile(filePath, content);
    await console.log(`File written: ${filePath}`);
}

export async function appendFile(filePath, content, makeBackup = false) {
    console.log('Appending to file:', filePath);
    const existingContent = await browserFS.readFile(filePath) || '';
    const updatedContent = existingContent + content;
    if (makeBackup) {
        await createBackup(filePath);
    }
    await browserFS.writeFile(filePath, updatedContent);
}

export async function createFolderIfNotExists(folderPath) {
    console.log(`Creating folder is not supported directly in fileSystem. 
    Ensure the folder is part of the selected directory: ${folderPath}`);
}

export async function readOrLoadFromDefault(filePath, defaultFilePath = null) {
    let fileContent = await readFile(filePath);
    if (fileContent === null && defaultFilePath) {
        console.log('Creating new file:', filePath);
        fileContent = await readFile(defaultFilePath);
        await writeFile(filePath, fileContent);
    }
    return fileContent;
}

export async function readSetting(fileName) {
    try {
        return await readOrLoadFromDefault(`settings/${fileName}`, `defaults/${fileName}`);
    } catch (error) {
        console.log('Error reading setting:', fileName);
        return null;
    }
}

export async function writeSetting(fileName, content) {
    console.log('Writing setting:', fileName, content);
    console.log('Writing setting:', fileName);
    await writeFile(`settings/${fileName}`, content);
}

export async function moveFile(oldPath, newPath) {
    try {
        const content = await browserFS.readFile(oldPath);
        await browserFS.writeFile(newPath, content);
        await browserFS.deleteFile(oldPath);
        console.log('Moving file:', oldPath, newPath);
        await console.log(`File moved: ${oldPath} to ${newPath}`);
    } catch (error) {
        console.log('Error moving file:', error);
    }
}

export async function getAllFiles() {
    try {
        return await browserFS.flatList();
    } catch (error) {
        console.log('Error retrieving files:', error);
        return [];
    }
}

export async function deleteFile(filePath) {
    console.log('Deleting file:', filePath);
    try {
        await browserFS.deleteFile(filePath);
        console.log(`File deleted: ${filePath}`);
    } catch (error) {
        console.log(`Error deleting file: ${filePath}`, error);
    }
}

export async function deleteDirectory(directoryPath) {
    console.log(`Recursive directory deletion is not supported in fileSystem: ${directoryPath}`);
}

export async function listConversations() {
    try {
        const files = await browserFS.listFiles();
        const conversationIds = [];
        for (const file of files) {
            if (file.kind === 'file') {
                const conversationJSON = await browserFS.readFile(file.name);
                const conversationObject = JSON.parse(conversationJSON);
                conversationIds.push({
                    id: conversationObject.id,
                    title: conversationObject.title,
                    lastModified: new Date(conversationObject.lastModified)
                });
            }
        }
        return conversationIds;
    } catch (error) {
        console.log('Error listing conversations:', error);
        return [];
    }
}

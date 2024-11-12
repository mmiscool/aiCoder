import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { convertToRelativePath, createFolderIfNotExists } from './fileIO.js';
import inquirer from 'inquirer';
import { input, Separator } from '@inquirer/prompts';

import { filePathArg } from './fileSelector.js';
import { clearTerminal, printAndPause, selectListHeight } from './terminalHelpers.js';


// make a folder including any parent folders if they don't exist
export async function createBackup(filePath) {
    console.log('Creating backup of the file:', filePath);

    const backupFolder = './.aiCoder/backups';
    await createFolderIfNotExists(backupFolder);

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupFilePath = path.join(backupFolder, path.dirname(filePath), `${path.basename(filePath)}_backup_${timestamp}`);

    await createFolderIfNotExists(path.dirname(backupFilePath)); // Ensure nested directories exist
    await fs.copyFileSync(filePath, backupFilePath);

    return backupFilePath;
}




export async function rollbackFile(pathToBackupFile) {
    await fs.copyFileSync(pathToBackupFile, filePathArg);
}


export async function restoreFileFromBackup() {
    // List all the versions of the filePathArg file in the ./.aiCoder/backups folder
    // Ask the user to select a version to restore
    // Restore the selected version
    const backupFolder = '.aiCoder/backups';

    let filePath = await convertToRelativePath(filePathArg);

    console.log('Restoring file from backup:', filePath);


    let allBackupFiles = await listFilesMatchingName(`${backupFolder}/${filePath}_backup_`);
    await deleteDuplicates(allBackupFiles);
    allBackupFiles = await listFilesMatchingName(`${backupFolder}/${filePath}_backup_`);


    if (allBackupFiles.length === 0) return console.log('No backups found for this file');

    await clearTerminal();

    // Ask the user to select a backup file to restore
    const { backupFile } = await inquirer.prompt([
        {
            type: 'list',
            name: 'backupFile',
            message: 'Select a backup version to restore:',
            choices: ['Cancel', new Separator(), ...allBackupFiles,],
            loop: false,
            pageSize: await selectListHeight(),
        }
    ]);
    // clear the terminal  
    await clearTerminal();
    if (backupFile === 'Cancel') return console.log('File restore cancelled');

    console.log('Restoring file from backup:', backupFile);
    // backup the current file in the filePathArg variable. This needs to be converted to a relative path
    await createBackup(convertToRelativePath(filePathArg));
    await rollbackFile(backupFile);

    await printAndPause('File restored successfully', 2);

}


export async function listFilesMatchingName(baseFileName) {
    const results = [];
    const baseDir = path.dirname(baseFileName);
    async function searchDirectory(dir) {
        const files = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            //console.log(fullPath, "full path");
            if (file.isDirectory()) {
                await searchDirectory(fullPath);
            } else {
                if (fullPath.includes(baseFileName)) {
                    results.push(fullPath);
                }
            }
        }
    }
    await searchDirectory(baseDir);
    return results;
}















// Helper function to calculate file hash
export function calculateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
}

export async function deleteDuplicates(files) {
    const seenFiles = new Map();

    for (const file of files) {
        const filePath = path.resolve(file);

        try {
            const hash = await calculateFileHash(filePath);

            if (seenFiles.has(hash)) {
                // Delete file if hash already exists in map
                fs.unlinkSync(filePath);
                console.log(`Deleted duplicate file: ${filePath}`);
            } else {
                // Store first occurrence of unique file by hash
                seenFiles.set(hash, filePath);
            }
        } catch (err) {
            console.error(`Error processing file ${filePath}: ${err.message}`);
        }
    }
}




// list all the exported functions from this file
export default {
    createBackup,
    rollbackFile,
    restoreFileFromBackup,
    listFilesMatchingName,
    calculateFileHash,
    deleteDuplicates,
};
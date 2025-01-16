import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createFolderIfNotExists } from './fileIO.js';

// make a folder including any parent folders if they don't exist
export async function createBackup(filePath) {
    console.log('Creating backup of the file:', filePath);

    const backupFolder = './.aiCoder/backups';
    await createFolderIfNotExists(backupFolder);

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupFilePath = path.join(backupFolder, path.dirname(filePath), `${path.basename(filePath)}_backup_`);

    await createFolderIfNotExists(path.dirname(backupFilePath)); // Ensure nested directories exist

    await fs.copyFileSync(filePath, `${backupFilePath}${timestamp}`);

    // deduplicate the backups
    const allBackupFiles = await listFilesMatchingName(backupFilePath);
    await deleteDuplicates(allBackupFiles);

    return backupFilePath;

}




export async function rollbackFile(pathToBackupFile) {
    await fs.copyFileSync(pathToBackupFile, pathToBackupFile.replace('_backup_', ''));
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
            const hash = await calculateFileHash(filePath);  // Ensure this function is async and returns a string hash

            if (seenFiles.has(hash)) {
                // Delete file if hash already exists in map
                await fs.promises.unlink(filePath);  // Use async version of unlink
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





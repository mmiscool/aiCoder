import { promises as fs } from 'fs';
import path from 'path';

async function findGitRoot(startPath = process.cwd()) {
    let currentDir = startPath;

    while (currentDir !== path.parse(currentDir).root) {
        try {
            const files = await fs.readdir(currentDir);
            if (files.includes('.git')) {
                return currentDir;
            }
        } catch (error) {
            console.error(`Error reading directory ${currentDir}:`, error.message);
        }
        currentDir = path.dirname(currentDir); // Move up one level
    }

    throw new Error('Git root not found');
}


export async function swapToGitRoot() {
    try {
        const gitRoot = await findGitRoot();
        console.log('Git root found at:', gitRoot);

        // Change the current working directory to the Git root
        process.chdir(gitRoot);
        console.log('Current working directory changed to Git root:', process.cwd());

        // Your application code here will now use the Git root as the working directory

    } catch (error) {
        console.error(error.message);
    }
}
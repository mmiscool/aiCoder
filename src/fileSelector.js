import fileSelector from 'inquirer-file-selector';
import fs from 'fs';
import path from 'path';
import { printDebugMessage } from './debugging.js';
import { selectListHeight, printAndPause } from './terminalHelpers.js';
import { swapToGitRoot } from './findGitRoot.js';

export let filePathArg = process.argv[2];

export async function firstLoadTryAndFindGitPath() {
    try {
        if (!filePathArg) {
            await printAndPause('No file path argument provided. Selecting a file interactively.');
        } else {
            //convert to absolute path
            let filePathArgOrg = await path.resolve(filePathArg);
            await swapToGitRoot();

            //convert to relative path taking into account the git root
            filePathArg = await path.relative(process.cwd(), filePathArgOrg);
        }

    } catch (error) {
        console.log('Error:', error.message);
        console.log('Could not find git root.');
        await printAndPause(error.message, 5);
    }

    // make a hidden settings folder in the current directory
    if (!fs.existsSync('.aiCoder')) {
        fs.mkdirSync('.aiCoder');
    }

}




// Determine file path based on argument or interactive selection
export async function getFilePath(newFilePathArg = null) {
    if (newFilePathArg) filePathArg = newFilePathArg;
    if (typeof filePathArg === 'string') {
        if (!fs.existsSync(filePathArg) || !filePathArg.endsWith('.js')) {
            // console.error('Invalid file path or file is not a JavaScript file.');
            console.log(`Invalid file path: ${filePathArg} \n or file is not a JavaScript file.`);
            //process.exit(1);
        }
        return filePathArg;
    } else {
        filePathArg = await fileSelector({
            message: 'Select a file:',
            pageSize: await selectListHeight() - 2,
            filter: (filePath) => {
                printDebugMessage(filePath);
                //return true;
                if (filePath.path.includes(
                    'node_modules') ||
                    filePath.path.includes('.git') ||
                    filePath.path.includes('.vscode')
                ) {
                    return false;
                }

                // check if the file starts with a dot
                if (filePath.path.includes('/.')) {
                    return false;
                }

                return true;
            }

        });


        return filePathArg;
    }
}

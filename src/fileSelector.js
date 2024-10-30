import fileSelector from 'inquirer-file-selector';
import fs from 'fs';
import { printDebugMessage } from './debugging.js';
import { selectListHeight } from './terminalHelpers.js';


export let filePathArg = process.argv[2];


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

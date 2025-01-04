import { javascriptManipulator } from "./languages/javascript/javascript.js";
import { cssManipulator } from "./languages/css/css.js";
import { readFile, writeFile } from "../fileIO.js";




export async function intelligentlyMergeSnippets(targetFile) {
    console.log(`Intelligently merging snippets for file: ${targetFile}`);
    const manipulator = await createManipulator(targetFile);
    await manipulator.mergeDuplicates();
    const theNewCodeWeGot = await manipulator.generateCode();
    await writeFile(targetFile, theNewCodeWeGot);
}
export async function applySnippets(targetFile, snippets) {
    console.log(`Applying snippets to file: ${targetFile}`);
    let cleanedSnippets = await snippets.join('\n\n\n\n\n', true);
    const manipulator = await createManipulator(targetFile);
    const returnValue = await manipulator.mergeCode(cleanedSnippets);
    await writeFile(targetFile, await manipulator.generateCode());
    return returnValue;
}



async function createManipulator(targetFile) {
    console.log(`Creating manipulator for file: ${targetFile}`);
    const extension = targetFile.split('.').pop();
    console.log(`Detected ${extension} file`);

    const originalCode = await readFile(targetFile);

    let manipulator;
    if (extension === 'js') {
        manipulator = new javascriptManipulator();
        await manipulator.setCode(originalCode);
        await manipulator.parse();
        return manipulator;
    }
    if (extension === 'css') {
        manipulator = new cssManipulator();
        await manipulator.setCode(originalCode);
        await manipulator.parse();
        return manipulator;
    }

    throw new Error('Unsupported file extension');

}
import { javascriptManipulator } from "../src/mergeTools/languages/javascript/javascript.js";

const manipulator = new javascriptManipulator()

document.getElementById('mergeButton').addEventListener('click', merge);

async function merge() {
    const original = document.getElementById('original').value;
    const snippet = document.getElementById('snippet').value;
    await manipulator.setCode(original);
    await manipulator.parse();
    const result = await manipulator.mergeCode(snippet);
    

    document.getElementById('original').value = result;
    console.log(result);
}
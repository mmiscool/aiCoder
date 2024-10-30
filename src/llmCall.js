import { OpenAI } from "openai";
import fs from 'fs';
import { input, clearTerminal, printAndPause } from "./terminalHelpers.js";

const openAIModel = "gpt-4o";


export async function getOpenAIResponse(messages) {
    const apiKey = await setupOpenAIKey();
    let openai = new OpenAI({ apiKey });

    let responseText = '';

    const resultStream = await openai.chat.completions.create({
        model: openAIModel,
        messages,
        stream: true
    });

    for await (const chunk of resultStream) {
        const content = chunk.choices[0]?.delta?.content || '';
        process.stdout.write(content); // Real-time printing to console
        responseText += content;
    }
    // clear the console
    clearTerminal();
    return responseText;
}


export async function setupOpenAIKey(overwrite = false) {
    if (fs.existsSync('./.aiCoder/openai-key.txt') && !overwrite) {
        return fs.readFileSync('./.aiCoder/openai-key.txt', 'utf8');
    } else {
        const apiKey = await input('Enter your OpenAI API key:');
        if (apiKey === '') {
            await printAndPause('No API key entered.', 1.5);
            return "";
        }
        fs.writeFileSync('./.aiCoder/openai-key.txt', apiKey, 'utf8');
        return apiKey;
    }
}
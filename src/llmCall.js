import { OpenAI } from "openai";
import fs from 'fs';
import { input, clearTerminal, printAndPause, menuPrompt } from "./terminalHelpers.js";
import Groq from "groq-sdk";
import ollama from 'ollama';





export async function callLLM(messages) {
    const llmToUse = await selectAIservice();
    if (llmToUse === 'openai') {
        return await getOpenAIResponse(messages);
    } else if (llmToUse === 'groq') {
        return await getGroqResponse(messages);
    }else if (llmToUse === 'ollama') {
        return await getOllamaResponse(messages);
    }
    else {
        await printAndPause('This feature is not yet implemented.', 1.5);
        return '';
    }
}


export async function setupLLM() {
    while (true) {
        await clearTerminal();
        const settingToChange = await menuPrompt({
            message: "Select the LLM setting you want to change:",
            choices: ['API key', 'Model', 'AI service', '-', 'back']
        });

        if (settingToChange === 'API key') {
            await setupLLMapiKey(true);
        } else if (settingToChange === 'Model') {
            await selectModel(true);
        } else if (settingToChange === 'AI service') {
            await selectAIservice(true);
        } else {
            break;
        }
    }
}



export async function setupLLMapiKey(overwrite = false) {
    const llmAPIkeyFileName = `./.aiCoder/${await selectAIservice()}-api-key.txt`;

    if (fs.existsSync(llmAPIkeyFileName) && !overwrite) {
        return fs.readFileSync(llmAPIkeyFileName, 'utf8');
    } else {
        const apiKey = await input('Enter your LLM API key:');
        if (apiKey === '') {
            await printAndPause('No API key entered.', 1.5);
            return "";
        }
        fs.writeFileSync(llmAPIkeyFileName, apiKey, 'utf8');
        return apiKey;
    }
}



export async function selectModel(overwrite = false) {
    const llmModelFileName = `./.aiCoder/${await selectAIservice()}-model.txt`;
    if (fs.existsSync(llmModelFileName) && !overwrite) {
        return fs.readFileSync(llmModelFileName, 'utf8');
    } else {
        const llmToUse = await selectAIservice();
        let models = [];
        if (llmToUse === 'openai') {
            models = await getOpenAIModels();
        } else if (llmToUse === 'groq') {
            models = await getGroqModels();
        }else if (llmToUse === 'ollama') {
            models = await getOllamaModels();
        }

        let selectedModel = await menuPrompt({
            message: "Select the model you want to use:",
            choices: models
        });

        if (selectedModel === '') {
            await printAndPause('No model selected.', 1.5);
            return "";
        }

        fs.writeFileSync(llmModelFileName, selectedModel, 'utf8');
        return selectedModel;
    }
}


export async function selectAIservice(overwrite = false) {
    if (fs.existsSync('./.aiCoder/ai-service.txt') && !overwrite) {
        return fs.readFileSync('./.aiCoder/ai-service.txt', 'utf8');
    } else {
        const services = ['openai', 'groq', 'ollama'];
        let selectedService = await menuPrompt({
            message: "Select the service you want to use:",
            choices: services
        });

        if (selectedService === '') {
            await printAndPause('No service selected.', 1.5);
            return "";
        }

        fs.writeFileSync('./.aiCoder/ai-service.txt', selectedService, 'utf8');
        return selectedService;
    }
}

// ollama related functions -----------------------------------------------------------------------------------------------
export async function getOllamaResponse(messages) {
    const response = await ollama.chat({ model: await selectModel(), messages, stream: true });
    let responseText = '';
    for await (const part of response) {
        process.stdout.write(part.message.content);
        responseText += part.message.content;
    }

    return responseText;
}

async function getOllamaModels() {
    const ollamaModels = await ollama.list();
    // Make a clean list of just the model names
    const arrayOfModels = ollamaModels.models.map(model => model.name);
    return arrayOfModels;
}





// groq related functions -----------------------------------------------------------------------------------------------

export async function getGroqResponse(messages) {
    const groq = new Groq({ apiKey: await setupLLMapiKey() });


    const completion = await groq.chat.completions
        .create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of fast language models",
                },
            ],
            model: "llama3-8b-8192",
        })
    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
}


async function getGroqModels() {
    const groq = new Groq({ apiKey: await setupLLMapiKey() });
    try {
        const response = await groq.models.list();
        const models = response.data;

        //await printAndPause(models, 20);

        // filter list to only include models that have an id that is shorter than 13 characters
        const listOfModels = models.filter(model => model.id.length < 25).map(model => model.id);

        return listOfModels;
    } catch (error) {
        console.error("Error fetching models:", error);
    }

    return [];

}


// openAI related functions -----------------------------------------------------------------------------------------------
async function getOpenAIResponse(messages) {
    const apiKey = await setupLLMapiKey();
    let openai = new OpenAI({ apiKey });

    let responseText = '';

    const resultStream = await openai.chat.completions.create({
        model: await selectModel(),
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


async function getOpenAIModels() {
    const apiKey = await setupLLMapiKey();
    let openai = new OpenAI({ apiKey });
    try {
        const response = await openai.models.list();
        const models = response.data;

        //await printAndPause(models, 20);

        // filter list to only include models that have an id that is shorter than 13 characters
        const listOfModels = models.filter(model => model.id.length < 15).map(model => model.id);

        return listOfModels;
    } catch (error) {
        console.error("Error fetching models:", error);
    }

    return [];
}

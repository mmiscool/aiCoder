import { OpenAI } from "openai";
import Groq from "groq-sdk";
import ollama from 'ollama';
import fs from 'fs';
import { readFile, writeFile } from "./fileIO.js"
import { input, clearTerminal, printAndPause, menuPrompt, confirmAction, pressEnterToContinue, } from "./terminalHelpers.js";
import Anthropic from '@anthropic-ai/sdk';
import cliProgress from 'cli-progress';
import { spawn } from 'child_process';
import { testCAllAnthropic } from "./test.js";

let throttleTime = 20;
let lastCallTime = 0;

export class conversation {
    constructor() {
        this.messages = [];
    }

    async addMessage(role, content) {
        this.messages.push({ role, content });
    }

    async addFileMessage(role, filePath, description = '') {
        this.messages.push({ role, content: filePath, filePath, description });
    }

    async lastMessage() {
        return this.messages[this.messages.length - 1].content;
    }

    async callLLM() {
        let llmResponse = await callLLM(this.messages);
        llmResponse = llmResponse.trim();
        await this.addMessage('assistant', llmResponse);
        return llmResponse;
    }

    async getMessages() {
        return this.messages;
    }
}


async function throttle() {
    // check if the current time is greater than the last call time + throttle time and if not wait until it is
    // if it needs use the printAndPause function to show a message to the user and wait the remaining time
    const currentTime = new Date().getTime();
    if (currentTime < lastCallTime + throttleTime * 1000) {
        const remainingTime = (lastCallTime + throttleTime) - currentTime;
        await printAndPause(`Throttling. Please wait ${remainingTime / 1000} seconds.`, remainingTime / 1000);
    }

    lastCallTime = new Date().getTime();
    return;
}



export async function callLLM(messages) {
    const llmToUse = await selectAIservice();

    // for each message in the array, check if it is a file path and if it is read the file and add the content to the messages array
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].filePath) {
            messages[i].content = messages[i].description + "\n\n"
            messages[i].content += await readFile(messages[i].filePath);
        }
    }


    let response = '';
    if (llmToUse === 'openai') {
        await throttle();
        response = await getOpenAIResponse(messages);
    } else if (llmToUse === 'groq') {
        await throttle();
        response = await getGroqResponse(messages);
    } else if (llmToUse === 'ollama') {
        response = await getOllamaResponse(messages);
    }
    else if (llmToUse === 'anthropic') {
        response = await getClaudeResponse(messages);
    }
    else {
        await printAndPause('This feature is not yet implemented.', 1.5);
        response = '';
    }

    // for each message in the array, check if it is a file path and if it is delete the content from the messages array
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].filePath) {
            messages[i].content = messages[i].filePath;
        }
    }

    lastCallTime = new Date().getTime();
    return response;
}


export async function setupLLM() {
    while (true) {
        await clearTerminal();
        console.log("Current LLM settings:");
        // read the current settings from the files and display them
        console.log(`
    AI service: ${await readFile('./.aiCoder/ai-service.txt')}
    Model:      ${await readFile(`./.aiCoder/${await readFile('./.aiCoder/ai-service.txt')}-model.txt`)}
    API key:    ${await readFile(`./.aiCoder/${await readFile('./.aiCoder/ai-service.txt')}-api-key.txt`) ? 'set' : 'not set'}
                  `);



        const settingToChange = await menuPrompt(
            {
                message: "Select the LLM setting you want to change:",
                choices: [
                    'API key',
                    'Model',
                    'AI service',
                    'Reset to default model for AI service',
                    '-',
                    'back'],

            }
        );

        if (settingToChange === 'API key') {
            await setupLLMapiKey(true);
        } else if (settingToChange === 'Model') {
            await selectModel(true);
        } else if (settingToChange === 'AI service') {
            await selectAIservice(true);
        } else if (settingToChange === 'Reset to default model for AI service') {

            const llmToUse = await selectAIservice();
            if (llmToUse === 'openai') {
                await writeFile(`./.aiCoder/${llmToUse}-model.txt`, 'gpt-4o');
            } else if (llmToUse === 'groq') {
                await writeFile(`./.aiCoder/${llmToUse}-model.txt`, 'llama-3.1-70b-versatile');
            } else if (llmToUse === 'ollama') {
                await writeFile(`./.aiCoder/${llmToUse}-model.txt`, 'granite3-dense:latest');
            } else if (llmToUse === 'anthropic') {
                await writeFile(`./.aiCoder/${llmToUse}-model.txt`, 'claude-3.0');
            }
        }


        else {
            break;
        }
    }
}

export async function llmSettings() {
    // pull the current settings from the files
    // pull the available models from each service

    const currentService = await readFile('./.aiCoder/ai-service.txt');

    const settingsObject = {
        openai: {
            model: await readFile(`./.aiCoder/openai-model.txt`),
            apiKey: await readFile(`./.aiCoder/openai-api-key.txt`),
            models: await getOpenAIModels(),
            active: currentService === 'openai',
        },
        groq: {
            model: await readFile(`./.aiCoder/groq-model.txt`),
            apiKey: await readFile(`./.aiCoder/groq-api-key.txt`),
            models: await getGroqModels(),
            active: currentService === 'groq',
        },
        ollama: {
            model: await readFile(`./.aiCoder/ollama-model.txt`),
            apiKey: await readFile(`./.aiCoder/ollama-api-key.txt`),
            models: await getOllamaModels(),
            active: currentService === 'ollama',
        },
        anthropic: {
            model: await readFile(`./.aiCoder/anthropic-model.txt`),
            apiKey: await readFile(`./.aiCoder/anthropic-api-key.txt`),
            models: await getClaudeModels(),
            active: currentService === 'anthropic',
        }

    }

    return settingsObject;
    // return an object with the settings and options
}

export async function llmSettingsUpdate(settings) {
    // write the new settings to the files
    await writeFile(`./.aiCoder/openai-model.txt`, settings.openai.model);
    await writeFile(`./.aiCoder/openai-api-key.txt`, settings.openai.apiKey);

    await writeFile(`./.aiCoder/groq-model.txt`, settings.groq.model);
    await writeFile(`./.aiCoder/groq-api-key.txt`, settings.groq.apiKey);

    await writeFile(`./.aiCoder/ollama-model.txt`, settings.ollama.model);
    await writeFile(`./.aiCoder/ollama-api-key.txt`, settings.ollama.apiKey);

    await writeFile(`./.aiCoder/anthropic-model.txt`, settings.anthropic.model);
    await writeFile(`./.aiCoder/anthropic-api-key.txt`, settings.anthropic.apiKey);

    await writeFile(`./.aiCoder/ai-service.txt`,
        settings.openai.active ? 'openai' :
            settings.groq.active ? 'groq' :
                settings.ollama.active ? 'ollama' :
                    settings.anthropic.active ? 'anthropic' : '');


    return { success: true };
}

export async function setupLLMapiKey(overwrite = false, service = '') {
    if (service === '') {
        service = await selectAIservice();
    }
    const llmAPIkeyFileName = `./.aiCoder/${service}-api-key.txt`;

    if (readFile(llmAPIkeyFileName) && !overwrite) {
        return readFile(llmAPIkeyFileName);
    } else {
        const apiKey = await input('Enter your LLM API key:');
        if (apiKey === '') {
            await printAndPause('No API key entered.', 1.5);
            return "";
        }
        await writeFile(llmAPIkeyFileName, apiKey,);
        return apiKey;
    }
}



export async function selectModel(overwrite = false) {
    await clearTerminal();
    const llmModelFileName = `./.aiCoder/${await selectAIservice()}-model.txt`;
    if (readFile(llmModelFileName) && !overwrite) {
        return readFile(llmModelFileName);
    } else {
        const llmToUse = await selectAIservice();
        let models = [];
        if (llmToUse === 'openai') {
            models = await getOpenAIModels();
        } else if (llmToUse === 'groq') {
            models = await getGroqModels();
        } else if (llmToUse === 'ollama') {
            models = await getOllamaModels();
        }

        let selectedModel = await menuPrompt({
            message: "Select the model you want to use:",
            choices: models,
            default: await readFile(llmModelFileName),
        });

        if (selectedModel === '') {
            await printAndPause('No model selected.', 1.5);
            return "";
        }

        writeFile(llmModelFileName, selectedModel);
        return selectedModel;
    }
}


export async function selectAIservice(overwrite = false) {
    if (fs.existsSync('./.aiCoder/ai-service.txt') && !overwrite) {
        return fs.readFileSync('./.aiCoder/ai-service.txt', 'utf8');
    } else {
        const services = ['openai', 'groq', 'ollama', 'anthropic'];
        let selectedService = await menuPrompt({
            message: "Select the service you want to use:",
            choices: services,
            default: await readFile('./.aiCoder/ai-service.txt'),
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
    try {
        const ollamaModels = await ollama.list();

        // if list is empty pull the default models
        if (ollamaModels.models.length === 0) {
            //await console.log(await ollama.pull({ model: 'granite3-dense:latest', stream: true }));
            if (await confirmAction('No models found. Do you want to download the default models?')) {
                await pullOllamaModelWithProgress('granite3-dense:latest');

                return getOllamaModels();
            } else return [];
        }


        // Make a clean list of just the model names
        const arrayOfModels = ollamaModels.models.map(model => model.name);
        return arrayOfModels;
    } catch (error) {
        // Ask user if they want to try and install ollama
        if (await confirmAction('Ollama might not be installed. Do you want to try and install it?')) {
            await printAndPause('Installing Ollama...');

            // Use shell to install ollama

            await installOllama();
            await printAndPause('Ollama installed. Pulling default models...', 10);
            await pullOllamaModelWithProgress('granite3-dense:latest');

            return getOllamaModels();
            return [];
        }

    }
}



async function installOllama() {
    await clearTerminal();
    return new Promise((resolve, reject) => {
        const command = 'curl';
        const args = ['-fsSL', 'https://ollama.com/install.sh', '|', 'sh'];

        const installer = spawn(command, args, { stdio: 'inherit', shell: true });

        installer.on('error', (error) => {
            console.error(`Error: ${error.message}`);
            reject(error);
        });

        installer.on('exit', (code) => {
            if (code === 0) {
                console.log('Ollama installed successfully!');
                pullOllamaModelWithProgress('granite3-dense:latest');
                resolve();
            } else {
                console.log(`Installation failed with code: ${code}`);
                reject(new Error(`Exit code: ${code}`));
            }
        });
    });
}




async function pullOllamaModelWithProgress(model) {
    console.log(`downloading ${model}...`)
    const progressBar = new cliProgress.SingleBar({
        format: 'Downloading {model} | {bar} | {percentage}%        ',
        barCompleteChar: '#',
        barIncompleteChar: '.',
        hideCursor: true
    });
    // Start the progress bar with an initial value
    progressBar.start(100, 0, {
        model: model
    });


    let currentDigestDone = false
    const stream = await ollama.pull({ model: model, stream: true })
    for await (const part of stream) {
        if (part.digest) {
            let percent = 0
            if (part.completed && part.total) {
                percent = Math.round((part.completed / part.total) * 100)
            }

            progressBar.update(percent);
            if (percent === 100 && !currentDigestDone) {
                //console.log() // Output to a new line
                currentDigestDone = true
            } else {
                currentDigestDone = false
            }
        } else {
            console.log(part.status)
        }
    }
}




// groq related functions -----------------------------------------------------------------------------------------------

export async function getGroqResponse(messages) {
    const groq = new Groq({ apiKey: await setupLLMapiKey() });


    const completion = await groq.chat.completions
        .create({
            messages,
            model: await selectModel(),
        })
    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
}


async function getGroqModels() {
    const groq = new Groq({ apiKey: await readFile('./.aiCoder/groq-api-key.txt') });
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
    //clearTerminal();
    return responseText;
}


async function getOpenAIModels() {
    const apiKey = await readFile('./.aiCoder/openai-api-key.txt');
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





// Anthropic related functions -----------------------------------------------------------------------------------------------
async function getClaudeResponse(messages, retry = true) {
    const apiKey = await setupLLMapiKey(); // Replace with your method for retrieving the API key
    const anthropic = new Anthropic({ apiKey });

    let responseText = '';


    try {
        let systemMessage = '';
        // Prepare the user and assistant messages. Remove any system messages.
        // take the text of the system message and add it to the systemMessage variable. 
        // Keep only the role and content fields of the messages array
        let formattedMessages = messages.filter((message) => {
            if (message.role === 'system') {
                systemMessage += message.content;
                return false;
            }
            return true;
        }).map((message) => {
            return {
                role: message.role,
                content: message.content
            };
        });



        console.log(formattedMessages);
        // //console.log(systemMessage);

        // responseText = testCAllAnthropic(messages);
        // return responseText;


        // Make the API call with streaming
        const stream = anthropic.messages.stream({
            model: await selectModel(), // Replace with your preferred model, e.g., "claude-3-5-sonnet-20241022"
            max_tokens: 8192, // Adjust the max tokens based on your requirements
            system: systemMessage, // Add the system message here
            messages: formattedMessages, // Use only user and assistant messages
        })

        // Process the streaming response
        for await (const chunk of stream) {
            //console.log('chunk:', chunk);
            // format of chunk
            // chunk: {
            //     type: 'content_block_delta',
            //     index: 0,
            //     delta: { type: 'text_delta', text: ' Connected face collection\n   -' }
            //   } 


            //check if the chunk type is delta
            if (chunk.type !== 'content_block_delta') {
                continue;
            }

            const convertedToJSON = await JSON.stringify(chunk);
            //console.log('convertedToJSON:', convertedToJSON);
            const convertedBack = await JSON.parse(convertedToJSON);

            const text = convertedBack.delta.text; // Extract the text from the chunk
            responseText += text; // Append to the complete response

            //print the text to the console in real time
            process.stdout.write(text);
        }
        //console.log('stream:', stream);
    } catch (error) {
        console.log('Error during Claude response retrieval:', error);

        // if (retry) {
        //     // Retry logic with a delay
        //     for (let i = 0; i < 3; i++) {
        //         await printAndPause('Retrying...', 5); // Wait for 5 seconds before retrying
        //         responseText = await getClaudeResponse(messages, false); // Retry without recursion
        //         if (responseText !== '') {
        //             break; // Exit loop if response is successful
        //         }
        //     }
        // }
    }

    console.log("responseText:", responseText);
    return responseText;
}



async function getClaudeModels() {
    // Predefined list of Claude models based on Anthropic's documentation
    const models = [
        'claude-3-5-sonnet-20241022',
        'claude-3-5-haiku-20241022',
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
        // Add more models as needed
    ];

    return models;
}
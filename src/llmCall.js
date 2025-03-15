import Anthropic from '@anthropic-ai/sdk';
import { spawn } from 'child_process';
import cliProgress from 'cli-progress';
import Groq from "groq-sdk";
import ollama from 'ollama';
import { OpenAI } from "openai";
import { readFile, readSetting, writeSetting } from "./fileIO.js";
import {
    clearTerminal,
    printAndPause,
    printToTerminal,
    readArg,
} from "./terminalHelpers.js";



let throttleTime = 20;

async function setupMode() {
    if (await readArg('-setup')) {
        //loop 5 times to clear the terminal from 5 to 1
        for (let i = 5; i > 0; i--) {
            await clearTerminal();
            await printAndPause(`Setting up LLM mode in ${i} seconds.`, 1);
        }

        await clearTerminal();
        await printAndPause('Installing ollama . . . ', 1);
        await installOllama();
        await printAndPause('Ollama installed');
        await printAndPause('Waiting for ollama service to start', 10);
        await printAndPause('Pulling the default model');
        await pullOllamaModelWithProgress('granite3.1-dense:8b');
        await pullOllamaModelWithProgress('granite3.1-moe');

        await writeSetting(`llmConfig/ai-service.txt`, 'ollama');
        await writeSetting(`llmConfig/ollama-model.txt`, 'granite3.1-dense:8b');
    }
}

setupMode();


let lastCallTime = 0;

async function throttle() {
    // check if the current time is greater than the last call time + throttle time and if not wait until it is
    // if it needs use the printAndPause function to show a message to the user and wait the remaining time
    const currentTime = new Date().getTime();
    if (currentTime < lastCallTime + throttleTime * 1000) {
        const remainingTime = (lastCallTime + throttleTime) - currentTime;
        await printAndPause(`Throttling. Please wait ${remainingTime / 1000} seconds.`);
        // wait for the remaining time
        await new Promise((resolve) => {
            setTimeout(resolve, remainingTime);
        });
    }

    lastCallTime = new Date().getTime();
    return;
}



export async function callLLM(inputMessages) {
    const llmToUse = await readSetting(`llmConfig/ai-service.txt`);




    // for each message in the array, check if it is a file path and if it is read the file and add the content to the messages array
    for (let i = 0; i < inputMessages.length; i++) {
        if (inputMessages[i].filePath) {
            console.log('file type message description:', inputMessages[i].description);
            inputMessages[i].content = inputMessages[i].description + "\n\n" + await readFile(inputMessages[i].filePath);
        }
    }


    const messages = await  inputMessages.map((message) => {
        return {
            role: message.role,
            content: message.content
        };
    });


    //console.log('messages:', messages);


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
    else if (llmToUse === 'googleAI') {
        response = await getGoogleAIResponse(messages);
    }
    else {
        await printAndPause('Error:   No LLM selected.', 1.5);
        response = '';
    }

    // for each message in the array, check if it is a file path and if it is delete the content from the messages array
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].filePath) {
            messages[i].content = messages[i].filePath;
        }
    }

    lastCallTime = await new Date().getTime();
    return response;
}


const llmServices = ['ollama', 'openai', 'groq', 'anthropic', 'googleAI'];

export async function llmSettings() {
    const currentService = await readSetting(`llmConfig/ai-service.txt`);

    try {
        let settingsObject = {};

        for (let service of llmServices) {
            const settings = {
                model: await readSetting(`llmConfig/${service}-model.txt`),
                apiKey: await readSetting(`llmConfig/${service}-api-key.txt`),
                models: await getModels(service),
                active: currentService === service,
            }
            settingsObject[service] = settings;
        }

        return settingsObject;
    } catch (error) {
        console.error('Error fetching settings:', error);
        throw new Error('Error fetching settings:', error);
    }


    // return an object with the settings and options
}

async function getModels(service) {
    if (service === 'ollama') {
        return getOllamaModels();
    } else if (service === 'openai') {
        return getOpenAIModels();
    } else if (service === 'groq') {
        return getGroqModels();
    } else if (service === 'anthropic') {
        return getClaudeModels();
    } else if (service === 'googleAI') {
        return getGoogleAIModels();
    }
    return [];
}

export async function llmSettingsUpdate(settings) {
    // write the new settings to the files
    for (let i = 0; i < llmServices.length; i++) {
        const service = llmServices[i];
        await writeSetting(`llmConfig/${service}-model.txt`, settings[service].model);
        await writeSetting(`llmConfig/${service}-api-key.txt`, settings[service].apiKey);
        if (settings[service].active) {
            await writeSetting(`llmConfig/ai-service.txt`, service);
        }
    }

    return { success: true };
}


// ollama related functions -----------------------------------------------------------------------------------------------
export async function getOllamaResponse(messages) {
    const response = await ollama.chat({ model: await readSetting('llmConfig/ollama-model.txt'), messages, stream: true });
    let responseText = '';
    for await (const part of response) {
        //process.stdout.write(part.message.content);
        await printToTerminal(part.message.content);
        responseText += part.message.content;
    }

    return responseText;
}

async function getOllamaModels() {
    try {
        const ollamaModels = await ollama.list();
        // if list is empty pull the default models
        if (ollamaModels.models.length === 0) return [];
        // Make a clean list of just the model names
        const arrayOfModels = ollamaModels.models.map(model => model.name);
        return arrayOfModels;
    } catch (error) {
        return [];
    }
}



async function installOllama() {
    await clearTerminal();
    try {
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
                    pullOllamaModelWithProgress('granite3.1-dense:latest');
                    resolve();
                } else {
                    console.log(`Installation failed with code: ${code}`);
                    reject(new Error(`Exit code: ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('Error installing Ollama:', error);
        return;
    }
}




async function pullOllamaModelWithProgress(model) {
    await printAndPause(`downloading ${model}...`, 5)
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
    const apiKey = await readSetting('llmConfig/groq-api-key.txt');
    const groq = new Groq({ apiKey });

    const formattedMessages = messages.map((message) => {
        return {
            role: message.role,
            content: message.content
        };
    });

    const completion = await groq.chat.completions.create({
        messages: formattedMessages,
        model: await readSetting('llmConfig/groq-model.txt'),
    })
    console.log(completion.choices[0].message.content);


    return completion.choices[0].message.content;
}


async function getGroqModels() {
    const apiKey = await readSetting('llmConfig/groq-api-key.txt');
    if (!apiKey) return [];
    const groq = new Groq({ apiKey });
    try {
        const response = await groq.models.list();
        const models = response.data;

        // filter list to only include models that have an id that is shorter than 13 characters
        const listOfModels = models.filter(model => model.id.length < 300).map(model => model.id);

        return listOfModels;
    } catch (error) {
        console.error("Error fetching models:", error);
    }

    return [];

}


// openAI related functions -----------------------------------------------------------------------------------------------
async function getOpenAIResponse(messages) {
    const apiKey = await readSetting('llmConfig/openai-api-key.txt');
    let openai = new OpenAI({ apiKey });

    let responseText = '';

    const resultStream = await openai.chat.completions.create({
        model: await readSetting('llmConfig/openai-model.txt'),
        messages,
        stream: true
    });

    for await (const chunk of resultStream) {
        const content = chunk.choices[0]?.delta?.content || '';
        await printToTerminal(content); // Real-time printing to console
        responseText += content;
    }
    // clear the console
    //clearTerminal();
    return responseText;
}


async function getOpenAIModels() {
    const apiKey = await readSetting('llmConfig/openai-api-key.txt');
    if (!apiKey) return [];

    let openai = new OpenAI({ apiKey });
    try {
        const response = await openai.models.list();
        const models = response.data;

        // filter list to only include models that have an id that is shorter than 13 characters
        const listOfModels = models.filter(model => model.id.length < 30).map(model => model.id);

        return listOfModels;
    } catch (error) {
        console.error("Error fetching models:", error);
    }

    return [];
}





// Anthropic related functions -----------------------------------------------------------------------------------------------
async function getClaudeResponse(messages, retry = true) {
    const apiKey = await readSetting('llmConfig/anthropic-api-key.txt');
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


        // Make the API call with streaming
        const stream = anthropic.messages.stream({
            model: await readSetting('llmConfig/anthropic-model.txt'), // Replace with your preferred model, e.g., "claude-3-5-sonnet-20241022"
            max_tokens: 8192, // Adjust the max tokens based on your requirements
            system: systemMessage, // Add the system message here
            messages: formattedMessages, // Use only user and assistant messages
        })

        // Process the streaming response
        for await (const chunk of stream) {

            //check if the chunk type is delta
            if (chunk.type !== 'content_block_delta') {
                continue;
            }

            const convertedToJSON = await JSON.stringify(chunk);
            //console.log('convertedToJSON:', convertedToJSON);
            const convertedBack = await JSON.parse(convertedToJSON);

            const text = convertedBack.delta.text; // Extract the text from the chunk
            responseText += text; // Append to the complete response

            printToTerminal(text);
        }
        //console.log('stream:', stream);
    } catch (error) {
        console.log('Error during Claude response retrieval:', error);

        if (retry) {
            // Retry logic with a delay
            for (let i = 0; i < 3; i++) {
                // this is to deal with the anthropic throttle 

                await new Promise((resolve) => {
                    setTimeout(resolve, 60000);
                });



                responseText = await getClaudeResponse(messages, false); // Retry without recursion
                if (responseText !== '') {
                    break; // Exit loop if response is successful
                }
            }
        }
    }

    console.log("responseText:", responseText);
    return responseText;
}



async function getClaudeModels() {
    // Predefined list of Claude models based on Anthropic's documentation
    const models = [
        'claude-3-5-sonnet-latest',
        'claude-3-5-haiku-latest',
        'claude-3-opus-latest',
        // Add more models as needed
    ];

    return models;
}




// google AI related functions -----------------------------------------------------------------------------------------------

async function getGoogleAIResponse(messages) {
    const apiKey = await readSetting('llmConfig/googleAI-api-key.txt');
    let openai = new OpenAI({
        apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    let responseText = '';

    const resultStream = await openai.chat.completions.create({
        model: await readSetting('llmConfig/googleAI-model.txt'),
        messages,
        stream: true
    });


    for await (const chunk of resultStream) {
        const content = chunk.choices[0]?.delta?.content || '';
        await printToTerminal(content); // Real-time printing to console
        responseText += content;
    }
    // clear the console
    //clearTerminal();
    return responseText;

}



async function getGoogleAIModels() {
    return [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-1.5-flash-8b",
        "gemini-2.0-flash-exp",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-2.0-pro-exp-02-05",
        "gemini-2.0-flash-thinking-exp-01-21",
        "gemini-1.0-pro",
        "gemini-1.0-pro-vision"
    ]
}
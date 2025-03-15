
import Anthropic from '@anthropic-ai/sdk';
import Groq from "groq-sdk";
import ollama from 'ollama';
import { OpenAI } from "openai";



// creating functions to replace printAndPause, and printToTerminal functions
// we will be using the console.log to print to the terminal
// the functions will be async to simulate the terminal operations

async function printAndPause(message, time = 0) {
    console.log(message);
    await new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
}

async function printToTerminal(message) {
    console.log(message);
}

// creating functions to replace the getOpenAIResponse, getGroqResponse, and getClaudeResponse functions





// creating fuctions to replace the readFile, readSetting, and writeSetting functions
// we will be using localStorage to store the settings and files will be stored in the browser's local storage
// the functions will be async to simulate the file read and write operations

async function readSetting(key) {
    return localStorage.getItem("setting."+key);
}

async function writeSetting(key, value) {
    localStorage.setItem("setting."+key, value);
}

async function readFile(filePath) {
    return localStorage.getItem(filePath);
}

async function writeFile(filePath, content) {
    localStorage.setItem(filePath, content);
}




writeSetting(`llmConfig/ai-service.txt`, 'googleAI');
writeSetting(`llmConfig/googleAI-api-key.txt`, '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');
writeSetting(`llmConfig/googleAI-model.txt`, 'gemini-1.5-flash');




let throttleTime = 20;




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


    const messages = inputMessages.map((message) => {
        return {
            role: message.role,
            content: message.content
        };
    });

    // for each message in the array, check if it is a file path and if it is read the file and add the content to the messages array
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].filePath) {
            console.log('file type message description:', messages[i].description);
            messages[i].content = messages[i].description + "\n\n" + await readFile(messages[i].filePath);
        }
    }
    console.log('messages:', messages);


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
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        dangerouslyAllowBrowser: true
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



export class conversation {
    constructor(id = null, targetFile = null, model = null) {
        this.messages = [];
        this.title = '';
        this.targetFile = targetFile;
        this.chatMode = 'chat';
        this.conversationNew = true;
        this.model = model;
        if (id) {
            this.id = id;
        } else
        //this.loadConversation(id);
        //console.log('loaded conversation', this);
        {
            //generate a unique id for the conversation based on the current time in the format
            // of yyyy-mm-dd-hh-mm-ss
            this.id = new Date().toISOString().replace(/[-:.]/g, '').replace('T', '_').split('.')[0];
        }
    }
    async setMode(mode) {
        this.chatMode = mode;
        await this.storeConversation();
    }
    async setTitle(title) {
        this.title = title;
        await this.storeConversation();
    }
    async setTargetFile(targetFile) {
        this.targetFile = targetFile;
        await this.storeConversation();
    }
    async addMessage(role, content, hidden = false) {
        while (true) {
            const firstLine = content.split('\n')[0].trim();
            const everyThingElse = content.split('\n').slice(1).join('\n').trim();
            // Check if the first line is a URL
            if (firstLine.startsWith('https://') || firstLine.startsWith('http://')) {
                //const scrapedContent = await scrapeToMarkdown(firstLine);
                const markdownLink = `[${firstLine}](${firstLine})`;
                const scrapedContent = `${markdownLink}\n\n${await scrapeToMarkdown(firstLine)}`;
                await this.messages.push({
                    role,
                    content: scrapedContent
                });
                content = everyThingElse;
                // Update content to the remaining lines
                // If there's no remaining content, break out of the loop
                if (content.length === 0)
                    break;
            } else {
                // If the first line is not a URL, add the remaining content and exit
                if (content.length > 0) {
                    await this.messages.push({
                        role,
                        content,
                        hidden
                    });
                }
                break;
            }
        }
        await this.storeConversation();
    }
    async addFileMessage(role, filePath, description = '') {
        await this.messages.push({
            role,
            content: filePath,
            filePath,
            description,
            hidden: true
        });
        await this.storeConversation();
    }
    async addTargetFileMessage(user, description = '') {
        await this.addFileMessage(user, this.targetFile, description);
    }
    async lastMessage() {
        return this.messages[this.messages.length - 1].content;
    }
    async callLLM() {
        let llmResponse = await callLLM(this.messages);
        llmResponse = await llmResponse.trim();
        await this.addMessage('assistant', llmResponse);

        if (this.conversationNew) {
            await this.generateTitle();
        }

        return llmResponse;
    }
    async getMessages() {
        return this.messages;
    }
    async getConversation() {
        return {
            title: this.title,
            id: this.id,
            targetFile: this.targetFile,
            chatMode: this.chatMode,
            lastModified: this.lastModified,
            messages: this.messages
        };
    }
    async clearMessages() {
        this.messages = [];
        await this.storeConversation();
    }
    async storeConversation(id = this.id) {
        // write the conversation to a file
        const conversationObject = {
            messages: this.messages,
            title: this.title,
            id: this.id,
            targetFile: this.targetFile,
            chatMode: this.chatMode,
            conversationNew: this.conversationNew || false,
            lastModified: new Date().toISOString()
        };
        const conversationJSON = await JSON.stringify(conversationObject, null, 2);
        const filePath = `./.aiCoder/conversations/${id}.json`;
        await writeFile(filePath, conversationJSON);
        return { success: true };
    }
    async loadConversation(id = this.id) {
        this.id = id;
        // load the conversation from a file  
        const filePath = `./.aiCoder/conversations/${id}.json`;
        try {
            const conversationJSON = await readFile(filePath);
            const conversationObject = await JSON.parse(conversationJSON);
            this.messages = conversationObject.messages;
            this.title = conversationObject.title;
            this.id = conversationObject.id;
            this.targetFile = conversationObject.targetFile;
            this.chatMode = conversationObject.chatMode;
            this.conversationNew = conversationObject.conversationNew;
            return await console.log('conversation loaded. wooot');
        } catch (e) {
            console.log('conversation not found');
            return { error: 'conversation not found' };
        }
    }
    async deleteConversation() {
        const filePath = `./.aiCoder/conversations/${this.id}.json`;
        if (fs.existsSync(filePath)) {
            await fs.unlinkSync(filePath);
        }
    }
    async generateTitle() {
        // test if current title starts with word plan 
        let titlePrefix = '';
        if (this.title.toLowerCase().startsWith('plan')) titlePrefix = 'Plan: ';

        if (this.conversationNew) {
            const prompt = 'Generate a title for the following conversation. Respond with a single short line of text: ';

            const tempMessages = [...this.messages, {
                role: 'user',
                content: prompt
            }];
            const llmResponse = await callLLM(tempMessages);
            const suggestedTitle = titlePrefix + llmResponse.trim();
            this.setTitle(suggestedTitle);
            this.conversationNew = false;
            await this.storeConversation();
        }
    }
}
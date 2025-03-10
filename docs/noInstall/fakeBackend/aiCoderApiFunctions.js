
import { scrapeToMarkdown } from '@mmiscool/scrape_to_markdown';
import fs from 'fs';
import { getListOfFunctions, getMethodsWithArguments, prependClassStructure } from './classListing.js';
import {
    deleteFile,
    getAllFiles,
    getScriptFolderPath,
    listConversations,
    moveFile,
    readFile,
    readSetting,
    writeFile,
    writeSetting
} from './fileIO.js';
import {
    callLLM,
    llmSettings,
    llmSettingsUpdate
} from './llmCall.js';
import {
    applySnippets,
    intelligentlyMergeSnippets
} from './mergeTools/mergeTool.js';
import { launchEditor } from './terminalHelpers.js';


// fake ajax function that calls methods in the aiCoderApiFunctions class. The url is the method name and the data is the parsedBody object
export async function fakeDoAjax(url, data) {
    const api = new aiCoderApiFunctions();
    if (url in api) {
        return await api[url](data);
    } else {
        return { error: 'Method not found' };
    }
}







export async function setupConfigFiles() {
    // get the current version number from the package.json file
    
    try{
            //console.log('Setting up default files');
    await moveFile('./.aiCoder/default-plan-prompt.md', './.aiCoder/prompts/default-plan-prompt.md');
    await moveFile('./.aiCoder/default-system-prompt.md', './.aiCoder/prompts/default-system-prompt.md');
    await moveFile('./.aiCoder/snippet-production-prompt.md', './.aiCoder/prompts/snippet-production-prompt.md');
    await moveFile('./.aiCoder/snippet-validation-prompt.md', './.aiCoder/prompts/snippet-validation-prompt.md');
    await moveFile('./.aiCoder/plan-edit-prompt.md', './.aiCoder/prompts/plan-edit-prompt.md');
    await moveFile('./.aiCoder/customPrompts.json', './.aiCoder/prompts/customPrompts.json');
    // move the llm api keys and models to the llmConfig folder
    await moveFile('./.aiCoder/openai-api-key.txt', './.aiCoder/llmConfig/openai-api-key.txt');
    await moveFile('./.aiCoder/openai-model.txt', './.aiCoder/llmConfig/openai-model.txt');
    await moveFile('./.aiCoder/groq-api-key.txt', './.aiCoder/llmConfig/groq-api-key.txt');
    await moveFile('./.aiCoder/groq-model.txt', './.aiCoder/llmConfig/groq-model.txt');
    await moveFile('./.aiCoder/ollama-api-key.txt', './.aiCoder/llmConfig/ollama-api-key.txt');
    await moveFile('./.aiCoder/ollama-model.txt', './.aiCoder/llmConfig/ollama-model.txt');
    await moveFile('./.aiCoder/anthropic-api-key.txt', './.aiCoder/llmConfig/anthropic-api-key.txt');
    await moveFile('./.aiCoder/anthropic-model.txt', './.aiCoder/llmConfig/anthropic-model.txt');
    await moveFile('./.aiCoder/ai-service.txt', './.aiCoder/llmConfig/ai-service.txt');
    await readSetting('prompts/default-plan-prompt.md');
    await readSetting('prompts/default-system-prompt.md');
    await readSetting('prompts/snippet-production-prompt.md');
    await readSetting('prompts/snippet-validation-prompt.md');
    await readSetting('prompts/plan-edit-prompt.md');
    await readSetting('prompts/customPrompts.json');
    }catch (e) {
        console.log('Error setting up config files:', e);
    }

}
setupConfigFiles();
export class aiCoderApiFunctions {
    async addMessage(parsedBody) {
        const webUIConversation = new conversation(parsedBody.id);
        await webUIConversation.loadConversation();
        console.log('addMessage', parsedBody.message);
        await webUIConversation.addMessage('user', parsedBody.message);
        return { success: true };
    }
    async setConversationTitle(parsedBody) {
        const webUIConversation = new conversation(parsedBody.id);
        await webUIConversation.loadConversation();
        console.log('setConversationTitle', parsedBody.title);
        await webUIConversation.setTitle(parsedBody.title);
        return { success: true };
    }
    async pullMessages(parsedBody) {
        console.log('pullMessages', parsedBody);
        const webUIConversation = await new conversation(parsedBody.id);
        await webUIConversation.loadConversation();
        // console.log('webUIConversation', webUIConversation);
        const response = await webUIConversation.getMessages();
        return webUIConversation;
    }
    async writeMethodWithLLM(parsedBody) {
        console.log('newChat', parsedBody);
        if (!parsedBody.targetFile) {
            return { error: 'No target file provided' };
        }
        const webUIConversation = new conversation();
        //console.log('newChat', webUIConversation);
        await webUIConversation.setMode('chat');
        await webUIConversation.setTitle(`Chat about ${parsedBody.targetFile}`);
        if (parsedBody.title)
            await webUIConversation.setTitle(parsedBody.title);
        await webUIConversation.setTargetFile(parsedBody.targetFile);
        await webUIConversation.addFileMessage('system', './.aiCoder/prompts/default-system-prompt.md');
        await webUIConversation.addFileMessage('user', './.aiCoder/prompts/default-plan-prompt.md');
        await webUIConversation.addTargetFileMessage('user', `// file:'${parsedBody.targetFile}'`);
        await webUIConversation.addFileMessage('system', './.aiCoder/prompts/snippet-production-prompt.md');
        await webUIConversation.addMessage('user', `Write the ${parsedBody.methodName} method in the ${parsedBody.className} class.`);
        //await webUIConversation.addMessage("user", `The method should ${parsedBody.methodDescription}`);
        await webUIConversation.callLLM();
        // extract the code snippets from the conversation
        const response = await webUIConversation.lastMessage();
        const snippets = await extractCodeSnippets(response);
        console.log('snippets', snippets);
        for (const snippet of snippets) {
            await this.applySnippet({
                targetFile: parsedBody.targetFile,
                snippet
            });
        }
    }
    async newChat(parsedBody) {
        console.log('newChat', parsedBody);
        if (!parsedBody.targetFile) {
            return { error: 'No target file provided' };
        }
        const webUIConversation = new conversation();
        console.log('newChat', webUIConversation);
        console.log('newChat', webUIConversation);
        await webUIConversation.setMode('chat');
        await webUIConversation.setTitle(`Chat about ${parsedBody.targetFile}`);
        if (parsedBody.title)
            await webUIConversation.setTitle(parsedBody.title);
        await webUIConversation.setTargetFile(parsedBody.targetFile);
        await webUIConversation.addFileMessage('system', './.aiCoder/prompts/default-system-prompt.md');
        await webUIConversation.addFileMessage('user', './.aiCoder/prompts/default-plan-prompt.md');
        await webUIConversation.addTargetFileMessage('user', '// Code file to be edited');
        await webUIConversation.addFileMessage('system', './.aiCoder/prompts/snippet-production-prompt.md');
        return {
            id: webUIConversation.id,
            targetFile: webUIConversation.targetFile
        };
    }
    async newPlanChat() {
        const webUIConversation = new conversation();
        await webUIConversation.setMode('plan');
        await webUIConversation.setTitle(`Plan Chat`);
        await webUIConversation.addFileMessage('system', './.aiCoder/prompts/plan-edit-prompt.md');
        await webUIConversation.addFileMessage('user', './.aiCoder/prompts/default-plan-prompt.md', 'Plan to be edited:');
        return {
            id: webUIConversation.id,
            targetFile: webUIConversation.targetFile
        };
    }
    async callLLM(parsedBody) {
        const webUIConversation = new conversation(parsedBody.id);
        await webUIConversation.loadConversation();
        await webUIConversation.callLLM();
        const response = await webUIConversation.getConversation();
        return response;
    }
    async getConversationsList() {
        return await listConversations();
    }
    async applySnippet(parsedBody) {
        try {
            const mergeResult = await applySnippets(parsedBody.targetFile, [parsedBody.snippet]);
            return { success: mergeResult };
        } catch (e) {
            //console.log('Error applying snippet:', e);
            return { error: e };
        }
    }
    async applySnippet(parsedBody) {
        try {
            const mergeResult = await applySnippets(parsedBody.targetFile, [parsedBody.snippet]);
            return { success: mergeResult };
        } catch (e) {
            if (parsedBody.id) {
                //console.log('Error applying snippet:', e);
                await this.addMessage({
                    id: parsedBody.id,
                    message: {
                        role: "assistant", content: `
Error applying snippet:
\`\`\`
${e}
\`\`\`

Snippet:
\`\`\`
${parsedBody.snippet}
\`\`\`
`}
                });

                await this.callLLM({ id: parsedBody.id });

                return { success: false };
            } else {
                return { error: e };
            }


        }
    }
    async getMethodsList(parsedBody) {
        const response = await getMethodsWithArguments(await readFile(parsedBody.targetFile));
        return response;
    }
    async getFunctionList(parsedBody) {
        const response = await getListOfFunctions(await readFile(parsedBody.targetFile));
        return response;
    }
    async llmSettings(parsedBody) {
        return await llmSettings();
    }
    async llmSettingsUpdate(parsedBody) {
        return await llmSettingsUpdate(parsedBody);
    }
    async getSystemPrompts() {
        return {
            default_plan_prompt: await readSetting('prompts/default-plan-prompt.md'),
            default_system_prompt: await readSetting('prompts/default-system-prompt.md'),
            snippet_production_prompt: await readSetting('prompts/snippet-production-prompt.md')
        };
    }
    async updateSystemPrompts(parsedBody) {
        await writeSetting('prompts/default-plan-prompt.md', parsedBody.default_plan_prompt);
        await writeSetting('prompts/default-system-prompt.md', parsedBody.default_system_prompt);
        await writeSetting('prompts/snippet-production-prompt.md', parsedBody.snippet_production_prompt);
        return { success: true };
    }
    async savePlan(parsedBody) {
        if (parsedBody.append) {
            const currentPlan = await readSetting('prompts/default-plan-prompt.md');
            await writeSetting('prompts/default-plan-prompt.md', currentPlan + '\n' + parsedBody.plan);
        } else {
            await writeSetting('prompts/default-plan-prompt.md', parsedBody.plan);
        }
        return { success: true };
    }
    async gotoLineNumber(parsedBody) {
        console.log('gotoLineNumber', parsedBody);
        await launchEditor(parsedBody.targetFile, parsedBody.lineNumber);
        return { success: true };
    }
    async mergeAndFormat(parsedBody) {
        await intelligentlyMergeSnippets(parsedBody.targetFile);
        return { success: true };
    }
    async getFilesList() {
        return { files: await getAllFiles('./') };
    }
    async prependClassStructure(parsedBody) {
        await prependClassStructure(parsedBody.targetFile);
        // Fix missing parameter
        return { success: true };
    }
    async readFile(parsedBody) {
        return { fileContent: await readFile(parsedBody.targetFile) };
    }
    async writeFile(parsedBody) {
        await writeFile(parsedBody.targetFile, parsedBody.fileContent);
        return { success: true };
    }
    async resetSystemPrompts() {
        await deleteFile('./.aiCoder/prompts/default-system-prompt.md');
        await deleteFile('./.aiCoder/prompts/snippet-production-prompt.md');
        await deleteFile('./.aiCoder/prompts/snippet-validation-prompt.md');
        await deleteFile('./.aiCoder/prompts/plan-edit-prompt.md');
        await deleteFile('./.aiCoder/prompts/customPrompts.json');
        await setupConfigFiles();
        return { success: true };
    }
}
export class conversation {
    constructor(id = null, targetFile = null) {
        this.messages = [];
        this.title = '';
        this.targetFile = targetFile;
        this.chatMode = 'chat';
        this.conversationNew = true;
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

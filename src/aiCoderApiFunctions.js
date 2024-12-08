import { applySnippets } from "./intelligentMerge.js"
import { getMethodsWithArguments } from "./classListing.js";
import { appendFile, getAllFiles, readFile, readOrLoadFromDefault, writeFile } from "./fileIO.js";
import { intelligentlyMergeSnippets } from "./intelligentMerge.js";
import { llmSettings, llmSettingsUpdate } from "./llmCall.js";
import { launchNano } from "./terminalHelpers.js";
import { prependClassStructure } from './classListing.js';
import fs from 'fs';
import { callLLM } from './llmCall.js';



readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md');
readOrLoadFromDefault('./.aiCoder/default-plan-prompt.md', '/prompts/default-plan-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-validation-prompt.md', '/prompts/snippet-validation-prompt.md');
readOrLoadFromDefault('./.aiCoder/plan-edit-prompt.md', '/prompts/plan-edit-prompt.md');
readOrLoadFromDefault('./.aiCoder/customPrompts.json', '/prompts/customPrompts.json');



export class aiCoderApiFunctions {
    async addMessage(parsedBody) {
        const webUIConversation = new conversation(parsedBody.id);
        await webUIConversation.loadConversation();
        console.log('addMessage', parsedBody.message);
        await webUIConversation.addMessage("user", parsedBody.message);
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


    async newChat(parsedBody) {
        console.log('newChat', parsedBody);
        if (!parsedBody.targetFile) {
            return { error: "No target file provided" };
        }
        const webUIConversation = new conversation();
        console.log('newChat', webUIConversation);
        console.log('newChat', webUIConversation);
        await webUIConversation.setMode('chat');
        await webUIConversation.setTitle(`Chat about ${parsedBody.targetFile}`);
        if (parsedBody.title) await webUIConversation.setTitle(parsedBody.title);
        await webUIConversation.setTargetFile(parsedBody.targetFile);

        await webUIConversation.addFileMessage("system", './.aiCoder/default-system-prompt.md');
        await webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md');
        await webUIConversation.addTargetFileMessage("user", "// Code file to be edited");
        await webUIConversation.addFileMessage("system", './.aiCoder/snippet-production-prompt.md');
        return { id: webUIConversation.id, targetFile: webUIConversation.targetFile };
    }

    async newPlanChat() {
        const webUIConversation = new conversation();
        await webUIConversation.setMode('plan');
        await webUIConversation.setTitle(`Plan Chat`);

        await webUIConversation.addFileMessage("system", './.aiCoder/plan-edit-prompt.md');
        await webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md', "Plan to be edited:");
        return { id: webUIConversation.id, targetFile: webUIConversation.targetFile };
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
        await applySnippets(parsedBody.targetFile, [parsedBody.snippet]);
        return { success: true };
    }

    async getMethodsList(parsedBody) {
        const response = await getMethodsWithArguments(await readFile(parsedBody.targetFile));
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
            default_plan_prompt: await readOrLoadFromDefault('./.aiCoder/default-plan-prompt.md', '/prompts/default-plan-prompt.md'),
            default_system_prompt: await readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md'),
            snippet_production_prompt: await readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md'),
        };
    }

    async updateSystemPrompts(parsedBody) {
        await writeFile('./.aiCoder/default-plan-prompt.md', parsedBody.default_plan_prompt);
        await writeFile('./.aiCoder/default-system-prompt.md', parsedBody.default_system_prompt);
        await writeFile('./.aiCoder/snippet-production-prompt.md', parsedBody.snippet_production_prompt);
        return { success: true };
    }

    async savePlan(parsedBody) {
        if (parsedBody.append) {
            await appendFile('./.aiCoder/default-plan-prompt.md', parsedBody.plan, true);
        } else {
            await writeFile('./.aiCoder/default-plan-prompt.md', parsedBody.plan);
        }

        return { success: true };
    }

    async gotoLineNumber(parsedBody) {
        await launchNano(parsedBody.targetFile, parsedBody.lineNumber);
        return { success: true };
    }

    async mergeAndFormat(parsedBody) {
        await intelligentlyMergeSnippets(parsedBody.targetFile);
        return { success: true };
    }

    async getFilesList() {
        return { files: await getAllFiles("./") };
    }


    async prependClassStructure(parsedBody) {
        await prependClassStructure(parsedBody.targetFile); // Fix missing parameter
        return { success: true };
    }



    async readFile(parsedBody) {
        return { fileContent: await readFile(parsedBody.targetFile) };
    }

    async writeFile(parsedBody) {
        await writeFile(parsedBody.targetFile, parsedBody.fileContent);
        return { success: true };
    }
}































export class conversation {
    constructor(id = null, targetFile = null) {
        this.messages = [];
        this.title = '';
        this.targetFile = targetFile;
        this.chatMode = 'chat';

        if (id) {
            this.id = id;
            //this.loadConversation(id);
            //console.log('loaded conversation', this);
        } else {
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

    async generateTitle() {
        // ask the LLM to generate the title. 
        await this.addMessage('user', 'Generate a title for this conversation. Respond with a single line of text.');
        const title = await this.callLLM();
        //Remove the last 2 messages from the conversation
        await this.messages.pop();
        await this.messages.pop();
        await this.setTitle(title);
    }

    async setTargetFile(targetFile) {
        this.targetFile = targetFile;
        await this.storeConversation();
    }

    async addMessage(role, content) {
        await this.messages.push({ role, content });
        await this.storeConversation();
    }

    async addFileMessage(role, filePath, description = '') {
        await this.messages.push({ role, content: filePath, filePath, description });
        this.storeConversation();
    }

    async addTargetFileMessage(description = '') {
        await this.addFileMessage('user', this.targetFile, description);
    }

    async lastMessage() {
        return this.messages[this.messages.length - 1].content;
    }

    async callLLM() {
        let llmResponse = await callLLM(this.messages);
        llmResponse = llmResponse.trim();
        await this.addMessage('assistant', llmResponse);
        await this.storeConversation();
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
            messages: this.messages,
        }
    }

    async clearMessages() {
        this.messages = [];
        this.storeConversation();
    }

    async storeConversation(id = this.id) {
        // write the conversation to a file
        const conversationObject = {
            messages: this.messages,
            title: this.title,
            id: this.id,
            targetFile: this.targetFile,
            chatMode: this.chatMode,
            lastModified: new Date().toISOString()
        };
        const conversationJSON = JSON.stringify(conversationObject);
        const filePath = `./.aiCoder/conversations/${id}.json`;
        await writeFile(filePath, conversationJSON);

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
            return console.log('conversation loaded');
        } catch (e) {
            console.log('conversation not found');
            return { error: 'conversation not found' };

        }
    }

    async deleteConversation() {
        const filePath = `./.aiCoder/conversations/${this.id}.json`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }


}


async function listConversations() {
    // return an array of all the conversations in the following format:
    //   [{
    //     id: conversation.id,
    //     title: conversation.title,
    //     lastModified: new Date(conversation.lastModified)
    //   }]
    const conversationFolder = './.aiCoder/conversations';
    if (!fs.existsSync(conversationFolder)) {
        fs.mkdirSync(conversationFolder);
    }



    const conversationFiles = fs.readdirSync(conversationFolder);
    const conversationIds = [];
    for (const file of conversationFiles) {
        const filePath = `${conversationFolder}/${file}`;
        const conversationJSON = await readFile(filePath);
        const conversationObject = JSON.parse(conversationJSON);
        conversationIds.push({
            id: conversationObject.id,
            title: conversationObject.title,
            lastModified: new Date(conversationObject.lastModified)
        });
    }

    return conversationIds;
}


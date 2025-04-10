import { scrapeToMarkdown } from '@mmiscool/scrape_to_markdown';
import fs from 'fs';
import { writeFile, readFile } from './fileIO.js';
import { callLLM } from './llmCall.js';

export class conversation {
    constructor(id = null, targetFile = null) {
        this.messages = [];
        this.title = '';
        this.targetFile = targetFile;
        this.chatMode = 'chat';
        this.conversationNew = true;
        if (id) {
            this.id = id;
        }
        else
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
    async addTargetFileMessage(user, description = 'This is the source code you will be working on') {
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

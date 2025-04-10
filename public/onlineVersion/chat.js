
import { marked } from 'marked';
export class Conversation {
    constructor(targetCodeFile, model = 'gpt-3.5') {
        this.title = 'New conversation';
        this.targetCodeFile = targetCodeFile;
        this.model = model;
        this.messages = [];
        this.lastModified = Date.now();
        this.id = this.generateUUID();
    }
    addMessage(role, content) {
        this.messages.push({
            role,
            content
        });
        this.lastModified = Date.now();
        this.save();
    }
    toJSON() {
        return {
            title: this.title,
            id: this.id,
            targetCodeFile: this.targetCodeFile,
            model: this.model,
            messages: this.messages,
            lastModified: this.lastModified
        };
    }
    async save() {
        const key = `conversation_${ this.id }.json`;
        await writeFile(key, this.toJSON());
        await writeFile('lastConversation.id', this.id);
    }
    async load(id) {
        const key = `conversation_${ id }.json`;
        const data = await readFile(key);
        if (!data)
            return null;
        const conv = new Conversation(data.targetCodeFile, data.model || 'gpt-3.5');
        conv.title = data.title;
        conv.id = data.id;
        conv.messages = data.messages;
        conv.lastModified = data.lastModified;
        return conv;
    }
    async listConversations() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('conversation_'));
        const conversations = await Promise.all(keys.map(async key => {
            const data = await readFile(key);
            return {
                id: data.id,
                title: data.title || 'Untitled Conversation'
            };
        }));
        return conversations;
    }
    setModel(modelName) {
        this.model = modelName;
        this.lastModified = Date.now();
        this.save();
    }
    generateUUID() {
        return ([10000000] + -1000 + -4000 + -8000 + -100000000000).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
}
export class ChatManager {
    async setTargetFile(targetFile) {
        this.targetFileInput.value = targetFile;
        ctx.targetFile = targetFile;
        return this.displayStubs();
    }
    async loadConversationsList() {
        const conversations = await readFile('./conversationsList.json');
    }
    async addMessage(content) {
        const message = {
            role: 'user',
            content: content
        };
        await this.addMessageToChat(message);
    }
    async writeConversation(conversationId, conversationData) {
        await writeFile(`conversation_${ conversationId }.json`, conversationData);
        //Update last conversation ID after writing the conversation
        writeFile(this.lastConversationIdKey, conversationId);
    }
    async loadConversation(conversationId) {
        const conversationToLoad = await readFile(`conversation_${ conversationId }.json`);
        if (conversationToLoad) {
            this.chatMessageDiv.innerHTML = '';
            const conversationMessages = conversationToLoad.messages;
            conversationMessages.forEach(message => {
                this.addMessageToChat(message);
            });
            this.modelPicker.value = conversationToLoad.model || this.modelPicker.value;
            this.conversationPicker.value = conversationId;
            const titleElement = document.getElementById('conversation-title');
            if (titleElement) {
                titleElement.textContent = conversationToLoad.title;
            }
        } else {
            console.error(`Failed to load conversation: ${ conversationId }`);
        }
    }
    async submitButtonHandler() {
        if (this.userInput.value !== '') {
            await this.addMessage(this.userInput.value);
            this.userInput.value = '';
        }
        await this.callLLM();
    }
    constructor() {
        this.lastConversationIdKey = 'lastConversationId';
        this.newConversationBtn = null;
        this.conversationPicker = null;
        this.userInput = null;
        this.chatMessageDiv = null;
        this.modelPicker = null;
        this.init();
    }
    init() {
    }
    async loadLastConversation() {
        const lastConversationId = await readFile('lastConversation.id');
        if (lastConversationId) {
            await this.loadConversation(lastConversationId);
            this.conversationPicker.value = lastConversationId;
        }
    }
    setupNewConversationButton() {
        this.newConversationBtn.addEventListener('click', async () => {
            const newConversation = new Conversation('Default Chat');
            await newConversation.save();
            await this.saveLastConversationId(newConversation.id);
            await this.loadConversation(newConversation.id);
        });
    }
    async setupConversationPicker() {
        this.conversationPicker.addEventListener('change', async () => {
            const conversationId = this.conversationPicker.value;
            await this.loadConversation(conversationId);
            if (conversationId) {
                this.loadConversation(conversationId);
            } else {
                console.warn('No conversation selected for loading.');
            }
        });
        await this.populateConversationPicker();
    }
    async populateConversationPicker() {
        const conversations = await this.listConversations();
        this.conversationPicker.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Select Conversation';
        this.conversationPicker.add(defaultOption);
        if (conversations.length === 0) {
            console.warn('No conversations available.');
            return;
        }
        conversations.forEach(({id, title}) => {
            const option = document.createElement('option');
            option.value = id;
            option.text = title;
            this.conversationPicker.add(option);
        });
        if (this.conversationPicker.value === '') {
            this.conversationPicker.value = conversations[0].id;
        }
    }
    async saveLastConversationId(conversationId) {
        await writeFile('lastConversation.id', conversationId);
    }
    async addMessageToChat(message) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${ message.role }`;
        const markdown = marked.parse(message.content);
        const rendered = document.createElement('div');
        rendered.innerHTML = markdown;
        rendered.querySelectorAll('pre code').forEach((codeEl, codeIdx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            // Create toolbar for actions related to the code snippet
            const toolbar = document.createElement('div');
            toolbar.className = 'code-toolbar';
            const useButton = document.createElement('button');
            useButton.textContent = '💡 Use This';
            useButton.onclick = () => this.handleCodeAction(codeEl.textContent, {
                msgIndex: message.index,
                // You may need to retrieve the correct index
                codeIndex: codeIdx
            });
            const copyButton = document.createElement('button');
            copyButton.textContent = '📋 Copy';
            copyButton.onclick = () => {
                navigator.clipboard.writeText(codeEl.textContent).then(() => alert('Code copied to clipboard!')).catch(err => console.error('Failed to copy: ', err));
            };
            toolbar.appendChild(useButton);
            toolbar.appendChild(copyButton);
            wrapper.appendChild(toolbar);
            wrapper.appendChild(codeEl.parentElement.cloneNode(true));
            codeEl.parentElement.replaceWith(wrapper);
        });
        messageEl.appendChild(rendered);
        this.chatMessageDiv.appendChild(messageEl);
    }
    async validateElements() {
        if (!this.newConversationBtn) {
            throw new Error('newConversationBtn is not initialized. Ensure the DOM element exists.');
        }
        if (!this.conversationPicker) {
            throw new Error('conversationPicker is not initialized. Ensure the DOM element exists.');
        }
        if (!this.userInput) {
            throw new Error('userInput is not initialized. Ensure the DOM element exists.');
        }
        if (!this.chatMessageDiv) {
            throw new Error('chatMessageDiv (chat-ui) is not initialized. Ensure the DOM element exists.');
        }
    }
    init() {
        document.body.innerHTML = '';
        const controls = document.createElement('div');
        controls.className = 'conversation-controls';
        this.newConversationBtn = document.createElement('button');
        this.newConversationBtn.id = 'new-conversation-btn';
        this.newConversationBtn.textContent = 'New Conversation';
        this.conversationPicker = document.createElement('select');
        this.conversationPicker.id = 'conversation-picker';
        controls.appendChild(this.newConversationBtn);
        controls.appendChild(this.conversationPicker);
        document.body.appendChild(controls);
        const titleDiv = document.createElement('div');
        titleDiv.id = 'conversation-title';
        titleDiv.className = 'conversation-title';
        document.body.appendChild(titleDiv);
        this.chatMessageDiv = document.createElement('div');
        this.chatMessageDiv.id = 'chat-ui';
        this.chatMessageDiv.classList.add('dark-mode');
        document.body.appendChild(this.chatMessageDiv);
        const inputArea = document.createElement('div');
        inputArea.id = 'input-area';
        this.userInput = document.createElement('textarea');
        this.userInput.id = 'user-input';
        this.userInput.rows = 3;
        this.userInput.placeholder = 'Type your message...';
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        this.modelPicker = document.createElement('select');
        this.modelPicker.id = 'model-select';
        const spacer = document.createElement('div');
        spacer.className = 'flex-spacer';
        const sendBtn = document.createElement('button');
        sendBtn.id = 'send-btn';
        sendBtn.textContent = 'Send';
        inputRow.appendChild(this.modelPicker);
        inputRow.appendChild(spacer);
        inputRow.appendChild(sendBtn);
        inputArea.appendChild(this.userInput);
        inputArea.appendChild(inputRow);
        document.body.appendChild(inputArea);
        this.addEventListeners(sendBtn);
        this.validateElements();
        this.loadLastConversation();
        this.setupNewConversationButton();
        this.setupConversationPicker();
        this.populateConversationPicker();
        // Call to populate initial conversation options
        getModelsList();
    }
    addEventListeners(sendBtn) {
        sendBtn.addEventListener('click', async () => {
            await this.submitButtonHandler();
        });
        this.newConversationBtn.addEventListener('click', async () => {
            const newConversation = new Conversation('Default Chat');
            await newConversation.save();
            await this.saveLastConversationId(newConversation.id);
            await this.loadConversation(newConversation.id);
        });
        this.conversationPicker.addEventListener('change', async () => {
            const conversationId = this.conversationPicker.value;
            await this.loadConversation(conversationId);
        });
        this.modelPicker.addEventListener('change', () => {
            this.setModel(this.modelPicker.value);
        });
    }
    async listConversations() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('conversation_'));
        const conversations = await Promise.all(keys.map(async key => {
            const data = await readFile(key);
            return {
                id: data.id,
                title: data.title || 'Untitled Conversation'
            };
        }));
        return conversations;
    }
    setModel(modelName) {
        this.model = modelName;
        this.lastModified = Date.now();
        this.save();
    }
    // Define callLLM method
    async callLLM() {
        this.writeConversation(this.conversationPicker.value, this.conversation);
        console.log('Calling LLM with current message.');
    }
    handleCodeAction(code, {msgIndex, codeIndex}) {
        console.log('Code Action Triggered:', {
            code,
            msgIndex,
            codeIndex
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    new ChatManager();
});
export async function writeFile(fileName, content) {
    try {
        localStorage.setItem(fileName, JSON.stringify(content));
    } catch (error) {
        console.error('Error writing to local storage:', error);
    }
}
export async function readFile(fileName) {
    try {
        const value = localStorage.getItem(fileName);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading from local storage:', error);
        return null;
    }
}
const conversation = new Conversation('Default Chat', '/path/to/file.js');
export function renderConversationUI(conversation, onCodeAction) {
    chatUI.innerHTML = '';
    conversation.messages.forEach((msg, index) => {
        const msgEl = document.createElement('div');
        msgEl.className = `message ${ msg.role }`;
        const markdown = marked.parse(msg.content);
        const rendered = document.createElement('div');
        rendered.innerHTML = markdown;
        rendered.querySelectorAll('pre code').forEach((codeEl, codeIdx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            const btn = document.createElement('button');
            btn.textContent = '💡 Use This';
            btn.onclick = () => {
                onCodeAction(codeEl.textContent, {
                    msgIndex: index,
                    codeIndex: codeIdx
                });
            };
            wrapper.appendChild(btn);
            wrapper.appendChild(codeEl.parentElement.cloneNode(true));
            codeEl.parentElement.replaceWith(wrapper);
        });
        msgEl.appendChild(rendered);
        chatUI.appendChild(msgEl);
    });
    chatUI.scrollTop = chatUI.scrollHeight;
}
export function handleCodeAction(code, {msgIndex, codeIndex}) {
    console.log('Code Action Triggered:', {
        code,
        msgIndex,
        codeIndex
    });
}
export function getModelsList() {
    const availableModels = [
        {
            value: 'gpt-3.5',
            label: 'GPT-3.5'
        },
        {
            value: 'gpt-4',
            label: 'GPT-4'
        },
        {
            value: 'mixtral',
            label: 'Mixtral'
        },
        {
            value: 'llama3',
            label: 'LLaMA 3'
        }
    ];
    const modelSelect = document.getElementById('model-select');
    // Populate model dropdown
    availableModels.forEach(({value, label}) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        modelSelect.appendChild(option);
    });
}

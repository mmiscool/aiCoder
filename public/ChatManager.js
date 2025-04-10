
import { doAjax } from './doAjax.js';
import { MarkdownToHtml } from './MarkdownToHtml.js';
import { makeElement } from './domElementFactory.js';
import {
    choseFile,
    fileDialog
} from './fileDialog.js';
import { auto } from 'groq-sdk/_shims/registry.mjs';
export class ChatManager {
    constructor(container, app_ctx) {
        this.setup(container, app_ctx);
    }
    async setup(container, app_ctx) {
        ctx = app_ctx;
        this.chatMode = 'chat';
        this.container = container;
        // check localStorage for the autoApplyMode setting if it exists
        this.autoApplyMode = false;
        // ad an input element that displays the conversation title
        this.conversationTitleInput = document.createElement('input');
        this.conversationTitleInput.type = 'text';
        this.conversationTitleInput.style.width = '100%';
        //await this.populateModelSelect();
        //make it so that on change it saves the title
        this.conversationTitleInput.addEventListener('change', async () => {
            const conversationId = this.conversationPicker.value;
            await doAjax('./setConversationTitle', {
                id: conversationId,
                title: this.conversationTitleInput.value
            });
            await this.loadConversationsList();
        });
        // add an input element that displays the target file path
        this.targetFileInput = document.createElement('input');
        this.targetFileInput.type = 'text';
        this.targetFileInput.style.width = '100%';
        // make disabled
        this.targetFileInput.contentEditable = false;
        //add an onclick event that opens the file dialog
        this.targetFileInput.addEventListener('click', async () => {
            const targetFile = await choseFile();
            this.setTargetFile(targetFile);
        });
        // make a div to hold the conversation title and target file input elements
        // have the labels for the fields to the left of the input fields
        // have the input fields take up the rest of the space
        // each field should be on its own line
        const titleDiv = document.createElement('div');
        titleDiv.style.display = 'flex';
        titleDiv.style.flexDirection = 'row';
        titleDiv.style.justifyContent = 'right';
        titleDiv.style.margin = '10px';
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        titleLabel.style.width = '100px';
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(this.conversationTitleInput);
        const targetFileDiv = document.createElement('div');
        targetFileDiv.style.display = 'flex';
        targetFileDiv.style.flexDirection = 'row';
        targetFileDiv.style.justifyContent = 'right';
        targetFileDiv.style.margin = '10px';
        const targetFileLabel = document.createElement('label');
        targetFileLabel.textContent = 'Target File:';
        targetFileLabel.style.width = '100px';
        targetFileDiv.appendChild(targetFileLabel);
        targetFileDiv.appendChild(this.targetFileInput);
        this.container.appendChild(titleDiv);
        this.container.appendChild(targetFileDiv);
        // div to hold the conversation picker
        const conversationPickerDiv = document.createElement('div');
        conversationPickerDiv.style.display = 'flex';
        conversationPickerDiv.style.flexDirection = 'row';
        conversationPickerDiv.style.justifyContent = 'right';
        conversationPickerDiv.style.margin = '10px';
        const conversationPickerLabel = document.createElement('label');
        conversationPickerLabel.textContent = 'Select Conversation:';
        conversationPickerLabel.style.width = '100px';
        conversationPickerDiv.appendChild(conversationPickerLabel);
        this.conversationPicker = document.createElement('select');
        this.conversationPicker.style.margin = '10px';
        this.conversationPicker.style.width = '100%';
        this.conversationPicker.size = 1;
        this.conversationPicker.addEventListener('change', async () => {
            const selectedId = this.conversationPicker.value;
            if (selectedId) {
                const oldAutoApplyMode = this.autoApplyMode;
                this.autoApplyMode = false;
                await this.loadConversation(selectedId);
                this.autoApplyMode = oldAutoApplyMode;
            }
        });
        // make clicking on the conversation picker adjust the size of the select element
        this.conversationPicker.addEventListener('click', () => {
            if (this.conversationPicker.size === 1) {
                this.conversationPicker.size = this.conversationPicker.length;
            } else {
                this.conversationPicker.size = 1;
            }
        });
        conversationPickerDiv.appendChild(this.conversationPicker);
        this.container.appendChild(conversationPickerDiv);
        // checkboxes for auto apply mode
        const autoApplyDiv = document.createElement('div');
        autoApplyDiv.style.display = 'flex';
        autoApplyDiv.style.flexDirection = 'row';
        autoApplyDiv.style.justifyContent = 'left';
        autoApplyDiv.style.margin = '10px';
        const autoApplyLabel = document.createElement('label');
        autoApplyLabel.textContent = 'Auto Apply Mode:';
        //autoApplyLabel.style.width = '200';
        autoApplyDiv.appendChild(autoApplyLabel);
        this.autoApplyCheckbox = document.createElement('input');
        this.autoApplyCheckbox.type = 'checkbox';
        this.autoApplyCheckbox.style.margin = '0px';
        this.autoApplyCheckbox.style.justifyContent = 'left';
        this.autoApplyCheckbox.addEventListener('change', () => {
            this.autoApplyMode = this.autoApplyCheckbox.checked;
            localStorage.setItem('autoApplyMode', this.autoApplyMode);
        });
        autoApplyDiv.appendChild(this.autoApplyCheckbox);
        this.container.appendChild(autoApplyDiv);
        await this.loadConversationsList();
        // Call loadConversation with the selected conversation ID if any
        if (this.conversationPicker.value) {
            this.loadConversation(this.conversationPicker.value);
        }
        this.newChatButton = document.createElement('button');
        this.newChatButton.textContent = 'New Chat';
        this.newChatButton.style.margin = '10px';
        this.newChatButton.addEventListener('click', () => {
            this.newChat();
        });
        this.container.appendChild(this.newChatButton);
        this.newChatWithPromptButton = document.createElement('button');
        this.newChatWithPromptButton.textContent = 'New Chat with Prompt';
        this.newChatWithPromptButton.style.margin = '10px';
        this.newChatWithPromptButton.addEventListener('click', () => {
            this.displayPremadePromptsList(true);
        });
        this.container.appendChild(this.newChatWithPromptButton);
        this.newPlanChatButton = document.createElement('button');
        this.newPlanChatButton.textContent = 'New Plan Chat';
        this.newPlanChatButton.style.margin = '10px';
        this.newPlanChatButton.addEventListener('click', () => {
            this.newPlanChat();
        });
        this.container.appendChild(this.newPlanChatButton);
        this.chatMessageDiv = document.createElement('div');
        this.container.appendChild(this.chatMessageDiv);
        this.promptsDialog = document.createElement('dialog');
        this.promptsDialog.style.position = 'absolute';
        this.promptsDialog.style.top = '30px';
        this.promptsDialog.style.bottom = '30px';
        this.promptsDialog.style.right = '30px';
        this.promptsDialog.style.left = '30px';
        this.promptsDialog.style.padding = '10px';
        this.promptsDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.promptsDialog.style.zIndex = '1000';
        this.promptsDialog.addEventListener('click', () => {
            this.promptsDialog.close();
        });
        document.body.appendChild(this.promptsDialog);
        this.promptsDialog.close();
        // button to display the list of custom prompts
        this.customPromptsButton = document.createElement('button');
        this.customPromptsButton.textContent = 'Custom Prompts';
        this.customPromptsButton.style.margin = '10px';
        this.customPromptsButton.addEventListener('click', () => {
            this.displayPremadePromptsList();
        });
        this.container.appendChild(this.customPromptsButton);
        // add label for user input
        this.userInputLabel = document.createElement('label');
        this.userInputLabel.textContent = 'User Input:';
        this.userInputLabel.style.display = 'block';
        this.userInputLabel.style.marginBottom = '5px';
        this.container.appendChild(this.userInputLabel);
        // add text area for user input
        this.userInput = document.createElement('textarea');
        this.userInput.style.width = '100%';
        this.userInput.style.height = '100px';
        this.userInput.style.marginBottom = '10px';
        this.userInput.style.padding = '5px';
        // set a hint that shows in the empty field. 
        this.userInput.placeholder = 'Tell me what you want, what you really really want...';
        this.userInput.addEventListener('keydown', function (event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                // Prevent the default tab behavior
                const start = this.selectionStart;
                const end = this.selectionEnd;
                // Insert a tab character at the cursor's position
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                // Move the cursor to the correct position after the tab
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
        this.container.appendChild(this.userInput);
        // add button to submit user input
        this.submitButton = document.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.submitButton.style.width = '100%';
        this.submitButton.style.marginBottom = '100px';
        this.submitButton.addEventListener('click', async () => {
            await this.submitButtonHandler();
        });
        this.container.appendChild(this.submitButton);
        this.setInput('');
        // Call loadConversation with the selected conversation ID if any
        if (this.conversationPicker.value) {
            await this.loadConversation(this.conversationPicker.value);
        } else {
            // set the conversation picker to the first conversation
            this.conversationPicker.selectedIndex = 0;
            if (this.conversationPicker.value) {
                await this.loadConversation(this.conversationPicker.value);
            }
        }
        this.autoApplyMode = localStorage.getItem('autoApplyMode') === 'true';
        this.autoApplyCheckbox.checked = this.autoApplyMode;
        this.setInput('');
    }
    async populateModelSelect() {
        // model selector 
        const modelData = await doAjax('./llmSettings', {});
        // add a select element to the container
        this.modelPicker = document.createElement('select');
        this.modelPicker.style.margin = '10px';
        this.modelPicker.style.width = '100%';
        this.modelPicker.size = 1;
        this.modelPicker.addEventListener('change', async () => {
            const selectedModel = this.modelPicker.value;
            alert(`Selected model: ${ selectedModel }`);
        });
        // add the model picker to the container
        this.container.appendChild(this.modelPicker);
        this.modelPicker.innerHTML = '';
        Object.entries(modelData).forEach(([provider, data]) => {
            if (data.models && Array.isArray(data.models)) {
                // Create optgroup for each provider
                const group = document.createElement('optgroup');
                group.label = provider;
                data.models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = `${ provider }:${ model }`;
                    option.textContent = model;
                    group.appendChild(option);
                });
                this.modelPicker.appendChild(group);
            }
        });
    }
    async submitButtonHandler() {
        // Test if message is empty. If empty, do not add message.
        if (this.userInput.value !== '') {
            await this.addMessage(this.userInput.value);
            this.userInput.value = '';
        }
        await this.callLLM();
    }
    async setTargetFile(targetFile) {
        this.targetFileInput.value = targetFile;
        ctx.targetFile = targetFile;
        // Test if target file ends with .css or .html
        return this.displayStubs();
    }
    async loadConversationsList() {
        const conversations = await readFile('./conversationsList.json');
    }
    async loadConversation(conversationId) {
        const response = await doAjax('./pullMessages', { id: conversationId });
        ctx.targetFile = response.targetFile;
        await this.setTargetFile(response.targetFile);
        this.conversationTitleInput.value = response.title;
        this.chatMessageDiv.innerHTML = '';
        const conversationMessages = response.messages;
        await this.writeConversation(conversationId, {
            messages: conversationMessages,
            targetFile: response.targetFile,
            model: response.model
        });
        conversationMessages.forEach(async message => {
            await this.addMessage(message);
        });
        await this.addCodeToolbars();
    }
    async displayPremadePromptsList(newConversation = false) {
        const customPromptsJSON = await doAjax('./readFile', { targetFile: '.aiCoder/prompts/customPrompts.json' });
        let customPrompts = JSON.parse(customPromptsJSON.fileContent);
        if (!customPrompts)
            customPrompts = [];
        //console.log('prompts', customPrompts);
        // create a modal dialog that displays the list of prompts.
        // Make the dialog as an overlay that covers the whole screen.
        // Add a close button to the dialog.
        // display the list of prompts in a scrollable div.
        // clicking on a prompt should add it to the user input field.
        this.promptsDialog.showModal();
        this.promptsDialog.innerHTML = '';
        // add a checkbox for automatic submit mode
        const autoSubmitCheckbox = document.createElement('input');
        autoSubmitCheckbox.type = 'checkbox';
        autoSubmitCheckbox.checked = localStorage.getItem('autoSubmitMode') === 'true';
        autoSubmitCheckbox.style.margin = '10px';
        this.promptsDialog.appendChild(autoSubmitCheckbox);
        const autoSubmitLabel = document.createElement('label');
        autoSubmitLabel.textContent = 'Auto Submit Mode';
        autoSubmitLabel.style.fontWeight = 'bold';
        autoSubmitLabel.style.margin = '10px';
        this.promptsDialog.appendChild(autoSubmitLabel);
        autoSubmitCheckbox.addEventListener('change', event => {
            this.displayPremadePromptsList(newConversation);
            localStorage.setItem('autoSubmitMode', autoSubmitCheckbox.checked);
        });
        // add "Pre-made Prompts:" to the dialog
        const premadePromptsLabel = document.createElement('div');
        premadePromptsLabel.textContent = 'Pre-made Prompts:';
        premadePromptsLabel.style.fontWeight = 'bold';
        this.promptsDialog.appendChild(premadePromptsLabel);
        // loop over the prompts and add them to the dialog
        // also add a trash can icon to delete the prompt from the list
        for (const prompt of customPrompts) {
            const promptDiv = document.createElement('div');
            promptDiv.textContent = prompt;
            promptDiv.style.padding = '10px';
            // right padding to make room for the trash icon
            promptDiv.style.paddingRight = '40px';
            promptDiv.style.border = '1px solid black';
            promptDiv.style.backgroundColor = 'rgba(0, 50, 100, 0.9)';
            promptDiv.style.margin = '10px';
            promptDiv.style.cursor = 'pointer';
            // preformatted text
            promptDiv.style.whiteSpace = 'pre-wrap';
            promptDiv.addEventListener('click', async () => {
                if (newConversation)
                    await this.newChat(prompt);
                await this.setInput(prompt);
                await this.promptsDialog.close();
                if (autoSubmitCheckbox.checked)
                    await this.submitButtonHandler();
            });
            const trashIcon = document.createElement('span');
            trashIcon.textContent = '🗑️';
            trashIcon.style.float = 'right';
            trashIcon.style.cursor = 'pointer';
            trashIcon.style.padding = '5px';
            trashIcon.style.border = '1px solid black';
            trashIcon.style.backgroundColor = 'darkred';
            trashIcon.style.borderRadius = '5px';
            trashIcon.style.margin = '-5px';
            //make bold
            trashIcon.style.fontWeight = 'bold';
            // right margin to make the icon float to the right
            trashIcon.style.marginRight = '-35px';
            trashIcon.addEventListener('click', async event => {
                event.stopPropagation();
                this.promptsDialog.close();
                const confirmDelete = await confirm(`Delete prompt: \n "${ prompt }"?`, 0, false);
                if (confirmDelete) {
                    customPrompts = customPrompts.filter(p => p !== prompt);
                    await doAjax('./writeFile', {
                        targetFile: './.aiCoder/prompts/customPrompts.json',
                        fileContent: JSON.stringify(customPrompts, null, 2)
                    });
                    this.displayPremadePromptsList();
                }
                this.promptsDialog.showModal();
            });
            promptDiv.appendChild(trashIcon);
            this.promptsDialog.appendChild(promptDiv);
        }
    }
    async setInput(newValue) {
        this.userInput.value = newValue;
        this.userInput.focus();
    }
    async addMessage(message) {
        const conversationId = this.conversationPicker.value;
        let conversationData = await readFile(`./conversation_${ conversationId }.json`) || {
            messages: [],
            targetFile: ctx.targetFile,
            model: this.modelPicker ? this.modelPicker.value : null,
            lastModified: new Date().toISOString()
        };
        conversationData.messages.push(message);
        conversationData.lastModified = new Date().toISOString();
        await this.writeConversation(conversationId, conversationData);
        await this.loadConversation(conversationId);
    }
    async newChat(title = false) {
        let targetFile = this.targetFileInput.value;
        if (!targetFile || targetFile === '') {
            targetFile = await choseFile();
        }
        const response = await doAjax('./newChat', {
            targetFile,
            title
        });
        this.chatMode = 'chat';
        await this.loadConversationsList();
        this.conversationPicker.value = response.id;
        return await this.loadConversation(response.id);
    }
    async newPlanChat(title = false) {
        const response = await doAjax('./newPlanChat', { title });
        await this.loadConversationsList();
        this.chatMode = 'plan';
        this.conversationPicker.value = response.id;
        await this.loadConversation(response.id);
    }
    async callLLM() {
        const conversationId = this.conversationPicker.value;
        await doAjax('./callLLM', { id: conversationId });
        await this.loadConversation(conversationId);
    }
    async addCodeToolbars() {
        // Query all <code> elements on the page
        let codeElements = [];
        // querySelector for all elements of type <code>
        if (this.chatMode === 'plan')
            codeElements = await document.getElementsByTagName('code');
        if (this.chatMode === 'chat') {
            codeElements = await document.getElementsByTagName('code');
            // filter out the code elements that are a single line
            codeElements = Array.from(codeElements).filter(codeElement => {
                return codeElement.textContent.split('\n').length > 1;
            });
        }
        codeElements = Array.from(codeElements);
        //console.log('codeElements', codeElements);
        if (codeElements.length === 0)
            return;
        codeElements.forEach(codeElement => {
            //console.log('codeElement', codeElement);
            // Create a wrapper to hold the code and toolbar
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            // Preserve inline flow of <code> elements
            // Create the toolbar div
            const toolbar = document.createElement('div');
            toolbar.style.position = 'absolute';
            toolbar.style.top = '0px';
            toolbar.style.left = '0px';
            toolbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            toolbar.style.color = 'white';
            toolbar.style.padding = '2px';
            toolbar.style.borderRadius = '4px';
            toolbar.style.zIndex = '10';
            toolbar.style.display = 'flex';
            toolbar.style.gap = '3px';
            const buttonStyles = {
                cursor: 'pointer',
                background: 'none',
                border: '1px solid white',
                color: 'white',
                padding: '2px 5px',
                borderRadius: '3px'
            };
            //console.log('this.chatMode', this.chatMode);
            //console.log("should be making buttons");
            const copyButton = document.createElement('button');
            copyButton.textContent = '📋';
            copyButton.title = 'Copy code to clipboard';
            Object.assign(copyButton.style, buttonStyles);
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeElement.textContent);
            });
            //alert('Code copied to clipboard!');
            toolbar.appendChild(copyButton);
            const editButton = document.createElement('button');
            editButton.textContent = '🤖✎⚡';
            editButton.title = 'Apply snippet';
            Object.assign(editButton.style, buttonStyles);
            editButton.addEventListener('click', async () => {
                codeElement.style.color = 'red';
                const codeString = codeElement.textContent;
                await this.applySnippet(codeString);
                codeElement.style.color = 'cyan';
                this.displayStubs();
            });
            //ctx.tools.displayListOfStubsAndMethods();
            toolbar.appendChild(editButton);
            // Wrap the <code> element with the wrapper
            const parent = codeElement.parentNode;
            parent.insertBefore(wrapper, codeElement);
            wrapper.appendChild(codeElement);
            // Append the toolbar to the wrapper
            wrapper.appendChild(toolbar);
        });
    }
    async displayStubs() {
        const targetFile = this.targetFileInput.value;
        if (targetFile.endsWith('.css') || targetFile.endsWith('.html'))
            return;
        return await ctx.tools.displayListOfStubsAndMethods();
    }
    async applySnippet(codeString) {
        const conversationId = this.conversationPicker.value;
        const isCodeGood = await doAjax('./applySnippet', {
            snippet: codeString,
            targetFile: this.targetFileInput.value
        });
        if (!isCodeGood.success) {
            await alert('Merge failed. Please resolve the conflict manually.', 3);
            // set the user input to say that the snippet was formatted incorrectly 
            // and needs to be corrected. 
            // await this.setInput(`The last snippet was formatted incorrectly and needs to be corrected. 
            //     Remember that methods must be encapsulated in a class.`);
            // if (this.autoApplyMode) {
            //     await this.addMessage(this.userInput.value);
            //     await this.callLLM();
            // }
            // refresh the conversation
            await this.loadConversation(conversationId);
        }
        return isCodeGood;
    }
    async writeConversation(conversationId, conversationData) {
        await writeFile(`./conversation_${ conversationId }.json`, conversationData);
    }
}
let ctx = {};
export function changeTagName(element, newTagName) {
    // Create a new element with the desired tag name
    const newElement = document.createElement(newTagName);
    // Copy attributes
    Array.from(element.attributes).forEach(attr => {
        newElement.setAttribute(attr.name, attr.value);
    });
    // Move child nodes
    while (element.firstChild) {
        newElement.appendChild(element.firstChild);
    }
    // Replace the old element with the new one
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
export {
    writeFile,
    readFile
};
//These functions are now correctly using local storage.
export async function writeFile(filePath, content) {
    try {
        localStorage.setItem(filePath, JSON.stringify(content));
    } catch (error) {
        console.error('Error writing to local storage:', error);
    }
}
export async function readFile(filePath) {
    try {
        const value = localStorage.getItem(filePath);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading from local storage:', error);
        return null;
    }
}
export {
    writeFile,
    readFile
};
<fileTree>
- public/
  - ChatManager.js
  - LLMSettingsManager.js
  - MarkdownToHtml.js
  - ProjectSettingsManager.js
  - confirmDialog.js
  - doAjax.js
  - domElementFactory.js
  - fileDialog.js
  - index.html
  - main.js
  - style.css
  - tabInterface.js
  - toolsManager.js
- src/
  - aiCoderApiFunctions.js
  - apiServer.js
  - backupSystem.js
  - classListing.js
  - extractCodeSnippets.js
  - fileIO.js
  - fileSystem.js
  - findGitRoot.js
  - gitnoteSetup.js
  - llmCall.js
  - main.js
  - mergeTools/
    - languages/
      - css/
        - css.js
      - javascript/
        - javascript.js
      - python/
        - autoMerge.py
        - python.js
      - rust/
        - test.js
    - mergeTool.js
  - prompts/
    - customPrompts.json
  - summartyTool.js
  - terminalHelpers.js
- tests/
  - exampleFile.js

</fileTree>
<fileContents>
<file fileName="public/ChatManager.js">
import { doAjax } from './doAjax.js';
import { MarkdownToHtml } from './MarkdownToHtml.js';
import { makeElement } from './domElementFactory.js';
import {
    choseFile,
    fileDialog
} from './fileDialog.js';
import { auto } from 'groq-sdk/_shims/registry.mjs';
let ctx = {};
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
    async submitButtonHandler() {
        // test if message is empty. If empty, do not add message.
        if (this.userInput.value !== '') {
            await this.addMessage(this.userInput.value);
            this.userInput.value = '';
        }
        await this.callLLM();
    }
    async setTargetFile(targetFile) {
        this.targetFileInput.value = targetFile;
        ctx.targetFile = targetFile;
        return await ctx.tools.displayListOfStubsAndMethods();
    }
    async loadConversationsList() {
        const conversations = await doAjax('./getConversationsList', {});
        conversations.sort((a, b) => {
            return new Date(b.lastModified) - new Date(a.lastModified);
        });
        // clear the conversation picker
        this.conversationPicker.innerHTML = '';
        // add an option for each conversation
        conversations.forEach(conversation => {
            const option = document.createElement('option');
            option.value = conversation.id;
            option.textContent = conversation.title || conversation.id;
            this.conversationPicker.appendChild(option);
        });
    }
    async loadConversation(conversationId) {
        console.log('conversationId', conversationId);
        const response = await doAjax('./pullMessages', { id: conversationId });
        ctx.targetFile = response.targetFile;
        await this.setTargetFile(response.targetFile);
        this.conversationTitleInput.value = response.title;
        this.chatMessageDiv.innerHTML = '';
        response.messages.forEach(async message => {
            const individualMessageDiv = document.createElement('div');
            individualMessageDiv.style.border = '1px solid black';
            individualMessageDiv.style.padding = '10px';
            individualMessageDiv.style.marginBottom = '10px';
            if (message.hidden) individualMessageDiv.style.display = 'none';
            if (message.role === 'user') {
                individualMessageDiv.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
            }
            if (message.role === 'system') {
                individualMessageDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            }
            if (message.role === 'assistant') {
                individualMessageDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            }
            const roleDiv = document.createElement('div');
            roleDiv.textContent = message.role;
            roleDiv.style.fontWeight = 'bold';
            individualMessageDiv.appendChild(roleDiv);
            const contentDiv = document.createElement('div');
            const markdown = await new MarkdownToHtml(contentDiv, message.content);
            if (contentDiv.innerHTML === '') {
                contentDiv.textContent = message.content;
                contentDiv.style.whiteSpace = 'pre-wrap';
            }
            individualMessageDiv.appendChild(contentDiv);
            if (message.role === 'assistant') {
                // check if the conversation name starts with "plan"
                if (this.conversationTitleInput.value.toLowerCase().startsWith('plan')) {
                    const savePlanButton = document.createElement('button');
                    savePlanButton.textContent = '💾 Replace plan';
                    savePlanButton.addEventListener('click', async () => {
                        await doAjax('./savePlan', { plan: message.content });
                    });
                    individualMessageDiv.appendChild(savePlanButton);
                    const appendPlanButton = document.createElement('button');
                    appendPlanButton.textContent = '📝 Append to plan';
                    appendPlanButton.addEventListener('click', async () => {
                        await doAjax('./savePlan', {
                            plan: message.content,
                            append: true
                        });
                    });
                    individualMessageDiv.appendChild(appendPlanButton);
                }

                // check if this message contains a <h2> element with the inner text of "ACTION LIST"
                const actionListHeader = contentDiv.querySelector('h2');
                if (actionListHeader && actionListHeader.innerHTML.startsWith("ACTION LIST")) {
                    const actionListItems = contentDiv.querySelectorAll('p');
                    actionListItems.forEach(async actionListItem => {
                        const newButtonElement = await changeTagName(actionListItem, 'button');

                        const actionText = newButtonElement.textContent;

                        const actionString = `Perform action ${actionText}`;
                        newButtonElement.title = actionString;
                        newButtonElement.addEventListener('click', async () => {
                            await this.setInput(actionString);
                            await this.submitButtonHandler();
                        });

                        // set the tooltip to the action text
                        

                        newButtonElement.style.width = '100%';
                        newButtonElement.style.margin = '5px';
                        newButtonElement.style.padding = '5px';
                        // make text in button justify left
                        newButtonElement.style.textAlign = 'left';
                        
                        // change the actionItem to a button
                        
                    });

                }
            }
            if (message.role === 'user') {
                const addPromptButton = document.createElement('button');
                addPromptButton.textContent = '+ Save reusable prompt';
                addPromptButton.style.cursor = 'pointer';
                addPromptButton.style.background = 'none';
                addPromptButton.style.border = '1px solid white';
                addPromptButton.style.color = 'white';
                addPromptButton.style.padding = '2px 5px';
                addPromptButton.style.borderRadius = '3px';
                addPromptButton.addEventListener('click', async () => {
                    const prompt = message.content;
                    const customPromptsJSON = await doAjax('./readFile', { targetFile: './.aiCoder/prompts/customPrompts.json' });
                    let customPrompts = JSON.parse(customPromptsJSON.fileContent);
                    if (!customPrompts)
                        customPrompts = [];
                    if (!customPrompts.includes(prompt)) {
                        customPrompts.push(prompt);
                        await doAjax('./writeFile', {
                            targetFile: './.aiCoder/prompts/customPrompts.json',
                            fileContent: JSON.stringify(customPrompts, null, 2)
                        });
                    }
                });
                individualMessageDiv.appendChild(addPromptButton);
            }
            this.chatMessageDiv.appendChild(individualMessageDiv);
            this.submitButton.scrollIntoView();
            if (response.messages.indexOf(message) === response.messages.length - 1) {
                individualMessageDiv.scrollIntoView();
                if (message.role === 'assistant' && this.autoApplyMode) {
                    if (markdown.codeBlocks.length > 0) {
                        for (const codeBlock of markdown.codeBlocks) {
                            const applyCodeBlock = await confirm('Apply code block?', ctx.autoApplyTimeout, true);
                            if (applyCodeBlock) {
                                await this.applySnippet(codeBlock);
                                await ctx.tabs.switchToTab('Tools');
                                await ctx.tools.displayListOfStubsAndMethods();
                            }
                        }
                    }
                }
            }
        });
        await this.addCodeToolbars();
    }
    //await ctx.tools.displayListOfStubsAndMethods();
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
                const confirmDelete = await confirm(`Delete prompt: \n "${prompt}"?`, 0, false);
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
        await doAjax('./addMessage', {
            id: conversationId,
            message
        });
        await this.loadConversation(conversationId);
    }
    // Fix method call
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
    // Fix method call
    async newPlanChat(title = false) {
        const response = await doAjax('./newPlanChat', { title });
        await this.loadConversationsList();
        this.chatMode = 'plan';
        this.conversationPicker.value = response.id;
        await this.loadConversation(response.id);
    }
    // Fix method call
    async callLLM() {
        const conversationId = this.conversationPicker.value;
        await doAjax('./callLLM', { id: conversationId });
        await this.loadConversation(conversationId);
    }
    // Fix method call
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
        console.log('codeElements', codeElements);
        if (codeElements.length === 0)
            return;
        codeElements.forEach(codeElement => {
            console.log('codeElement', codeElement);
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
                ctx.tools.displayListOfStubsAndMethods();
            });
            toolbar.appendChild(editButton);
            // Wrap the <code> element with the wrapper
            const parent = codeElement.parentNode;
            parent.insertBefore(wrapper, codeElement);
            wrapper.appendChild(codeElement);
            // Append the toolbar to the wrapper
            wrapper.appendChild(toolbar);
        });
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
            await this.setInput(`The last snippet was formatted incorrectly and needs to be corrected. 
                Remember that methods must be encapsulated in a class.`);
            if (this.autoApplyMode) {
                await this.addMessage(this.userInput.value);
                await this.callLLM();
            }
        }
        return isCodeGood;
    }
}



/**
 * Change the tag name of an existing DOM element.
 * @param {HTMLElement} element - The element to change.
 * @param {string} newTagName - The desired tag name.
 * @returns {HTMLElement} The newly created element with the updated tag name.
 */
function changeTagName(element, newTagName) {
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
}</file>

<file fileName="public/LLMSettingsManager.js">import { doAjax } from './doAjax.js';

let ctx = {};

export class LLMSettingsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.settingsDiv = null;
        this.llmSettings = null;
        this.init();
    }

    async init() {
        this.container.innerHTML = '';
        this.addRefreshButton();
        this.llmSettings = await this.fetchSettings();
        console.log(this.llmSettings);
        this.createSettingsDiv();
        // check if there is an active LLM
        const activeLLM = await this.getActiveLLM();
        // if no LLMS are active swap to this tab
        if (!activeLLM) {
            await ctx.tabs.disableAllTabs();
            await ctx.tabs.enableTab('LLM Settings');
            
            // add an element to the top of the container to notify the user
            const notification = document.createElement('div');
            notification.textContent = 'You must select an active LLM and model';
            notification.style.backgroundColor = 'red';
            notification.style.color = 'white';
            notification.style.padding = '10px';
            notification.style.margin = '10px';
            this.container.insertBefore(notification, this.settingsDiv);
            
        }else{
            ctx.tabs.enableAllTabs();
        }
    }

    async addRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '🔄';
        refreshButton.title = 'Refresh settings';
        refreshButton.style.padding = '10px';
        refreshButton.style.margin = '10px';
        refreshButton.style.backgroundColor = 'blue';
        refreshButton.addEventListener('click', () => this.refresh());
        this.container.appendChild(refreshButton);
    }

    async refresh() {
        this.init();
    }

    async fetchSettings() {
        return await doAjax('./llmSettings', {});
    }

    createSettingsDiv() {
        this.settingsDiv = document.createElement('div');
        this.settingsDiv.style.padding = '10px';
        this.settingsDiv.style.border = '1px solid #ccc';
        this.settingsDiv.style.flex = '1';
        this.settingsDiv.style.flexDirection = 'column';
        this.settingsDiv.style.overflow = 'auto';

        for (const llm in this.llmSettings) {
            this.createLLMConfig(llm, this.llmSettings[llm]);
        }

        this.container.appendChild(this.settingsDiv);
    }

    createLLMConfig(llm, settings) {
        const llmDiv = document.createElement('div');
        llmDiv.style.marginBottom = '10px';
        llmDiv.style.border = '1px solid #ccc';
        llmDiv.style.padding = '10px';

        const llmTitle = document.createElement('h2');
        llmTitle.textContent = llm;
        llmDiv.appendChild(llmTitle);

        llmDiv.appendChild(this.createLabel('Model:'));
        const modelSelect = this.createModelSelect(settings.models, settings.model);
        llmDiv.appendChild(modelSelect);

        llmDiv.appendChild(this.createLabel('API Key:'));
        const apiKeyInput = this.createApiKeyInput(settings.apiKey);
        llmDiv.appendChild(apiKeyInput);

        llmDiv.appendChild(this.createLabel('Active:'));
        const activeCheckbox = this.createActiveCheckbox(settings.active);
        activeCheckbox.addEventListener('click', () => this.handleActiveToggle(activeCheckbox));
        llmDiv.appendChild(activeCheckbox);

        this.settingsDiv.appendChild(llmDiv);
    }

    createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        return label;
    }

    createModelSelect(models, selectedModel) {
        const modelSelect = document.createElement('select');
        modelSelect.onchange = () => this.saveSettings();
        modelSelect.style.width = '100%';
        modelSelect.style.marginBottom = '10px';

        for (const model of models) {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        }

        modelSelect.value = selectedModel;
        return modelSelect;
    }

    createApiKeyInput(apiKey) {
        const input = document.createElement('input');
        input.onchange = () => this.saveSettings();
        input.type = 'password';
        input.style.width = '100%';
        input.style.marginBottom = '10px';
        input.value = apiKey;
        return input;
    }

    createActiveCheckbox(isActive) {
        const checkbox = document.createElement('input');
        checkbox.onchange = () => this.saveSettings();
        checkbox.type = 'checkbox';
        checkbox.checked = isActive;
        return checkbox;
    }

    handleActiveToggle(activeCheckbox) {
        if (activeCheckbox.checked) {
            for (const llmDiv of this.settingsDiv.children) {
                llmDiv.querySelector('input[type="checkbox"]').checked = false;
            }
            activeCheckbox.checked = true;
        }
    }

    async getActiveLLM() {
        for (const llmDiv of this.settingsDiv.children) {
            if (llmDiv.querySelector('input[type="checkbox"]').checked) {
                return llmDiv.querySelector('h2').textContent;
            }
        }
        return null;
    }

    async saveSettings() {
        const newSettings = {};
        const activeModels = [];

        for (const llmDiv of this.settingsDiv.children) {
            const llm = llmDiv.querySelector('h2').textContent;
            const model = llmDiv.querySelector('select').value;
            const apiKey = llmDiv.querySelector('input[type="password"]').value;
            const active = llmDiv.querySelector('input[type="checkbox"]').checked;

            if (active) activeModels.push(llm);

            newSettings[llm] = { model, apiKey, active };
        }

        if (activeModels.length > 1) {
            await alert('Only one model can be active at a time');
            return;
        }

        console.log(newSettings);
        await doAjax('./llmSettingsUpdate', newSettings);

        await this.init();
    }
}
</file>

<file fileName="public/MarkdownToHtml.js">// MarkdownToHtml.js
// A class-based Markdown to HTML converter with inline JavaScript syntax highlighting

export class MarkdownToHtml {
    constructor(targetElement, markdown) {
        if (!(targetElement instanceof HTMLElement)) {
            throw new Error("Target element must be a valid DOM element.");
        }
        this.targetElement = targetElement;
        this.codeBlocks = [];

        this.listStyles = {
            paddingLeft: "20px", // Add indentation for nested lists
        };

        this.codeBlockStyles = {
            backgroundColor: "black",
            color: "white",
            padding: "0px",
            // preformatted text styles no wrap
            whiteSpace: "pre",
            fontFamily: "monospace",
            borderRadius: "4px",
            overflowX: "auto",
            maxWidth: "100%",
            margin: "0px",
            padding: "0px",
            display: "inline-block",
        };

        if (markdown) {
            this.render(markdown);
        }



    }

    render(markdown) {
        this.targetElement.innerHTML = ""; // Clear previous content
        const lines = markdown.split("\n");

        const fragment = this.parseLines(lines);

        this.targetElement.appendChild(fragment);
    }

    parseLines(lines) {
        const fragment = document.createDocumentFragment();
        let insideCodeBlock = false;
        let codeContent = [];
        let codeLanguage = "";
        let currentList = null;

        for (const line of lines) {
            if (insideCodeBlock) {
                if (line.startsWith("```")) {
                    // End of code block
                    const pre = this.createCodeBlockElement(codeContent.join("\n"), codeLanguage);
                    fragment.appendChild(pre);
                    insideCodeBlock = false;
                    codeContent = [];
                    codeLanguage = "";
                } else {
                    codeContent.push(line);
                }
                continue;
            }

            if (line.startsWith("```")) {
                // Start of code block
                insideCodeBlock = true;
                codeLanguage = line.slice(3).trim(); // Capture language, if specified
                continue;
            }

            if (/^\s*[\*\-\+]\s/.test(line)) {
                // List item
                const listItem = this.createListItem(line);

                if (!currentList) {
                    // Start a new list if not already in one
                    currentList = document.createElement("ul");
                    this.applyStyles(currentList, this.listStyles);
                    fragment.appendChild(currentList);
                }
                currentList.appendChild(listItem);
            } else {
                if (currentList) {
                    // Close the current list if a non-list line is encountered
                    currentList = null;
                }

                if (/^#{1,6}\s/.test(line)) {
                    // Heading
                    const heading = this.createHeadingElement(line);
                    fragment.appendChild(heading);
                } else if (/^\>\s/.test(line)) {
                    // Blockquote
                    const blockquote = this.createBlockquoteElement(line);
                    fragment.appendChild(blockquote);
                } else if (line.trim() === "") {
                    // Skip empty lines
                    continue;
                } else {
                    // Paragraph with inline formatting
                    const paragraph = this.createParagraphElement(line);
                    fragment.appendChild(paragraph);
                }
            }
        }

        return fragment;
    }

    createCodeBlockElement(content, language) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");


        code.textContent = content; // No extra wrapping or element creation
        this.codeBlocks.push(content);
        this.applyStyles(pre, this.codeBlockStyles);

        // Add the language class for CSS-based styling
        if (language) {
            code.classList.add(`language-${language.toLowerCase()}`);
        } else {
            code.classList.add("language-plaintext");
        }
        code.style.paddingTop = "30px";

        pre.appendChild(code);
        return pre;
    }


    highlightJavaScript(code) {
        // Regex patterns for JavaScript syntax
        const patterns = [
            { regex: /(\/\/.*$)/gm, class: "comment" }, // Single-line comment
            { regex: /(["'`])(?:\\.|[^\1\\])*?\1/g, class: "string" }, // String literals
            { regex: /\b(const|let|var|if|else|for|while|function|return|class|new|this|super|import|export|default|extends)\b/g, class: "keyword" }, // Keywords
            { regex: /\b\d+(\.\d+)?\b/g, class: "number" }, // Numbers
            { regex: /\b(true|false|null|undefined)\b/g, class: "literal" }, // Literals
        ];

        let highlighted = this.escapeHtml(code);

        patterns.forEach(({ regex, class: className }) => {
            highlighted = highlighted.replace(regex, (match) => `<span class="${className}">${match}</span>`);
        });

        return highlighted;
    }

    escapeHtml(text) {
        const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return text.replace(/[&<>"']/g, (char) => map[char]);
    }

    createHeadingElement(line) {
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        const level = match[1].length;
        const text = match[2];
        const heading = document.createElement(`h${level}`);
        heading.textContent = text;
        return heading;
    }

    createBlockquoteElement(line) {
        const text = line.replace(/^\>\s/, "").trim();
        const blockquote = document.createElement("blockquote");
        blockquote.textContent = text;
        return blockquote;
    }

    createListItem(line) {
        const text = line.replace(/^\s*[\*\-\+]\s/, "").trim();
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    }

    createParagraphElement(line) {
        const paragraph = document.createElement("p");
        const formattedContent = this.parseInlineFormatting(line);
        paragraph.append(...formattedContent);
        return paragraph;
    }

    parseInlineFormatting(line) {
        const elements = [];
        const regex = /(\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[(.*?)\]\((.*?)\))/g;
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                elements.push(document.createTextNode(line.slice(lastIndex, match.index)));
            }

            if (match[2]) {
                const strong = document.createElement("strong");
                strong.textContent = match[2];
                elements.push(strong);
            } else if (match[3]) {
                const em = document.createElement("em");
                em.textContent = match[3];
                elements.push(em);
            } else if (match[4]) {
                const code = document.createElement("code");
                code.textContent = match[4];
                elements.push(code);
            } else if (match[5] && match[6]) {
                const a = document.createElement("a");
                a.textContent = match[5];
                a.href = match[6];
                elements.push(a);
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
            elements.push(document.createTextNode(line.slice(lastIndex)));
        }

        return elements;
    }

    applyStyles(element, styles) {
        Object.assign(element.style, styles);
    }
}
</file>

<file fileName="public/ProjectSettingsManager.js">
import { doAjax } from './doAjax.js';
let ctx = {};
export class ProjectSettingsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.promptsDiv = null;
        this.systemPrompts = null;
        this.init();
    }
    async init() {
        this.container.innerHTML = '';
        this.addRefreshButton();
        this.resetButton();
        this.systemPrompts = await this.fetchPrompts();
        this.createPromptsDiv();

    }
    async addRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '🔄';
        refreshButton.title = 'Refresh settings';
        refreshButton.style.padding = '10px';
        refreshButton.style.margin = '10px';
        refreshButton.style.backgroundColor = 'blue';
        refreshButton.addEventListener('click', () => this.refresh());
        this.container.appendChild(refreshButton);
    }
    async resetButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'RESET TO DEFAULTS';
        resetButton.title = 'Reset settings';
        resetButton.style.padding = '10px';
        resetButton.style.margin = '10px';
        resetButton.style.backgroundColor = 'red';
        resetButton.addEventListener('click', () => this.reset());
        this.container.appendChild(resetButton);
    }
    async reset() {
        if (!await confirm('Are you sure you want to reset the system prompts to their default values?',0)) return
        await doAjax('./resetSystemPrompts', {});
        await this.init();
    }
    async refresh() {
        this.init();
    }
    async fetchPrompts() {
        return await doAjax('./getSystemPrompts', {});
    }
    createPromptsDiv() {
        this.promptsDiv = document.createElement('div');
        this.promptsDiv.style.padding = '10px';
        this.promptsDiv.style.border = '1px solid #ccc';
        this.promptsDiv.style.flex = '1';
        this.promptsDiv.style.flexDirection = 'column';
        this.promptsDiv.style.overflow = 'auto';
        // Create an editable div for each field in the systemPrompts object
        for (const field in this.systemPrompts) {
            this.createFieldConfig(field, this.systemPrompts[field]);
        }
        this.container.appendChild(this.promptsDiv);
    }
    createFieldConfig(field, value) {
        const fieldDiv = document.createElement('div');
        fieldDiv.style.marginBottom = '10px';
        fieldDiv.style.border = '1px solid #ccc';
        fieldDiv.style.padding = '10px';
        // Create a label for the field
        const fieldLabel = this.createLabel(field);
        fieldDiv.appendChild(fieldLabel);
        // Create an editable div for the field value
        const editableDiv = this.createEditableDiv(value);
        editableDiv.setAttribute('data-field', field);
        // Tagging the div with its field name
        fieldDiv.appendChild(editableDiv);
        this.promptsDiv.appendChild(fieldDiv);
    }
    createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        label.style.display = 'block';
        label.style.marginBottom = '5px';
        return label;
    }
    createEditableDiv(content) {
        const editableDiv = document.createElement('div');
        editableDiv.style.width = '100%';
        editableDiv.style.marginBottom = '10px';
        editableDiv.style.border = '1px solid #ddd';
        editableDiv.style.padding = '8px';
        editableDiv.style.overflowY = 'auto';
        editableDiv.style.whiteSpace = 'pre-wrap';
        editableDiv.contentEditable = true;
        editableDiv.textContent = content;
        editableDiv.onchange = () => this.savePrompts();
        return editableDiv;
    }
    addSaveButton() {
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾';
        saveButton.title = 'Save changes';
        saveButton.style.padding = '10px';
        saveButton.style.margin = '10px';
        saveButton.style.backgroundColor = 'green';
        //saveButton.style.backgroundColor = 'blue';
        saveButton.addEventListener('click', () => this.savePrompts());
        this.container.appendChild(saveButton);
    }
    async savePrompts() {
        const updatedPrompts = {};
        // Gather updated values from editable divs
        for (const fieldDiv of this.promptsDiv.children) {
            const editableDiv = fieldDiv.querySelector('div[contenteditable]');
            if (editableDiv) {
                const field = editableDiv.getAttribute('data-field');
                let value = editableDiv.innerHTML;
                // Retrieve the edited content
                // Normalize the content to plain text
                value = value.replace(/<br\s*\/?>/g, '\n').replace(/<div>/g, '\n').replace(/<\/div>/g, '').replace(/<p>/g, '\n').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ').trim();
                // Trim leading/trailing whitespace
                updatedPrompts[field] = value;
            }
        }
        console.log(updatedPrompts);
        // Log the updated data for debugging
        await doAjax('./updateSystemPrompts', updatedPrompts);
        // Send updated prompts back to the server
        await this.init();
    }
}</file>

<file fileName="public/confirmDialog.js">
const dialogStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.8)', // Partly transparent black
    color: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    zIndex: '1000',
    fontSize: '18px', // Medium font size
    textAlign: 'left',
    zIndex: '10000'
};

const confirmButtonStyle = {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#4CAF50', // Green
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const cancelButtonStyle = {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#f44336', // Red
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};



window.confirm = async (message, timeoutInSeconds = 10, defaultValue = false) => {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        const messageDiv = document.createElement('div');
        const countdownDiv = document.createElement('div');
        const buttonContainer = document.createElement('div');
        const confirmButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        // apply styles from dialogStyle using Object.assign
        Object.assign(dialog.style, dialogStyle);


        messageDiv.textContent = message;
        // set style to preformatted text
        messageDiv.style.whiteSpace = 'pre-wrap';

        // Countdown indicator
        if (timeoutInSeconds && timeoutInSeconds > 0) {
            countdownDiv.textContent = `Time remaining: ${timeoutInSeconds} seconds`;
            countdownDiv.style.marginBottom = '10px';
            dialog.appendChild(countdownDiv);
        }

        confirmButton.textContent = 'Yes';
        cancelButton.textContent = 'No';


        // Highlight default button
        if (defaultValue) {
            Object.assign(confirmButton.style, confirmButtonStyle);
            Object.assign(cancelButton.style, cancelButtonStyle);
        } else {
            Object.assign(confirmButton.style, cancelButtonStyle);
            Object.assign(cancelButton.style, confirmButtonStyle);
        }

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);

        dialog.appendChild(messageDiv);
        dialog.appendChild(buttonContainer);
        document.body.appendChild(dialog);

        let timeout = null;
        let countdownInterval = null;

        if (timeoutInSeconds && timeoutInSeconds > 0) {
            timeout = setTimeout(() => {
                cleanup();
                resolve(defaultValue);
            }, timeoutInSeconds * 1000);

            // Update countdown every second
            let remainingTime = timeoutInSeconds;
            countdownInterval = setInterval(() => {
                remainingTime -= 1;
                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                }
                countdownDiv.textContent = `Time remaining: ${remainingTime} seconds`;
            }, 1000);
        }

        const cleanup = () => {
            if (timeout) clearTimeout(timeout); // Clear the timeout if it exists
            if (countdownInterval) clearInterval(countdownInterval); // Clear the countdown interval
            confirmButton.removeEventListener('click', onConfirm);
            cancelButton.removeEventListener('click', onCancel);
            dialog.remove(); // Remove the dialog from the DOM
        };

        const onConfirm = () => {
            cleanup(); // Ensure dialog is removed first
            resolve(true); // Then resolve the promise
        };

        const onCancel = () => {
            cleanup(); // Ensure dialog is removed first
            resolve(false); // Then resolve the promise
        };

        confirmButton.addEventListener('click', onConfirm);
        cancelButton.addEventListener('click', onCancel);
    });
};




window.alert = async (message, timeoutInSeconds = 10) => {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        const messageDiv = document.createElement('div');
        const countdownDiv = document.createElement('div');
        const buttonContainer = document.createElement('div');
        const okButton = document.createElement('button');

        // Set up styles
        Object.assign(dialog.style, dialogStyle);

        messageDiv.textContent = message;
        // set style to preformatted text
        messageDiv.style.whiteSpace = 'pre-wrap';

        // Countdown indicator
        if (timeoutInSeconds && timeoutInSeconds > 0) {
            countdownDiv.textContent = `Time remaining: ${timeoutInSeconds} seconds`;
            countdownDiv.style.marginBottom = '10px';
            dialog.appendChild(countdownDiv);
        }

        okButton.textContent = 'OK';
        Object.assign(okButton.style, confirmButtonStyle);

        buttonContainer.appendChild(okButton);

        dialog.appendChild(messageDiv);
        dialog.appendChild(buttonContainer);
        document.body.appendChild(dialog);

        let timeout = null;
        let countdownInterval = null;

        if (timeoutInSeconds && timeoutInSeconds > 0) {
            timeout = setTimeout(() => {
                cleanup();
                resolve();
            }, timeoutInSeconds * 1000);

            // Update countdown every second
            let remainingTime = timeoutInSeconds;
            countdownInterval = setInterval(() => {
                remainingTime -= 1;
                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                }
                countdownDiv.textContent = `Time remaining: ${remainingTime} seconds`;
            }, 1000);
        }

        const cleanup = () => {
            if (timeout) clearTimeout(timeout); // Clear the timeout if it exists
            if (countdownInterval) clearInterval(countdownInterval); // Clear the countdown interval
            okButton.removeEventListener('click', onOk);
            dialog.remove(); // Remove the dialog from the DOM
        };

        const onOk = () => {
            cleanup(); // Ensure dialog is removed first
            resolve(); // Then resolve the promise
        };

        okButton.addEventListener('click', onOk);
    });
};




window.prompt = async (message, defaultValue = '') => {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        const messageDiv = document.createElement('div');
        const inputField = document.createElement('textarea');
        const buttonContainer = document.createElement('div');
        const okButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        // Set up styles
        Object.assign(dialog.style, dialogStyle);

        messageDiv.textContent = message;
        messageDiv.style.marginBottom = '10px';
        messageDiv.style.whiteSpace = 'pre-wrap';

        inputField.type = 'text';
        inputField.value = defaultValue;
        inputField.style.width = '100%';
        inputField.style.padding = '10px';
        inputField.style.border = '1px solid #ccc';
        inputField.style.borderRadius = '5px';
        inputField.style.marginBottom = '10px';
        inputField.style.fontSize = '16px';

        okButton.textContent = 'OK';
        Object.assign(okButton.style, confirmButtonStyle);
        cancelButton.textContent = 'Cancel';
        Object.assign(cancelButton.style, cancelButtonStyle);

        buttonContainer.appendChild(okButton);
        buttonContainer.appendChild(cancelButton);

        dialog.appendChild(messageDiv);
        dialog.appendChild(inputField);
        dialog.appendChild(buttonContainer);
        document.body.appendChild(dialog);

        inputField.focus();

        const cleanup = () => {
            okButton.removeEventListener('click', onOk);
            cancelButton.removeEventListener('click', onCancel);
            inputField.removeEventListener('keydown', onEnter);
            dialog.remove();
        };

        const onOk = () => {
            cleanup();
            resolve(inputField.value); // Resolve with the value entered
        };

        const onCancel = () => {
            cleanup();
            resolve(null); // Resolve with null for cancel
        };

        const onEnter = (event) => {
            if (event.key === 'Enter') {
                onOk();
            }
        };

        okButton.addEventListener('click', onOk);
        cancelButton.addEventListener('click', onCancel);
        inputField.addEventListener('keydown', onEnter);
    });
};


</file>

<file fileName="public/doAjax.js">
// create an absolute positioned overlay div that shows when doAjax is called
// and hides when the response is received
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0px';
overlay.style.bottom = '0px';
overlay.style.left = '0px';
overlay.style.right = '0px';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.color = 'white';
overlay.style.fontSize = '24px';
overlay.style.display = 'flex';
overlay.style.flexDirection = 'column';
// make the div fade in and out
overlay.style.transition = 'opacity 0.3s';
overlay.style.zIndex = '1000';
overlay.textContent = 'Loading...';
document.body.appendChild(overlay);
// container for messages from the server
const messageDivContainer = document.createElement('div');
messageDivContainer.style.width = '100%';
messageDivContainer.style.height = '100%';
messageDivContainer.style.border = '5px solid black';
messageDivContainer.style.position = 'relative';
messageDivContainer.style.overflow = 'auto';
overlay.appendChild(messageDivContainer);
// add a div to the overlay that displays the messages from the server. 
const messageDiv = document.createElement('div');
messageDiv.style.overflow = 'auto';
// format as preformatted text with no word wrapping at all
messageDiv.style.whiteSpace = 'pre';
// font size
messageDiv.style.fontSize = '12px';
messageDivContainer.appendChild(messageDiv);
// footer element that goes at the bottom of the 
const footer = document.createElement('br');
messageDivContainer.appendChild(footer);
export async function doAjax(urlToCall, body) {
    messageDiv.textContent = '';
    overlay.style.display = 'flex';
    let responseJson;
    try {
        const response = await fetch(urlToCall, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        responseJson = await response.json();
    } // make overlay fade out
    catch (error) {
        console.error(error);
        responseJson = { error: error.message };
    }
    overlay.style.display = 'none';
    return responseJson;
}
const getWebSocketURL = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const pathname = window.location.pathname.replace(/\/[^/]*$/, '');
    // Remove the file name if present
    return `${ protocol }//${ host }${ pathname }/ws`;
};
export class WebSocketClient {
    constructor() {
        this.url = getWebSocketURL();
        this.socket = null;
        this.statusIndicator = this.createStatusIndicator();
    }
    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener('open', () => {
            console.log('WebSocket connection opened.');
            this.statusIndicator.style.display = 'none';
        });
        // Hide when connected
        this.socket.addEventListener('message', event => {
            console.log('Message received:', event.data);
            messageDiv.textContent += event.data;
            footer.scrollIntoView();
        });
        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed. Reconnecting...');
            this.statusIndicator.style.display = 'block';
            // Show when disconnected
            this.reconnect();
        });
        this.socket.addEventListener('error', error => {
            console.error('WebSocket error:', error);
        });
    }
    reconnect() {
        setTimeout(() => this.connect(), 1000);
    }
    createStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.right = '10px';
        indicator.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        indicator.style.color = 'white';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '5px';
        indicator.style.display = 'none';
        indicator.textContent = 'Offline';
        document.body.appendChild(indicator);
        return indicator;
    }
}
// Usage example
const client = new WebSocketClient();
client.connect();</file>

<file fileName="public/domElementFactory.js">export function makeElement(tag, attributes = {}) {
    // Create the DOM element
    const element = document.createElement(tag);

    // Apply the attributes to the element
    deepMerge(element, attributes);

    return element;
}



export function deepMerge(target, source, seen = new WeakMap()) {
    if (seen.has(source)) {
        return target; // Avoid circular references
    }
    seen.set(source, true);

    for (const key in source) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue; // Ignore potentially dangerous keys
        }

        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            deepMerge(target[key], source[key], seen);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
</file>

<file fileName="public/fileDialog.js">// File: fileDialog.js
import { makeElement } from './domElementFactory.js';
import { doAjax } from './doAjax.js';

export function generateTreeView(targetElement, list, splitChar, onSingleClick, onDoubleClick) {
    let clickTimeout;
    const CLICK_DELAY = 300; // 300ms to differentiate single from double click

    function buildTree(list) {
        const tree = {};
        list.forEach((item) => {
            const parts = item.split(splitChar);
            let current = tree;
            parts.forEach((part, index) => {
                if (!current[part]) {
                    current[part] = index === parts.length - 1 ? null : {};
                }
                current = current[part];
            });
        });
        return tree;
    }

    function renderTree(tree, container, path = '', isRoot = false) {
        Object.keys(tree).sort().forEach((key) => {
            const item = makeElement('li', { style: { marginLeft: '10px' } });
            const fullPath = `${path}${splitChar}${key}`.substring(1);
            const isFolder = tree[key] !== null;

            const label = makeElement('span', {
                innerText: isFolder ? `📁 ${key}/` : `📄 ${key}`,
                style: { cursor: 'pointer', color: isFolder ? '#ffffff' : '#66ccff' },
            });

            label.addEventListener('click', () => {
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => onSingleClick(fullPath, label), CLICK_DELAY);
            });

            label.addEventListener('dblclick', () => {
                if (clickTimeout) clearTimeout(clickTimeout);
                onDoubleClick(fullPath);
            });

            item.appendChild(label);
            container.appendChild(item);

            if (isFolder) {
                const subList = makeElement('ul', {
                    style: { listStyleType: 'none', paddingLeft: '20px', display: 'none' },
                });
                renderTree(tree[key], subList, `${path}${splitChar}${key}`);
                item.appendChild(subList);

                label.addEventListener('click', () => {
                    subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
                });
            }
        });
    }

    const tree = buildTree(list);
    targetElement.innerHTML = '';
    renderTree(tree, targetElement, '', true);
}

export async function fileDialog(fileListArray) {
    return new Promise((resolve) => {
        let selectedFilePath = '';

        const modal = makeElement('div', {
            style: {
                position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: '10000', color: '#f0f0f0',
            },
        });

        const dialog = makeElement('div', {
            style: {
                backgroundColor: '#333', padding: '20px', borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', width: '400px',
            },
        });

        const title = makeElement('h2', { innerText: 'Select a File', style: { color: '#ffffff' } });
        const fileTreeContainer = makeElement('ul', { style: { listStyleType: 'none', padding: '0' } });
        const inputField = makeElement('input', {
            type: 'text',
            style: {
                width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box',
                backgroundColor: '#222', color: '#f0f0f0', border: '1px solid #555',
            },
            readOnly: true,
            placeholder: 'Selected file will appear here...',
        });

        const submitButton = makeElement('button', {
            innerText: 'Submit',
            style: {
                padding: '10px 20px', marginTop: '10px', cursor: 'pointer',
                backgroundColor: '#66ccff', border: 'none', borderRadius: '4px', color: '#333',
            },
            onclick: async () => {
                if (selectedFilePath) {
                    selectedFilePath = './' + selectedFilePath;
                    resolve(selectedFilePath);
                }
                else alert('Please select a file.');
                document.body.removeChild(modal);
            },
        });

        const cancelButton = makeElement('button', {
            innerText: 'Cancel',
            style: {
                padding: '10px 20px', marginTop: '10px', cursor: 'pointer', marginLeft: '10px',
                backgroundColor: '#444', color: '#f0f0f0', border: 'none', borderRadius: '4px',
            },
            onclick: () => {
                resolve(null);
                document.body.removeChild(modal);
            },
        });

        const buttonContainer = makeElement('div', { style: { marginTop: '10px', display: 'flex' } });
        buttonContainer.appendChild(submitButton);
        buttonContainer.appendChild(cancelButton);

        dialog.appendChild(title);
        dialog.appendChild(fileTreeContainer);
        dialog.appendChild(inputField);
        dialog.appendChild(buttonContainer);
        modal.appendChild(dialog);
        document.body.appendChild(modal);

        generateTreeView(
            fileTreeContainer,
            fileListArray,
            "/",
            (filePath, label) => {
                selectedFilePath = filePath;
                inputField.value = filePath;
                fileTreeContainer.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));
                label.classList.add('selected');
            },
            (filePath) => {
                selectedFilePath = filePath;
                resolve(filePath);
                document.body.removeChild(modal);
            }
        );
    });
}

export async function choseFile() {
    const response = await doAjax('./getFilesList', {});
    // Remove the first character from each file path
    // because the first character is always '/'
    // and we don't want to show it in the file dialog

    const fileList = (response.files || []).map((file) => file.substring(2));
    console.log(fileList);
    return await fileDialog(fileList);
}

</file>

<file fileName="public/index.html"><!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light dark">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Coder</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
    <link rel="icon" href="./logo.png" type="image/x-icon">
</head>

<body>

    <script type="module">
        import './main.js';
    </script>


</body>

</html></file>

<file fileName="public/main.js">import { tabInterface } from './tabInterface.js';
import { LLMSettingsManager } from './LLMSettingsManager.js';
import { ProjectSettingsManager } from './ProjectSettingsManager.js';
import { ChatManager } from './ChatManager.js';
import { toolsManager } from './toolsManager.js';
import './confirmDialog.js';

let ctx = {};


async function setup() {
    // Extract the hash from the URL
    const hashText = window.location.hash;
    let extractedText = await hashText.startsWith('#') ? hashText.substring(1) : hashText;
    // turn the extracted text back in to plain text
    extractedText = await decodeURIComponent(extractedText);
    //alert(extractedText);

    ctx.autoApplyTimeout = 10;
    const tabs = new tabInterface();
    ctx.tabs = tabs;
    const chatTab = tabs.createTab("Chat", "💬");
    ctx.chat = new ChatManager(chatTab, ctx);

    const toolsTab = tabs.createTab("Tools", "🛠️");
    ctx.tools = new toolsManager(toolsTab, ctx);

    const projectSettings = tabs.createTab("Project Settings", "⚙️");
    ctx.projectSettings = new ProjectSettingsManager(projectSettings, ctx);

    const llmSettingsTab = tabs.createTab("LLM Settings", "🧠");
    ctx.llmSettings = new LLMSettingsManager(llmSettingsTab, ctx);


    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";

    document.body.appendChild(tabs.getElement());
    window.ctx = ctx;



    // Remove the leading '#' if it exists

    tabs.switchToTab(extractedText);

}


async function setDefaultLocalStorageKey(key, value) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, value);
    }
}

// call the setup function only after the DOM has loaded
document.addEventListener('DOMContentLoaded', setup);




</file>

<file fileName="public/style.css">* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: monospace;
}

body {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}


code {
    display: inline-block;
    background-color: #282828d8;
    color: yellow;
    overflow: hidden;
    max-width: 100%;
}

button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid white;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;

}


.hover-effect:hover {
    background-color: bisque;
    filter: invert(1);
}
</file>

<file fileName="public/tabInterface.js">
export class tabInterface {
    constructor() {
        // Define color variables
        this.colors = {
            // dark mode colors by default 
            tabBarBackground: '#333',
            tabButtonBackground: '#333',
            activeTabBackground: '#007bff',
            activeTabBorder: 'pink',
            inactiveTabBorder: 'none'
        };
        this.tabs = [];
        this.activeTab = 0;
        // Create the main container for the tab interface
        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        // Create the tab bar
        this.tabBar = document.createElement('div');
        this.tabBar.style.height = '40px';
        this.tabBar.style.display = 'flex';
        this.tabBar.style.flexGrow = '0';
        this.tabBar.style.flexDirection = 'row';
        this.tabBar.style.backgroundColor = this.colors.tabBarBackground;
        this.tabBar.style.borderBottom = `2px solid ${ this.colors.inactiveTabBorder }`;
        this.container.appendChild(this.tabBar);
        // Create the content area
        this.contentArea = document.createElement('div');
        this.contentArea.style.flexGrow = '1';
        this.contentArea.style.overflowY = 'scroll';
        this.container.appendChild(this.contentArea);
    }
    createTab(name, icon) {
        const tabIndex = this.tabs.length;
        // Create the tab button
        const tabButton = document.createElement('button');
        tabButton.textContent = icon + ' ' + name;
        // add tooltip
        tabButton.title = name;
        tabButton.style.border = 'none';
        tabButton.style.backgroundColor = this.colors.tabButtonBackground;
        tabButton.style.color = 'white';
        // make text not wrap
        tabButton.style.whiteSpace = 'nowrap';
        // Set text color to white
        tabButton.style.cursor = 'pointer';
        tabButton.style.outline = '1px solid black';
        tabButton.style.padding = '10px';
        tabButton.style.height = '40px';
        tabButton.style.transition = 'background-color 0.3s';
        // Force square corners
        tabButton.style.borderRadius = '0';
        // Highlight the active tab
        const updateTabStyles = () => {
            this.tabBar.childNodes.forEach((btn, idx) => {
                if (idx === this.activeTab) {
                    btn.style.backgroundColor = this.colors.activeTabBackground;
                    btn.style.borderBottom = `2px solid ${ this.colors.activeTabBorder }`;
                } else {
                    btn.style.backgroundColor = this.colors.tabButtonBackground;
                    btn.style.borderBottom = this.colors.inactiveTabBorder;
                }
            });
        };
        // Set click event for the tab button
        tabButton.addEventListener('click', () => {
            this.activeTab = tabIndex;
            this.showActiveTab();
            updateTabStyles();
        });
        // Add the tab to the tab bar
        this.tabBar.appendChild(tabButton);
        // Create the tab content element
        const tabContent = document.createElement('div');
        tabContent.style.padding = '10px';
        tabContent.style.height = '100%';
        // Store the tab data
        this.tabs.push({
            name,
            element: tabContent
        });
        // Show the first tab by default
        if (this.tabs.length === 1) {
            this.showActiveTab();
            updateTabStyles();
        }
        return tabContent;
    }
    // Return the newly created content element
    switchToTab(tabName) {
         // set the URL hash to the tab name

        // case insensitive search
        const idx = this.tabs.findIndex(tab => tab.name.toLowerCase() === tabName.toLowerCase());
        if (idx !== -1) {
            this.activeTab = idx;
            this.showActiveTab();
            this.tabBar.childNodes.forEach((btn, idx) => {
                if (idx === this.activeTab) {
                    btn.style.backgroundColor = this.colors.activeTabBackground;
                    btn.style.borderBottom = `2px solid ${ this.colors.activeTabBorder }`;
                } else {
                    btn.style.backgroundColor = this.colors.tabButtonBackground;
                    btn.style.borderBottom = this.colors.inactiveTabBorder;
                }
            });

           
        }
    }
    showActiveTab() {
        window.location.hash = this.tabs[this.activeTab].name;
       // alert(tabName);
        // Clear the content area
        this.contentArea.innerHTML = '';
        // Add the active tab's content
        const activeTab = this.tabs[this.activeTab];
        if (activeTab) {
            this.contentArea.appendChild(activeTab.element);
        }
    }
    getElement() {
        return this.container;
    }
    // Method to update colors dynamically
    updateColors(newColors) {
        this.colors = {
            ...this.colors,
            ...newColors
        };
        // Apply updated colors to the tab bar
        this.tabBar.style.backgroundColor = this.colors.tabBarBackground;
        this.tabBar.childNodes.forEach((btn, idx) => {
            if (idx === this.activeTab) {
                btn.style.backgroundColor = this.colors.activeTabBackground;
                btn.style.borderBottom = `2px solid ${ this.colors.activeTabBorder }`;
            } else {
                btn.style.backgroundColor = this.colors.tabButtonBackground;
                btn.style.borderBottom = this.colors.inactiveTabBorder;
            }
        });
    }
    async disableTab(tabName) {
        // make the tab not clickable and greyed out
        const idx = this.tabs.findIndex(tab => tab.name.toLowerCase() === tabName.toLowerCase());
        if (idx !== -1) {
            this.tabBar.childNodes[idx].style.pointerEvents = 'none';
            this.tabBar.childNodes[idx].style.textDecoration = 'line-through';
        }
    }
    async enableTab(tabName) {
        const idx = await this.tabs.findIndex(tab => tab.name.toLowerCase() === tabName.toLowerCase());
        if (idx !== -1) {
            this.tabBar.childNodes[idx].style.pointerEvents = 'auto';
            this.tabBar.childNodes[idx].style.backgroundColor = this.colors.tabButtonBackground;
            this.tabBar.childNodes[idx].style.textDecoration = 'none';
        }
        // set this tab as active
        this.activeTab = idx;
        return await this.showActiveTab();
    }
    async disableAllTabs() {
        for (let i = 0; i < this.tabBar.childNodes.length; i++) {
            this.tabBar.childNodes[i].style.pointerEvents = 'none';
            this.tabBar.childNodes[i].style.textDecoration = 'line-through';
        }
        return true;
    }
    async enableAllTabs() {
        for (let i = 0; i < this.tabBar.childNodes.length; i++) {
            this.tabBar.childNodes[i].style.pointerEvents = 'auto';
            this.tabBar.childNodes[i].style.backgroundColor = this.colors.tabButtonBackground;
            this.tabBar.childNodes[i].style.textDecoration = 'none';
        }
        return true;
    }
}</file>

<file fileName="public/toolsManager.js">
import { doAjax } from './doAjax.js';
let ctx;
const buttonStyle = {
    display: 'block',
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer'
};
export class toolsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.container.style.padding = '5px';
        this.container.style.border = '1px solid #ccc';
        this.container.style.flex = '1';
        this.container.style.flexDirection = 'column';
        this.container.style.overflow = 'auto';
        this.snippetTextArea = null;
        this.onlyStubs = (localStorage.getItem('showOnlyStubs') === 'true');
        // checkbox to show only stubs

        this.showToolBar();
    }


    async showToolBar() {
        this.container.innerHTML = '';
        this.toolBar = document.createElement('div');
        this.toolBar.style.display = 'flex';
        this.toolBar.style.flexDirection = 'row';
        // toolBar.style.justifyContent = 'space-between';
        this.toolBar.style.margin = '0px';

        const showOnlyStubsCheckbox = document.createElement('input');
        showOnlyStubsCheckbox.type = 'checkbox';
        showOnlyStubsCheckbox.checked = localStorage.getItem('showOnlyStubs') === 'true';
        showOnlyStubsCheckbox.onchange = async () => {
            await localStorage.setItem('showOnlyStubs', showOnlyStubsCheckbox.checked);
            console.log('showOnlyStubs', showOnlyStubsCheckbox.checked);
            this.onlyStubs = showOnlyStubsCheckbox.checked;
            await this.displayListOfStubsAndMethods();
        }
        this.container.appendChild(showOnlyStubsCheckbox);
        const showOnlyStubsLabel = document.createElement('label');
        showOnlyStubsLabel.textContent = 'Show Only Stubs';
        this.container.appendChild(showOnlyStubsLabel);
        this.container.appendChild(document.createElement('br'));


        const pullMethodsListButton = await this.makeToolBarButton('Methods List', async () => {
            this.displayListOfStubsAndMethods();
        });
        this.toolBar.appendChild(pullMethodsListButton);
        const implementAllStubsButton = await this.makeToolBarButton('Implement All Stubs', async () => {
            await this.implementAllStubs();
        });
        this.toolBar.appendChild(implementAllStubsButton);
        // button to call the mergeAndFormat api endpoint
        const mergeAndFormatButton = await this.makeToolBarButton('Merge and Format', async () => {
            await this.mergeAndFormat();
        });
        this.toolBar.appendChild(mergeAndFormatButton);
        // button to call the prependClassStructure api endpoint
        const prependClassStructureButton = await this.makeToolBarButton('Prepend Class Structure', async () => {
            await this.prependClassStructure();
        });
        this.toolBar.appendChild(prependClassStructureButton);
        this.container.appendChild(this.toolBar);
        return await console.log('showToolBar');
    }

    async displayListOfStubsAndMethods() {
        await this.showToolBar();
        if (!await this.verifyTargetFileSpecified()) return;
        await this.pullMethodsList();
        await this.pullFunctionList();
    }
    async implementAllStubs() {
        if (!await this.verifyTargetFileSpecified())
            return;
        this.showToolBar();
        await doAjax('./implementAllStubs', { targetFile: ctx.targetFile });
    }
    async mergeAndFormat() {
        if (!await this.verifyTargetFileSpecified())
            return;
        this.showToolBar();
        let snippet = '';
        if (this.snippetTextArea === null) {
            this.snippetTextArea = document.createElement('textarea');
            this.snippetTextArea.style.width = '100%';
            this.snippetTextArea.style.height = '100px';
            this.snippetTextArea.style.margin = '5px';
            this.snippetTextArea.style.border = '1px solid #ccc';
            this.snippetTextArea.style.borderRadius = '5px';
            this.snippetTextArea.style.padding = '5px';
            this.snippetTextArea.placeholder = 'Paste the snippet here to merge and format';
            this.container.appendChild(this.snippetTextArea);
        } else {
            snippet = this.snippetTextArea.value;
            this.snippetTextArea = null;
        }
        await doAjax('./applySnippet', {
            targetFile: ctx.targetFile,
            snippet: snippet
        });
    }
    async makeToolBarButton(title, handler) {
        const button = document.createElement('button');
        button.textContent = title;
        Object.assign(button.style, buttonStyle);
        button.addEventListener('click', handler);
        this.toolBar.appendChild(button);
        return button;
    }
    async prependClassStructure() {
        if (!await this.verifyTargetFileSpecified())
            return;
        await doAjax('./prependClassStructure', { targetFile: ctx.targetFile });
    }
    async pullMethodsList() {
        const listOfMethods = await doAjax('./getMethodsList', { targetFile: ctx.targetFile });
        console.log(listOfMethods);
        // the response contains
        for (const className in listOfMethods) {
            // console.log(className);
            const methods = listOfMethods[className];
            for (const { name, args, isStub, lineNumber } of methods) {
                if (this.onlyStubs && !isStub) continue;
                const argList = args.join(', ');
                //console.log(`${className}.${name}(${argList})`);
                const methodItemElement = document.createElement('dim');
                // add class .hover-effect to
                methodItemElement.classList.add('hover-effect');
                methodItemElement.textContent = `${className}.${name}(${argList})`;
                if (isStub) {
                    methodItemElement.style.color = 'red';
                    methodItemElement.addEventListener('click', async () => {
                        await this.implementSpecificClassMethod(className, name, args, lineNumber);
                        await this.pullMethodsList(this.onlyStubs);
                    });
                } else {
                    methodItemElement.style.color = 'green';
                    methodItemElement.addEventListener('click', async () => {
                        await this.addToChatPrompt(className, name, args, lineNumber);
                        //console.log('this is the line number ', lineNumber);
                        await this.pullMethodsList(this.onlyStubs);
                    });
                }
                this.container.appendChild(methodItemElement);
                this.container.appendChild(document.createElement('br'));
            }
        }
    }
    async pullFunctionList() {
        const listOfFunctions = await doAjax('./getFunctionList', { targetFile: ctx.targetFile });

        for (const key in listOfFunctions) {
            // console.log(key);
            // Logs the key (function name) from the response
            const { functionName, args, isStub, lineNumber } = listOfFunctions[key];
            if (this.onlyStubs && !isStub) continue;
            const argList = args.join(', ');
            //console.log(`${functionName}(${argList})`);
            const functionItemElement = document.createElement('dim');
            // add class .hover-effect to
            functionItemElement.classList.add('hover-effect');
            functionItemElement.textContent = `${functionName}(${argList})`;
            if (isStub) {
                functionItemElement.style.color = 'red';
                functionItemElement.addEventListener('click', async () => {
                    await this.implementSpecificFunction(functionName, args, lineNumber);
                    await this.pullFunctionList(this.onlyStubs);
                });
            } else {
                functionItemElement.style.color = 'green';
                functionItemElement.addEventListener('click', async () => {
                    await this.addFunctionToChatPrompt(functionName, args, lineNumber);
                    console.log('this is the line number ', lineNumber);
                    await this.pullFunctionList(this.onlyStubs);
                });
            }
            console.log(this.onlyStubs, isStub);

            this.container.appendChild(functionItemElement);
            this.container.appendChild(document.createElement('br'));


        }
    }
    async implementSpecificClassMethod(className, methodName, args, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('./gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Implement ${methodName}.${className}`);
        await ctx.chat.addMessage(`Write the ${methodName} method in the ${className} class.
Remember to respond with a snippet in the form of the following:
\`\`\`
class ${className} {
    ${methodName}(${args.join(', ')}) {
        // your code here
    }
}
\`\`\`
`);
        await ctx.chat.callLLM();
    }
    async addToChatPrompt(className, methodName, args, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('./gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Modify ${methodName}.${className}`);
        await ctx.chat.setInput(`Modify the ${methodName} method in the ${className} class.
Improve it.

Remember to respond with a snippet in the form of the following:
\`\`\`
class ${className} {
    ${methodName}(${args.join(', ')}) {
        // your code here
    }
}
\`\`\`
`);
    }
    async implementSpecificFunction(functionName, args, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('./gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Implement ${functionName}`);
        await ctx.chat.addMessage(`Write the ${functionName} function.
Remember to respond with a snippet in the form of the following:
\`\`\`
function ${functionName}(${args.join(', ')}) {
    // your code here
}
\`\`\`            
`);
        await ctx.chat.callLLM();
    }
    async addFunctionToChatPrompt(functionName, args, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('./gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Modify ${functionName}`);
        await ctx.chat.setInput(`Modify the ${functionName} function.
Improve it.
            
\`\`\`
function ${functionName}(${args.join(', ')}) {
    // your code here
}
\`\`\`
`);
    }
    async verifyTargetFileSpecified() {
        if (!ctx.targetFile) {
            // check if tools tab is active
            if (ctx.tabs.activeTab == 'Tools') {
                await alert('Please select a file first');
                ctx.tabs.switchToTab('chat');
            }
            return false;
        }
        return true;
    }
}</file>

<file fileName="src/aiCoderApiFunctions.js">
import { scrapeToMarkdown } from '@mmiscool/scrape_to_markdown';
import fs from 'fs';
import { getListOfFunctions, getMethodsWithArguments, prependClassStructure } from './classListing.js';
import {
    deleteFile,
    getAllFiles,
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










export async function setupConfigFiles() {
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
export async function listConversations() {
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
}</file>

<file fileName="src/apiServer.js">// server.js
import { ctx } from './main.js';
import http from 'http';
import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import mime from 'mime'; // Install this package with `npm install mime`
import WebSocket, { WebSocketServer } from 'ws'; // WebSocket support
import { getScriptFolderPath } from './fileIO.js';
import { aiCoderApiFunctions } from './aiCoderApiFunctions.js';
import { printAndPause, readArg } from './terminalHelpers.js';
import { execSync } from 'child_process';
export let wss;







async function buildFrontend() {
    //console.log('Building frontend...');

    try {
        // Resolve the script directory
        let scriptPath = await getScriptFolderPath();
        //console.log('scriptPath:', scriptPath);

        // Define paths for the dist and cache directories
        const distPath = path.join(scriptPath, '../dist');
        const cachePath = path.join(scriptPath, '../.parcel-cache');

        // Clean up old build artifacts
        await Promise.all([
            fs.rm(distPath, { recursive: true, force: true }),
            fs.rm(cachePath, { recursive: true, force: true }),
        ]);

        // remove /src from the end of the scriptPath
        scriptPath = scriptPath.substring(0, scriptPath.length - 4);


        // Execute Parcel build command
        const buildCommand = `npx parcel build ./public/index.html --no-optimize`;
        //console.log(`Running command: ${buildCommand} in ${scriptPath}`);
        execSync(buildCommand, { cwd: scriptPath, stdio: 'inherit' });

        //console.log('Frontend built successfully.');
    } catch (error) {
        console.error('Error during frontend build:', error);
    }
}

buildFrontend();


export function setupServer() {
    // ctx variables
    ctx.appData = {};
    ctx.appData.serveDirectory = path.resolve(getScriptFolderPath() + "/../dist"); // Directory to serve files from

    ctx.aiCoderApiFunctions = new aiCoderApiFunctions();

    let PORT = parseInt(readArg("-p")) || 3000; // Start port
    const HOST = '0.0.0.0';

    const createServer = () => {
        const server = http.createServer(async (req, res) => {
            try {
                const parsedUrl = url.parse(req.url, true);
                const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;

                let parsedBody = {};
                if (req.method === 'POST') {
                    // Read the body of the request
                    const body = await new Promise((resolve, reject) => {
                        let data = '';
                        req.on('data', chunk => {
                            data += chunk;
                        });
                        req.on('end', () => {
                            resolve(data);
                        });
                        req.on('error', err => {
                            reject(err);
                        });
                    });

                    if (body) {
                        try {
                            parsedBody = JSON.parse(body);
                        } catch (err) {
                            console.error('Invalid JSON:', err.message);
                            parsedBody = {}; // Default to an empty object if parsing fails
                        }
                    }
                }

                // API method handling
                const pathnameWithoutSlash = pathname.substring(1);
                if (pathnameWithoutSlash in aiCoderApiFunctions.prototype) {
                    console.log('Calling method:', pathnameWithoutSlash);
                    const response = await aiCoderApiFunctions.prototype[pathnameWithoutSlash](parsedBody);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                    return;
                }

                // File serving logic
                const filePath = path.join(ctx.appData.serveDirectory, pathname);

                try {
                    // Check if the file exists
                    await fs.access(filePath);

                    // Serve the file with the correct MIME type
                    const mimeType = mime.getType(filePath) || 'application/octet-stream';
                    res.setHeader('Content-Type', mimeType);

                    console.log('Serving file:', filePath);
                    const fileContent = await fs.readFile(filePath);
                    res.statusCode = 200;
                    res.end(fileContent);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'File not found' }));
                    } else {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Error serving file', error: err.message }));
                    }
                }
            } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Unexpected server error', error: err.message }));
            }
        });

        // Attach error listener for port conflicts
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`Port ${PORT} is in use. Trying port ${PORT + 1}...`);
                PORT++;
                createServer();
            } else {
                console.error('Server error:', err);
            }
        });

        // Start the server
        server.listen(PORT, HOST, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            //console.log(`Serving files from: ${ctx.appData.serveDirectory}`);

            // WebSocket server setup
            wss = new WebSocketServer({ server });

            wss.on('connection', (ws) => {
                console.log('WebSocket connection established.');

                ws.on('message', (message) => {
                    console.log('Received:', message);
                    ws.send(`Echo: ${message}`);
                });

                ws.on('close', () => {
                    console.log('WebSocket connection closed.');
                });

                ws.send('Welcome to the WebSocket server!');
                ctx.ws = ws;
            });
        });
    };

    createServer();
    // print server address after waiting for 5 seconds
    setTimeout(() => {
        printAndPause(`Server is running at http://localhost:${PORT}`);
    }, 5000);
}

</file>

<file fileName="src/backupSystem.js">import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createFolderIfNotExists } from './fileIO.js';

// make a folder including any parent folders if they don't exist
export async function createBackup(filePath) {
    console.log('Creating backup of the file:', filePath);

    const backupFolder = './.aiCoder/backups';
    await createFolderIfNotExists(backupFolder);

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupFilePath = path.join(backupFolder, path.dirname(filePath), `${path.basename(filePath)}_backup_`);

    await createFolderIfNotExists(path.dirname(backupFilePath)); // Ensure nested directories exist

    await fs.copyFileSync(filePath, `${backupFilePath}${timestamp}`);

    // deduplicate the backups
    const allBackupFiles = await listFilesMatchingName(backupFilePath);
    await deleteDuplicates(allBackupFiles);

    return backupFilePath;

}




export async function rollbackFile(pathToBackupFile) {
    await fs.copyFileSync(pathToBackupFile, pathToBackupFile.replace('_backup_', ''));
}



export async function listFilesMatchingName(baseFileName) {
    const results = [];
    const baseDir = path.dirname(baseFileName);
    async function searchDirectory(dir) {
        const files = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            //console.log(fullPath, "full path");
            if (file.isDirectory()) {
                await searchDirectory(fullPath);
            } else {
                if (fullPath.includes(baseFileName)) {
                    results.push(fullPath);
                }
            }
        }
    }
    await searchDirectory(baseDir);
    return results;
}



// Helper function to calculate file hash
export function calculateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
}

export async function deleteDuplicates(files) {
    const seenFiles = new Map();

    for (const file of files) {
        const filePath = path.resolve(file);

        try {
            const hash = await calculateFileHash(filePath);  // Ensure this function is async and returns a string hash

            if (seenFiles.has(hash)) {
                // Delete file if hash already exists in map
                await fs.promises.unlink(filePath);  // Use async version of unlink
                console.log(`Deleted duplicate file: ${filePath}`);
            } else {
                // Store first occurrence of unique file by hash
                seenFiles.set(hash, filePath);
            }
        } catch (err) {
            console.error(`Error processing file ${filePath}: ${err.message}`);
        }
    }
}




</file>

<file fileName="src/classListing.js">import { readFile, writeFile } from './fileIO.js';
import * as esprima from 'esprima-next';

export async function prependClassStructure(targetFile, onlyStubs = false) {
  // You can toggle onlyStubs = true or false as needed

  const fileContent = await readFile(targetFile);
  const list = await getMethodsWithArguments(fileContent, onlyStubs);
  //console.log(list);

  // Prompt if the user wants to include function names in the list
  const includeFunctions = true;

  // Build the output of classes and methods
  let listOfClasses = '';

  for (const className in list) {
    const methods = list[className];

    // Start the class declaration
    listOfClasses += `class ${className} {`;

    // Optionally add method names with arguments
    if (includeFunctions) {
      listOfClasses += '\n';
      methods.forEach(({ name, args }) => {
        const argList = args.join(', ');
        listOfClasses += `  ${name}(${argList}) {}\n`;
      });
    }

    // Close the class
    listOfClasses += `}\n\n`; // Double newline for separation between classes
  }

  //console.log(listOfClasses);

  // Prepend the list to the file content
  await writeFile(targetFile, listOfClasses + '\n\n' + fileContent);
}


export function getMethodsWithArguments(code, onlyStubs = false) {
  const ast = esprima.parseModule(code, {
    sourceType: 'module',
    tolerant: true,
    range: true,
    loc: true,
    attachComment: true,
  });
  const classInfo = new Map();

  ast.body.forEach(node => {
    let classNode = null;

    if (node.type === 'ClassDeclaration') {
      classNode = node;
    } else if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration &&
      node.declaration.type === 'ClassDeclaration'
    ) {
      classNode = node.declaration;
    }

    if (classNode && classNode.id && classNode.id.name) {
      const className = classNode.id.name;
      const parentClassName = classNode.superClass && classNode.superClass.name ? classNode.superClass.name : null;
      let methods = [];

      classNode.body.body.forEach(classElement => {
        
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          const methodName = classElement.key.name;
          const lineNumber = classElement.loc.start.line;
          //console.log(methodName,lineNumber);

          const args = classElement.value.params.map(param => {
            if (param.type === 'Identifier') return param.name;
            if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') return param.left.name;
            return 'unknown';
          });

          const methodBody = classElement.value.body?.body || [];
          const isStub =
            methodBody.length === 0 ||
            (methodBody.length === 1 &&
              methodBody[0].type === 'ReturnStatement' &&
              !methodBody[0].argument);

          methods.push({ name: methodName, args, isStub, lineNumber });
        }
      });

      if (onlyStubs) {
        methods = methods.filter(m => m.isStub);
      }

      classInfo.set(className, { className, parentClassName, methods});
    }
  });

  const sortedClasses = [];
  const processedClasses = new Set();

  function addClassAndSubclasses(className) {
    if (processedClasses.has(className)) return;
    const classData = classInfo.get(className);
    if (!classData) return;

    if (classData.parentClassName && classInfo.has(classData.parentClassName)) {
      addClassAndSubclasses(classData.parentClassName);
    }

    sortedClasses.push(classData);
    processedClasses.add(className);
  }

  Array.from(classInfo.keys()).forEach(addClassAndSubclasses);

  const result = {};
  sortedClasses.forEach(({ className, methods }) => {
    result[className] = methods;
  });

  return result;
}

export async function getStubMethods(code) {
  // Call the original getMethodsWithArguments function with onlyStubs = true
  const allMethods = await getMethodsWithArguments(code, true);

  // Filter to only include classes and methods where isStub is true
  const stubMethods = {};

  for (const [className, methods] of Object.entries(allMethods)) {
    const stubMethodsInClass = methods.filter(method => method.isStub);

    // Only include the class if it has stub methods
    if (stubMethodsInClass.length > 0) {
      stubMethods[className] = stubMethodsInClass;
    }
  }

  return stubMethods;
}


export async function getListOfFunctions(code) {
  const ast = esprima.parseModule(code, {
    sourceType: 'module',
    tolerant: true,
    range: true,
    loc: true,
    attachComment: true,
  });
  const functionsInfo = new Map();

  ast.body.forEach(node => {
    let functionNode = null;

    if (node.type === 'FunctionDeclaration') {
      functionNode = node;
    } else if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration &&
      node.declaration.type === 'FunctionDeclaration'
    ) {
      functionNode = node.declaration;
    }

    if (functionNode && functionNode.id && functionNode.id.name) {
      const functionName = functionNode.id.name;
      const lineNumber = functionNode.loc.start.line;
      let args = [];

      functionNode.params.forEach(param => {
        if (param.type === 'Identifier') args.push(param.name);
        if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') args.push(param.left.name);
      });

      const isStub = functionNode.body.body.length === 0;

      functionsInfo.set(functionName, { functionName, args, isStub, lineNumber });
    }
  });

  // convert the Map to an object
  const result = {};
  functionsInfo.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

</file>

<file fileName="src/extractCodeSnippets.js">export function extractCodeSnippets(markdownText) {
  const codeSnippets = [];
  const codeBlockRegex = /```[\s\S]*?```/g;

  let matches;
  while ((matches = codeBlockRegex.exec(markdownText)) !== null) {
    // Remove the backticks and any language specifier (like javascript) from the match
    const codeSnippet = matches[0].replace(/```(?:\w+)?|```/g, '').trim();

    codeSnippets.push(codeSnippet);
  }

  return codeSnippets;
}
</file>

<file fileName="src/fileIO.js">
import fs from 'fs';
import path, { dirname } from 'path';
import { createBackup } from './backupSystem.js';
import {
    printAndPause,
    printDebugMessage
} from './terminalHelpers.js';
import { fileURLToPath } from 'url';
// Helper functions to read, write, and append to files
// backups to be created in the ./.aiCoder/backups folder
// backup file names should be the original file name and path with a timestamp appended to it
export async function readFile(filePath) {
    printDebugMessage('Reading file:', filePath);
    try {
        return await fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.log(`File not found: ${ filePath }`);
        // console.log('Error reading file:', error);
        return null;
    }
}
export async function writeFile(filePath, content, makeBackup = false) {
    if (typeof content !== 'string') {
        await printDebugMessage('Content is not a string:', content);
    }
    // create the folders in the file path if they don't exist
    let folderPath = path.dirname(filePath);
    await createFolderIfNotExists(folderPath);
    printDebugMessage('Writing file:', filePath);
    filePath = await convertToRelativePath(filePath);
    if (makeBackup)
        await createBackup(filePath);
    await fs.writeFileSync(filePath, content, 'utf8');
    await printAndPause(`File written: ${ filePath }`);
}
export async function appendFile(filePath, content, makeBackup = false) {
    await printDebugMessage('Appending to file:', filePath);
    filePath = await convertToRelativePath(filePath);
    if (makeBackup)
        await createBackup(filePath);
    await fs.appendFileSync(filePath, content, 'utf8');
}
export function convertToRelativePath(filePath) {
    // check if the file path is already relative
    printDebugMessage('filePath:', filePath);
    // test if filePath is a string
    if (typeof filePath !== 'string') {
        console.log('filePath is not a string:', filePath);
        return filePath;
    }
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return filePath;
    }
    return path.relative(process.cwd(), filePath);
}
export async function createFolderIfNotExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}
export async function readOrLoadFromDefault(filePath, defaultFilePath = null) {
    // console.log('Reading or loading from default:', filePath);
    defaultFilePath = await getScriptFolderPath() + defaultFilePath;
    let fileContent = await readFile(filePath);
    if (fileContent === null) {
        console.log('Creating new file:', filePath);
        fileContent = await readFile(defaultFilePath);
        await writeFile(filePath, fileContent);
    } else {
    }
    return fileContent;
}
export async function readSetting(fileName) {
    // by default the settings are stored in the ./.aiCoder folder.
    // If the file is not found we will use the readOrLoadFromDefault function to create a new file with the default settings
    try {
        return await readOrLoadFromDefault(`./.aiCoder/${ fileName }`, `/${ fileName }`);
    } catch (error) {
        console.log('Error reading setting:', fileName);
        // console.log('Error:', error);
        return null;
    }
}
export async function writeSetting(fileName, content) {
    printDebugMessage('Writing setting:', fileName, content);
    console.log('Writing setting:', fileName);
    // by default the settings are stored in the ./.aiCoder folder.
    await writeFile(`./.aiCoder/${ fileName }`, content);
}
export async function moveFile(oldPath, newPath) {
    // create the folders in the file path if they don't exist
    try {
        let folderPath = path.dirname(newPath);
        await createFolderIfNotExists(folderPath);
        await fs.renameSync(oldPath, newPath);
        await printDebugMessage('Moving file:', oldPath, newPath);
        await printAndPause(`File moved: ${ oldPath } to ${ newPath }`);
    } catch (error) {
    }
}
export function getScriptFolderPath() {
    // Retrieve the current file's directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname;
}
export function getAllFiles(folderPath) {
    const result = [];
    function readDirRecursively(currentPath) {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });
        items.forEach(item => {
            const itemPath = path.join(currentPath, item.name);
            const relativePath = path.relative(folderPath, itemPath);
            if (item.isDirectory()) {
                readDirRecursively(itemPath);
            } else {
                if (relativePath.startsWith('.aiCoder'))
                    return;
                if (relativePath.startsWith('node_modules'))
                    return;
                if (relativePath.startsWith('.git'))
                    return;
                result.push('./' + relativePath);
            }
        });
    }
    readDirRecursively(folderPath);
    return result;
}
export async function deleteDirectory(directoryPath) {
    try {
        const items = fs.readdirSync(directoryPath, { withFileTypes: true });
        for (const item of items) {
            const itemPath = path.join(directoryPath, item.name);
            if (item.isDirectory()) {
                await deleteDirectory(itemPath);
            } else {
                fs.unlinkSync(itemPath);
            }
        }
        fs.rmdirSync(directoryPath);
        printDebugMessage(`Directory deleted: ${ directoryPath }`);
    } catch (error) {
        console.log(`Error deleting directory: ${ directoryPath }`, error);
    }
}
export async function deleteFile(filePath) {
    console.log('Deleting file:', filePath);
    try {
        await fs.unlinkSync(filePath);
        printDebugMessage(`File deleted: ${ filePath }`);
    } catch (error) {
        console.log(`Error deleting file: ${ filePath }`, error);
    }
}
</file>

<file fileName="src/fileSystem.js">export class UniversalFileSystem {
    constructor() {
        if (typeof window !== "undefined" && window.showDirectoryPicker) {
            this.isBrowser = true;
            this.fs = new BrowserFileSystem();
        } else {
            this.isBrowser = false;
            this.fs = new NodeFileSystem();
        }
    }

    async openDirectory() {
        return await this.fs.openDirectory();
    }

    async listFiles() {
        return await this.fs.listFiles();
    }

    async flatList() {
        const files = await this.fs.flatList();
        return files.sort();
    }
    

    async readFile(fileName) {
        return await this.fs.readFile(fileName);
    }

    async writeFile(fileName, content) {
        return await this.fs.writeFile(fileName, content);
    }

    async deleteFile(fileName) {
        return await this.fs.deleteFile(fileName);
    }
}

// Browser-specific implementation
class BrowserFileSystem {
    constructor() {
        this.directoryHandle = null;
    }

    async openDirectory() {
        this.directoryHandle = await window.showDirectoryPicker();
    }

    async listFiles() {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const files = [];
        for await (const [name, handle] of this.directoryHandle.entries()) {
            files.push({ name, kind: handle.kind });
        }
        return files;
    }

    async flatList() {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const paths = [];
        async function traverse(directoryHandle, currentPath) {
            for await (const [name, handle] of directoryHandle.entries()) {
                const fullPath = currentPath ? `${currentPath}/${name}` : name;
                if (handle.kind === "file") {
                    paths.push(fullPath);
                } else if (handle.kind === "directory") {
                    await traverse(handle, fullPath);
                }
            }
        }
        await traverse(this.directoryHandle, "");
        return paths;
    }

    async readFile(fileName) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const fileHandle = await this.directoryHandle.getFileHandle(fileName);
        const file = await fileHandle.getFile();
        return await file.text();
    }

    async writeFile(fileName, content) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const parts = fileName.split('/');
        let currentDir = this.directoryHandle;
        for (let i = 0; i < parts.length - 1; i++) {
            currentDir = await currentDir.getDirectoryHandle(parts[i], { create: true });
        }
        const fileHandle = await currentDir.getFileHandle(parts[parts.length - 1], { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    async deleteFile(fileName) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        await this.directoryHandle.removeEntry(fileName);
    }
}

// Node.js-specific implementation
let fs, path;
if (typeof window === "undefined") {
    fs = (await import("fs")).promises;
    path = await import("path");
}

class NodeFileSystem {
    constructor() {
        try {
            this.currentDirectory = process.cwd();
        } catch {
            console.log("Error: process.cwd() not available in this environment.");
        }

    }

    async openDirectory(directoryPath = process.cwd()) {
        this.currentDirectory = directoryPath;
    }

    async listFiles() {
        const files = await fs.readdir(this.currentDirectory, { withFileTypes: true });
        return files.map((file) => {
            const fullPath = path.join(this.currentDirectory, file.name);
            return { name: file.name, kind: file.isDirectory() ? "directory" : "file" };
        });
    }

    async flatList(directory = this.currentDirectory, baseDirectory = this.currentDirectory) {
        const results = [];
        const traverse = async (dir) => {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(baseDirectory, fullPath);
                if (entry.isFile()) {
                    results.push(relativePath);
                } else if (entry.isDirectory()) {
                    await traverse(fullPath);
                }
            }
        };
        await traverse(directory);
        return results;
    }

    async readFile(fileName) {
        const filePath = path.join(this.currentDirectory, fileName);
        return await fs.readFile(filePath, "utf8");
    }

    async writeFile(fileName, content) {
        const filePath = path.join(this.currentDirectory, fileName);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, "utf8");
    }

    async deleteFile(fileName) {
        const filePath = path.join(this.currentDirectory, fileName);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            if (err.code === "ENOENT") {
                throw new Error(`File not found: ${fileName}`);
            } else {
                throw err;
            }
        }
    }
}
</file>

<file fileName="src/findGitRoot.js">import { promises as fs } from 'fs';
import path from 'path';

async function findGitRoot(startPath = process.cwd()) {
    let currentDir = startPath;

    while (currentDir !== path.parse(currentDir).root) {
        try {
            const files = await fs.readdir(currentDir);
            if (files.includes('.git')) {
                return currentDir;
            }
        } catch (error) {
            console.error(`Error reading directory ${currentDir}:`, error.message);
        }
        currentDir = path.dirname(currentDir); // Move up one level
    }

    throw new Error('Git root not found');
}


export async function swapToGitRoot() {
    try {
        const gitRoot = await findGitRoot();
        console.log('Git root found at:', gitRoot);

        // Change the current working directory to the Git root
        process.chdir(gitRoot);
        console.log('Current working directory changed to Git root:', process.cwd());

        // Your application code here will now use the Git root as the working directory

    } catch (error) {
        console.error(error.message);
    }
}</file>

<file fileName="src/gitnoteSetup.js">import fs from 'fs';
import path from 'path';

/**
 * Adds files to .gitignore if they are not already present.
 * @param {string[]} files - Array of file paths to add to .gitignore.
 */
function addFilesToGitignore(files) {
    const gitignorePath = path.resolve('.gitignore');

    // Read the .gitignore file or create it if it doesn't exist
    let gitignoreContent = '';
    try {
        gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error reading .gitignore: ${err}`);
            return;
        }
    }

    // Split the content by lines and create a Set for quick lookups
    const gitignoreLines = new Set(gitignoreContent.split('\n').map(line => line.trim()));

    // Collect files to be added
    const newEntries = files.filter(file => !gitignoreLines.has(file));

    if (newEntries.length === 0) {
        //console.log('All files are already in .gitignore.');
        return;
    }

    // Append new entries to .gitignore
    const updatedContent = gitignoreContent + '\n' + newEntries.join('\n') + '\n';
    try {
        fs.writeFileSync(gitignorePath, updatedContent);
        console.log(`Added ${newEntries.length} new file(s) to .gitignore.`);
    } catch (err) {
        console.error(`Error writing to .gitignore: ${err}`);
    }
}

// Example usage:
addFilesToGitignore(['*aiCoder/llmConfig*key*', '*aiCoder/backups/*']);
</file>

<file fileName="src/llmCall.js">import Anthropic from '@anthropic-ai/sdk';
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
let lastCallTime = 0;


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
    const llmToUse = await readSetting(`llmConfig/ai-service.txt`);

    // for each message in the array, check if it is a file path and if it is read the file and add the content to the messages array
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].filePath) {
            console.log('file type message description:', messages[i].description);
            messages[i].content = messages[i].description + "\n\n" + await readFile(messages[i].filePath);
        }
    }
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



export async function llmSettings() {
    // pull the current settings from the files
    // pull the available models from each service

    const currentService = await readSetting(`llmConfig/ai-service.txt`);

    const settingsObject = {
        ollama: {
            model: await readSetting(`llmConfig/ollama-model.txt`),
            apiKey: await readSetting(`llmConfig/ollama-api-key.txt`),
            models: await getOllamaModels(),
            active: currentService === 'ollama',
        },
        openai: {
            model: await readSetting(`llmConfig/openai-model.txt`),
            apiKey: await readSetting(`llmConfig/openai-api-key.txt`),
            models: await getOpenAIModels(),
            active: currentService === 'openai',
        },
        groq: {
            model: await readSetting(`llmConfig/groq-model.txt`),
            apiKey: await readSetting(`llmConfig/groq-api-key.txt`),
            models: await getGroqModels(),
            active: currentService === 'groq',
        },

        anthropic: {
            model: await readSetting(`llmConfig/anthropic-model.txt`),
            apiKey: await readSetting(`llmConfig/anthropic-api-key.txt`),
            models: await getClaudeModels(),
            active: currentService === 'anthropic',
        },

        googleAI: {
            model: await readSetting(`llmConfig/googleAI-model.txt`),
            apiKey: await readSetting(`llmConfig/googleAI-api-key.txt`),
            models: await getGoogleAIModels(),
            active: currentService === 'googleAI',
        },

    }

    return settingsObject;
    // return an object with the settings and options
}

export async function llmSettingsUpdate(settings) {
    // write the new settings to the files
    await writeSetting(`llmConfig/ollama-model.txt`, settings.ollama.model);
    await writeSetting(`llmConfig/ollama-api-key.txt`, settings.ollama.apiKey);

    await writeSetting(`llmConfig/openai-model.txt`, settings.openai.model);
    await writeSetting(`llmConfig/openai-api-key.txt`, settings.openai.apiKey);

    await writeSetting(`llmConfig/groq-model.txt`, settings.groq.model);
    await writeSetting(`llmConfig/groq-api-key.txt`, settings.groq.apiKey);

    await writeSetting(`llmConfig/anthropic-model.txt`, settings.anthropic.model);
    await writeSetting(`llmConfig/anthropic-api-key.txt`, settings.anthropic.apiKey);

    await writeSetting(`llmConfig/googleAI-model.txt`, settings.googleAI.model);
    await writeSetting(`llmConfig/googleAI-api-key.txt`, settings.googleAI.apiKey);

    await writeSetting(`llmConfig/ai-service.txt`,
        settings.openai.active ? 'openai' :
            settings.groq.active ? 'groq' :
                settings.ollama.active ? 'ollama' :
                    settings.anthropic.active ? 'anthropic' :
                        settings.googleAI.active ? 'googleAI' : '');


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
    const groq = new Groq({ apiKey: readSetting('llmConfig/groq-api-key.txt') });


    const completion = await groq.chat.completions
        .create({
            messages,
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
        const listOfModels = models.filter(model => model.id.length < 25).map(model => model.id);

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
        const listOfModels = models.filter(model => model.id.length < 15).map(model => model.id);

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
        
    ]
}</file>

<file fileName="src/main.js">#!/usr/bin/env node
console.log(`                                                             
      _/_/    _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/_/_/    
   _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/   
  _/_/_/_/    _/        _/        _/    _/  _/    _/  _/_/_/    _/_/_/      
 _/    _/    _/        _/        _/    _/  _/    _/  _/        _/    _/     
_/    _/  _/_/_/        _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/    _/      

https://aicoderproject.com/

Source: https://github.com/mmiscool/aiCoder
`);

import {
  printAndPause,
} from './terminalHelpers.js';

import './gitnoteSetup.js';
import { setupServer } from './apiServer.js';






// graceful shutdown
process.on('SIGINT', () => {
  printAndPause("\nExiting gracefully...");
  process.exit(0); // Exit with a success code
});


//Current target file
export const ctx = {};


ctx.targetFile = process.argv[2];
ctx.skipApprovingChanges = false;


async function appStart(params) {
  if (!ctx.targetFile) ctx.targetFile = await getFilePath();
  setupServer();
}

// Determine file path based on argument or interactive selection
export async function getFilePath(newFilePathArg = null) {
  return `./`;
}


appStart();</file>

<file fileName="src/mergeTools/languages/css/css.js">const testMode = process.env.NODE_ENV === 'test';
export class cssManipulator {
  constructor() {
    this.parsedCSS = [];
  }
  // Method to parse CSS into an array of selector-declaration pairs
  parse(css) {
    const regex = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)*\}/g;
    this.parsedCSS = [];
    let match;
    while ((match = regex.exec(css)) !== null) {
      const selector = match[1].trim();
      const declarationBlock = this.extractDeclarations(match[0]);
      this.parsedCSS.push({
        selector,
        declarationBlock
      });
    }
  }
  // Method to resolve duplicate selectors
  mergeDuplicates() {
    const selectorMap = new Map();
    // Traverse from the end to preserve the last occurrence
    for (let i = this.parsedCSS.length - 1; i >= 0; i--) {
      const { selector, declarationBlock } = this.parsedCSS[i];
      if (selectorMap.has(selector)) {
        // Remove the earlier occurrence
        this.parsedCSS.splice(i, 1);
      } else {
        selectorMap.set(selector, declarationBlock);
      }
    }
  }
  // Method to convert the parsed CSS structure back into a CSS string
  toCSSString() {
    return this.parsedCSS.map(({ selector, declarationBlock }) => {
      const indentedDeclarations = declarationBlock.split(';').map(declaration => declaration.trim()).filter(Boolean).map(declaration => `  ${declaration};`).join('\n');
      return `${selector} {\n${indentedDeclarations}\n}`;
    }).join('\n\n');
  }
  extractDeclarations(cssBlock) {
    const start = cssBlock.indexOf('{') + 1;
    const end = cssBlock.lastIndexOf('}');
    return cssBlock.slice(start, end).trim();
  }
}

if (testMode) {
  // Example usage
  const css = `
  div > .button {
    color: red;
  }
  .container, .box {
    margin: 10px;
  }
  div > .button {
    background: blue;
  }
  @media (max-width: 600px) {
    .responsive {
      display: block;
    }
  }
  `;
  const manipulator = new cssManipulator();
  manipulator.parse(css);
  manipulator.mergeDuplicates();
  const resolvedCSS = manipulator.toCSSString();
  console.log('Original CSS:\n', css);
  console.log('Resolved CSS:\n', resolvedCSS);
}
</file>

<file fileName="src/mergeTools/languages/javascript/javascript.js">
import * as escodegen from 'escodegen';
import esprima from 'esprima-next';
import estraverse from 'estraverse';

const debug = false;


export class javascriptManipulator {
    constructor(code = '') {
        this.code = code;
    }
    async setCode(code) {
        this.code = code;
        await this.parse();
        return this.code;
    }
    async mergeCode(newCode) {
        try {
            await esprima.parseScript(newCode, {
                tolerant: true,
                range: true,
                loc: true,
                attachComment: true
            });
        } catch (e) {
            console.error(e);
            debugLog('Error parsing the new code snippet');
            return false;
        }
        this.code = this.code + '\n\n\n\n' + newCode;
        await this.parse();
        await this.mergeDuplicates();
        return await this.generateCode();
    }
    async mergeDuplicates() {
        await this.parse();
        await this.cleanUpComments();
        await this.makeAllFunctionsExported();
        await this.makeAllClassesExported();
        await this.mergeDuplicateImports();
        await this.mergeDuplicateVariables();
        await this.mergeDuplicateFunctions();
        await this.mergeDuplicateClasses();
        await this.removeEmptyExports();
        return await this.generateCode();
    }
    async removeEmptyExports() {
        // Remove empty export statements
        await estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ExportNamedDeclaration' && !node.declaration && (!node.specifiers || node.specifiers.length === 0)) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
    }
    async mergeDuplicateFunctions() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const functionMap = new Map();
        // Traverse the AST to collect all function declarations
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.type === 'FunctionDeclaration') {
                    const functionName = node.id.name;
                    debugLog(`Processing function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        debugLog(`Duplicate function found: ${functionName}`);
                        // Check if the new function contains code
                        const hasCode = node.body.body && node.body.body.length > 0;
                        const existingHasCode = existingFunction.body.body && existingFunction.body.body.length > 0;
                        // Handle JSDoc comments
                        const jsDocComment = node.leadingComments?.find(comment => comment.type === 'Block' && comment.value.startsWith('*'));
                        if (hasCode) {
                            debugLog(`Replacing existing function '${functionName}' with new implementation.`);
                            functionMap.set(functionName, node);
                            // Update map to hold the new function
                            // Copy JSDoc comments from the new function if exists
                            if (jsDocComment) {
                                existingFunction.leadingComments = [
                                    ...existingFunction.leadingComments || [],
                                    jsDocComment
                                ];
                            }
                        } else if (existingHasCode) {
                            debugLog(`Keeping existing function '${functionName}' as it has valid implementation.`);
                        } else {
                            debugLog(`Both functions '${functionName}' are stubs; keeping the first one.`);
                        }
                        // Keep the original stub
                        // Mark the duplicate function for removal (the one that is lower in the file)
                        if (hasCode) {
                            existingFunction.remove = true;
                        } else
                        // We want to remove the earlier one only if hasCode is true
                        {
                            node.remove = true;
                        }
                    } else
                    // If duplicate stubs, mark the later one for removal
                    {
                        debugLog(`Adding function '${functionName}' to map.`);
                        functionMap.set(functionName, node);
                    }
                }
            }
        });
        // Store the new function in the map
        // Remove marked duplicate functions
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.remove) {
                    debugLog(`Removing duplicate function: ${node.id.name}`);
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        // Check for exported functions and ensure they stay distinct
        estraverse.replace(this.ast, {
            enter: node => {
                if (node.type === 'ExportNamedDeclaration' && node.declaration && node.declaration.type === 'FunctionDeclaration') {
                    const functionName = node.declaration.id.name;
                    debugLog(`Processing exported function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        if (existingFunction !== node.declaration) {
                            debugLog(`Marking old exported function '${functionName}' for removal.`);
                            existingFunction.remove = true;
                        }
                    }
                }
            }
        });
        // Mark the old function for removal
        return this.ast;
    }
    async mergeDuplicateImports() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const importMap = new Map();
        const importNodes = [];
        debugLog('Merging duplicate imports');
        // Traverse the AST to collect and combine imports
        estraverse.traverse(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ImportDeclaration') {
                    const source = node.source.value;
                    debugLog(`import {${node.specifiers.map(s => s.local.name).join(', ')}} from '${source}'`);
                    if (importMap.has(source)) {
                        // Merge specifiers from the duplicate import
                        const existingNode = importMap.get(source);
                        const existingSpecifiers = existingNode.specifiers;
                        const newSpecifiers = node.specifiers;
                        // Avoid duplicates in specifiers
                        newSpecifiers.forEach(specifier => {
                            if (!existingSpecifiers.some(existing => existing.local.name === specifier.local.name)) {
                                existingSpecifiers.push(specifier);
                            }
                        });
                        // Mark the duplicate node for removal
                        node.remove = true;
                    } else {
                        // Add the import to the map
                        importMap.set(source, node);
                        importNodes.push(node);
                    }
                }
            }
        });
        // Keep track of import nodes
        // Remove duplicate import nodes
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ImportDeclaration' && node.remove) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        // Move all imports to the top of the program
        estraverse.replace(this.ast, {
            enter: node => {
                if (node.type === 'Program') {
                    // Remove all imports from their original position
                    node.body = node.body.filter(child => child.type !== 'ImportDeclaration');
                    // Add the combined import statements to the top
                    node.body.unshift(...importNodes);
                }
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateVariables() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const variableMap = new Map();
        // Traverse the AST to collect root-level variable declarations
        estraverse.traverse(this.ast, {
            enter: (node, parent) => {
                // Only process root-level variable declarations
                if (node.type === 'VariableDeclaration' && parent.type === 'Program') {
                    node.declarations.forEach(declaration => {
                        const variableName = declaration.id.name;
                        if (variableMap.has(variableName)) {
                            const existingDeclaration = variableMap.get(variableName);
                            existingDeclaration.id = declaration.id;
                            existingDeclaration.init = declaration.init;
                            // Mark the new (later) declaration for removal
                            declaration.remove = true;
                        } else {
                            // Add the variable to the map
                            variableMap.set(variableName, declaration);
                        }
                    });
                }
            }
        });
        // Remove duplicate variable declarations
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'VariableDeclaration' && node.declarations.every(decl => decl.remove)) {
                    return this.removeNodeFromParent(node, parent);
                }
                // Filter out removed declarations from VariableDeclaration nodes
                if (node.type === 'VariableDeclaration') {
                    node.declarations = node.declarations.filter(decl => !decl.remove);
                }
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateClasses() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const classMap = new Map();
        // Traverse the AST to collect all class declarations
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.type === 'ClassDeclaration') {
                    const className = node.id.name;
                    if (classMap.has(className)) {
                        const existingClass = classMap.get(className);
                        const existingMethods = new Map(existingClass.body.body.filter(method => method.type === 'MethodDefinition').map(method => [
                            method.key.name,
                            method
                        ]));
                        node.body.body.forEach(method => {
                            if (method.type === 'MethodDefinition') {
                                const methodName = method.key.name;
                                if (existingMethods.has(methodName)) {
                                    const existingMethod = existingMethods.get(methodName);
                                    // Handle JSDoc comments
                                    const jsDocComment = method.leadingComments?.find(comment => comment.type === 'Block' && comment.value.startsWith('*'));
                                    // Replace method only if the new method has code
                                    if (method.value.body && method.value.body.body.length > 0) {
                                        existingMethod.value = method.value;
                                        if (jsDocComment) {
                                            existingMethod.leadingComments = [
                                                ...existingMethod.leadingComments || [],
                                                jsDocComment
                                            ];
                                        }
                                    } else {
                                        if (jsDocComment) {
                                            existingMethod.leadingComments = [
                                                ...existingMethod.leadingComments || [],
                                                jsDocComment
                                            ];
                                        }
                                    }
                                } else {
                                    // Add the new method if it does not exist
                                    existingClass.body.body.push(method);
                                }
                            }
                        });
                        // Mark the current class for removal
                        node.remove = true;
                    } else {
                        // Add the class to the map
                        classMap.set(className, node);
                    }
                }
            }
        });
        // Remove duplicate classes
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.remove) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        return this.ast;
    }
    async cleanUpComments() {
        // iterate over the AST and remove adjacent duplicate leading comments
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.filter(comment => !comment.value.match(/... existing/i));
                }
            }
        });
        // if a comment includes "" remove the string "" (case insensitive)
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.map(comment => {
                        return {
                            type: comment.type,
                            value: comment.value.replace(/New method:/i, '')
                        };
                    });
                }
            }
        });
    }
    removeNodeFromParent(node, parent) {
        if (!parent)
            return null;
        if (Array.isArray(parent.body)) {
            parent.body = parent.body.filter(child => child !== node);
        }
        return null;
    }
    async makeAllClassesExported() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        await estraverse.replace(this.ast, {
            enter: (node, parent) => {
                // Check if the node is a class declaration
                if (node.type === 'ClassDeclaration') {
                    // If the parent is not already an export declaration, modify it
                    if (!parent || parent.type !== 'ExportNamedDeclaration') {
                        // Wrap in ExportNamedDeclaration only if not already exported
                        // copy the comments from the function to the export statement
                        const leadingComments = node.leadingComments;
                        const trailingComments = node.trailingComments;
                        node.leadingComments = [];
                        node.trailingComments = [];
                        return {
                            type: 'ExportNamedDeclaration',
                            declaration: node,
                            specifiers: [],
                            source: null,
                            leadingComments,
                            trailingComments
                        };
                    }
                }
                return node;
            }
        });
        await this.generateCode();
        return this.ast;
    }
    async makeAllFunctionsExported() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }

        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                // Check if the node is a FunctionDeclaration
                if (node.type === 'FunctionDeclaration') {
                    // Ensure the parent is the root Program node
                    if (parent && parent.type === 'Program') {
                        // If not already an ExportNamedDeclaration, wrap it
                        if (!parent.body.some(
                            (child) =>
                                child.type === 'ExportNamedDeclaration' &&
                                child.declaration === node
                        )) {
                            // Handle comments
                            const leadingComments = node.leadingComments || [];
                            const trailingComments = node.trailingComments || [];
                            node.leadingComments = [];
                            node.trailingComments = [];

                            return {
                                type: 'ExportNamedDeclaration',
                                declaration: node,
                                specifiers: [],
                                source: null,
                                leadingComments,
                                trailingComments,
                            };
                        }
                    }
                }
                return node;
            },
        });

        await this.generateCode();
        return this.ast;
    }

    async parse() {
        this.ast = {};
        this.ast = await esprima.parseScript(this.code, {
            tolerant: true,
            range: true,
            loc: true,
            attachComment: true,
            sourceType: 'module'
        });
        // remove trailing comments from the original code except for the last one under the particular node
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.trailingComments) {
                    node.trailingComments = [];
                }
            }
        });
        // iterate over the AST and remove adjacent duplicate leading comments
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });
        //debugLog(this.ast);
        return this.ast;
    }
    async generateCode() {
        //debugLog('Generating code', this.code);
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        //debugLog(this.ast)
        const newCode = await escodegen.generate(this.ast, {
            comment: true,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: true,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: true
            }
        });
        //debugLog(`this is the new code: ${newCode}`);
        //debugLog(this.ast);
        this.code = newCode;
        await this.parse();
        return this.code;
    }
}


async function debugLog(...args) {
    if (debug) {
        debugLog(...args);
    }
}</file>

<file fileName="src/mergeTools/languages/python/autoMerge.py">#                                  Apache License
#                            Version 2.0, January 2004
#                         http://www.apache.org/licenses/

#    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

#    1. Definitions.

#       "License" shall mean the terms and conditions for use, reproduction,
#       and distribution as defined by Sections 1 through 9 of this document.

#       "Licensor" shall mean the copyright owner or entity authorized by
#       the copyright owner that is granting the License.

#       "Legal Entity" shall mean the union of the acting entity and all
#       other entities that control, are controlled by, or are under common
#       control with that entity. For the purposes of this definition,
#       "control" means (i) the power, direct or indirect, to cause the
#       direction or management of such entity, whether by contract or
#       otherwise, or (ii) ownership of fifty percent (50%) or more of the
#       outstanding shares, or (iii) beneficial ownership of such entity.

#       "You" (or "Your") shall mean an individual or Legal Entity
#       exercising permissions granted by this License.

#       "Source" form shall mean the preferred form for making modifications,
#       including but not limited to software source code, documentation
#       source, and configuration files.

#       "Object" form shall mean any form resulting from mechanical
#       transformation or translation of a Source form, including but
#       not limited to compiled object code, generated documentation,
#       and conversions to other media types.

#       "Work" shall mean the work of authorship, whether in Source or
#       Object form, made available under the License, as indicated by a
#       copyright notice that is included in or attached to the work
#       (an example is provided in the Appendix below).

#       "Derivative Works" shall mean any work, whether in Source or Object
#       form, that is based on (or derived from) the Work and for which the
#       editorial revisions, annotations, elaborations, or other modifications
#       represent, as a whole, an original work of authorship. For the purposes
#       of this License, Derivative Works shall not include works that remain
#       separable from, or merely link (or bind by name) to the interfaces of,
#       the Work and Derivative Works thereof.

#       "Contribution" shall mean any work of authorship, including
#       the original version of the Work and any modifications or additions
#       to that Work or Derivative Works thereof, that is intentionally
#       submitted to Licensor for inclusion in the Work by the copyright owner
#       or by an individual or Legal Entity authorized to submit on behalf of
#       the copyright owner. For the purposes of this definition, "submitted"
#       means any form of electronic, verbal, or written communication sent
#       to the Licensor or its representatives, including but not limited to
#       communication on electronic mailing lists, source code control systems,
#       and issue tracking systems that are managed by, or on behalf of, the
#       Licensor for the purpose of discussing and improving the Work, but
#       excluding communication that is conspicuously marked or otherwise
#       designated in writing by the copyright owner as "Not a Contribution."

#       "Contributor" shall mean Licensor and any individual or Legal Entity
#       on behalf of whom a Contribution has been received by Licensor and
#       subsequently incorporated within the Work.

#    2. Grant of Copyright License. Subject to the terms and conditions of
#       this License, each Contributor hereby grants to You a perpetual,
#       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
#       copyright license to reproduce, prepare Derivative Works of,
#       publicly display, publicly perform, sublicense, and distribute the
#       Work and such Derivative Works in Source or Object form.

#    3. Grant of Patent License. Subject to the terms and conditions of
#       this License, each Contributor hereby grants to You a perpetual,
#       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
#       (except as stated in this section) patent license to make, have made,
#       use, offer to sell, sell, import, and otherwise transfer the Work,
#       where such license applies only to those patent claims licensable
#       by such Contributor that are necessarily infringed by their
#       Contribution(s) alone or by combination of their Contribution(s)
#       with the Work to which such Contribution(s) was submitted. If You
#       institute patent litigation against any entity (including a
#       cross-claim or counterclaim in a lawsuit) alleging that the Work
#       or a Contribution incorporated within the Work constitutes direct
#       or contributory patent infringement, then any patent licenses
#       granted to You under this License for that Work shall terminate
#       as of the date such litigation is filed.

#    4. Redistribution. You may reproduce and distribute copies of the
#       Work or Derivative Works thereof in any medium, with or without
#       modifications, and in Source or Object form, provided that You
#       meet the following conditions:

#       (a) You must give any other recipients of the Work or
#           Derivative Works a copy of this License; and

#       (b) You must cause any modified files to carry prominent notices
#           stating that You changed the files; and

#       (c) You must retain, in the Source form of any Derivative Works
#           that You distribute, all copyright, patent, trademark, and
#           attribution notices from the Source form of the Work,
#           excluding those notices that do not pertain to any part of
#           the Derivative Works; and

#       (d) If the Work includes a "NOTICE" text file as part of its
#           distribution, then any Derivative Works that You distribute must
#           include a readable copy of the attribution notices contained
#           within such NOTICE file, excluding those notices that do not
#           pertain to any part of the Derivative Works, in at least one
#           of the following places: within a NOTICE text file distributed
#           as part of the Derivative Works; within the Source form or
#           documentation, if provided along with the Derivative Works; or,
#           within a display generated by the Derivative Works, if and
#           wherever such third-party notices normally appear. The contents
#           of the NOTICE file are for informational purposes only and
#           do not modify the License. You may add Your own attribution
#           notices within Derivative Works that You distribute, alongside
#           or as an addendum to the NOTICE text from the Work, provided
#           that such additional attribution notices cannot be construed
#           as modifying the License.

#       You may add Your own copyright statement to Your modifications and
#       may provide additional or different license terms and conditions
#       for use, reproduction, or distribution of Your modifications, or
#       for any such Derivative Works as a whole, provided Your use,
#       reproduction, and distribution of the Work otherwise complies with
#       the conditions stated in this License.

#    5. Submission of Contributions. Unless You explicitly state otherwise,
#       any Contribution intentionally submitted for inclusion in the Work
#       by You to the Licensor shall be under the terms and conditions of
#       this License, without any additional terms or conditions.
#       Notwithstanding the above, nothing herein shall supersede or modify
#       the terms of any separate license agreement you may have executed
#       with Licensor regarding such Contributions.

#    6. Trademarks. This License does not grant permission to use the trade
#       names, trademarks, service marks, or product names of the Licensor,
#       except as required for reasonable and customary use in describing the
#       origin of the Work and reproducing the content of the NOTICE file.

#    7. Disclaimer of Warranty. Unless required by applicable law or
#       agreed to in writing, Licensor provides the Work (and each
#       Contributor provides its Contributions) on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
#       implied, including, without limitation, any warranties or conditions
#       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
#       PARTICULAR PURPOSE. You are solely responsible for determining the
#       appropriateness of using or redistributing the Work and assume any
#       risks associated with Your exercise of permissions under this License.

#    8. Limitation of Liability. In no event and under no legal theory,
#       whether in tort (including negligence), contract, or otherwise,
#       unless required by applicable law (such as deliberate and grossly
#       negligent acts) or agreed to in writing, shall any Contributor be
#       liable to You for damages, including any direct, indirect, special,
#       incidental, or consequential damages of any character arising as a
#       result of this License or out of the use or inability to use the
#       Work (including but not limited to damages for loss of goodwill,
#       work stoppage, computer failure or malfunction, or any and all
#       other commercial damages or losses), even if such Contributor
#       has been advised of the possibility of such damages.

#    9. Accepting Warranty or Additional Liability. While redistributing
#       the Work or Derivative Works thereof, You may choose to offer,
#       and charge a fee for, acceptance of support, warranty, indemnity,
#       or other liability obligations and/or rights consistent with this
#       License. However, in accepting such obligations, You may act only
#       on Your own behalf and on Your sole responsibility, not on behalf
#       of any other Contributor, and only if You agree to indemnify,
#       defend, and hold each Contributor harmless for any liability
#       incurred by, or claims asserted against, such Contributor by reason
#       of your accepting any such warranty or additional liability.

#    END OF TERMS AND CONDITIONS

#    APPENDIX: How to apply the Apache License to your work.

#       To apply the Apache License to your work, attach the following
#       boilerplate notice, with the fields enclosed by brackets "[]"
#       replaced with your own identifying information. (Don't include
#       the brackets!)  The text should be enclosed in the appropriate
#       comment syntax for the file format. We also recommend that a
#       file or class name and description of purpose be included on the
#       same "printed page" as the copyright notice for easier
#       identification within third-party archives.

#    Copyright [yyyy] [name of copyright owner]

#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at

#        http://www.apache.org/licenses/LICENSE-2.0

#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.




import ast

def merge(code: str, snippet: str) -> str:
    # Step 1: Parse the existing file
    try:
        existing_tree = ast.parse(code)
    except SyntaxError:
        raise SyntaxError("Invalid Python code in 'code'")

    # Step 2: Parse the snippet
    try:
        snippet_tree = ast.parse(snippet)
    except SyntaxError:
        raise SyntaxError("Invalid Python code in 'snippet'")

    # Step 3: Categorize nodes
    existing_body = existing_tree.body
    snippet_body = snippet_tree.body

    # Separate imports, classes, functions, and other global statements
    existing_imports = [node for node in existing_body if isinstance(node, (ast.Import, ast.ImportFrom))]
    existing_functions = [node for node in existing_body if isinstance(node, ast.FunctionDef)]
    existing_classes = [node for node in existing_body if isinstance(node, ast.ClassDef)]
    existing_others = [node for node in existing_body if node not in existing_imports + existing_functions + existing_classes]

    snippet_imports = [node for node in snippet_body if isinstance(node, (ast.Import, ast.ImportFrom))]
    snippet_functions = [node for node in snippet_body if isinstance(node, ast.FunctionDef)]
    snippet_classes = [node for node in snippet_body if isinstance(node, ast.ClassDef)]
    snippet_others = [node for node in snippet_body if node not in snippet_imports + snippet_functions + snippet_classes]

    # Merge imports: Add only unique imports
    merged_imports = {ast.dump(node): node for node in existing_imports + snippet_imports}.values()

    # Merge functions: Replace or add functions
    existing_functions_dict = {node.name: node for node in existing_functions}
    for snippet_function in snippet_functions:
        existing_functions_dict[snippet_function.name] = snippet_function
    merged_functions = list(existing_functions_dict.values())

    # Merge classes: Replace or add classes
    existing_classes_dict = {node.name: node for node in existing_classes}
    for snippet_class in snippet_classes:
        if snippet_class.name in existing_classes_dict:
            # Merge class methods
            existing_class = existing_classes_dict[snippet_class.name]
            existing_methods = {method.name: method for method in existing_class.body if isinstance(method, ast.FunctionDef)}
            for method in snippet_class.body:
                if isinstance(method, ast.FunctionDef):
                    existing_methods[method.name] = method
            existing_class.body = list(existing_methods.values())
        else:
            existing_classes_dict[snippet_class.name] = snippet_class
    merged_classes = list(existing_classes_dict.values())

    # Handle global code (others): Overwrite or replace entirely
    merged_others = snippet_others if snippet_others else existing_others

    # Combine everything back together
    new_body = list(merged_imports) + merged_classes + merged_functions + merged_others
    existing_tree.body = new_body

    # Step 4: Write back the modified code
    modified_code = ast.unparse(existing_tree)
    return modified_code</file>

<file fileName="src/mergeTools/languages/python/python.js"></file>

<file fileName="src/mergeTools/languages/rust/test.js">import Parser from 'tree-sitter';
import Rust from 'tree-sitter-rust';

class RustParser {
    constructor() {
        this.parser = new Parser();
        this.parser.setLanguage(Rust);
    }

    parseCode(code) {
        const tree = this.parser.parse(code);
        return tree;
    }

    regenerateCodeFromAST(node, code) {
        // Base case: If it's a leaf node, return the original source slice
        if (node.childCount === 0) {
            return code.slice(node.startIndex, node.endIndex);
        }

        console.log(node.type, node);

        // Preserve comments and whitespace
        const regenerated = [];
        let lastEndIndex = node.startIndex;

        node.children.forEach((child) => {
            // Add any interstitial whitespace or comments
            if (child.startIndex > lastEndIndex) {
                regenerated.push(code.slice(lastEndIndex, child.startIndex));
            }

            // Add the child node content
            regenerated.push(this.regenerateCodeFromAST(child, code));
            lastEndIndex = child.endIndex;
        });

        // Add any trailing whitespace or comments after the last child
        if (lastEndIndex < node.endIndex) {
            regenerated.push(code.slice(lastEndIndex, node.endIndex));
        }

        return regenerated.join('');
    }

    processCode(code) {
        const tree = this.parseCode(code);
        const rootNode = tree.rootNode;

        const regeneratedCode = this.regenerateCodeFromAST(rootNode, code);
        return regeneratedCode;
    }
}

// Sample Rust code with comments
const rustCode = `
// This is a sample Rust program
fn main() {
    // Print a message to the console
    println!("Hello, world!"); // Inline comment
}
`;







const rustParser = new RustParser();
const regeneratedCode = rustParser.processCode(rustCode);
//console.log("AST    ");
//console.log(JSON.stringify(rustParser.parseCode(rustCode).rootNode.children, null, 2));

console.log('Original Code:');
console.log(rustCode);

console.log('\nRegenerated Code:');
console.log(regeneratedCode);


// tree-sitter tree-sitter-rust</file>

<file fileName="src/mergeTools/mergeTool.js">import { javascriptManipulator } from "./languages/javascript/javascript.js";
import { cssManipulator } from "./languages/css/css.js";
import { readFile, writeFile } from "../fileIO.js";




export async function intelligentlyMergeSnippets(targetFile) {
    console.log(`Intelligently merging snippets for file: ${targetFile}`);
    const manipulator = await createManipulator(targetFile);
    await manipulator.mergeDuplicates();
    const theNewCodeWeGot = await manipulator.generateCode();
    await writeFile(targetFile, theNewCodeWeGot);
}
export async function applySnippets(targetFile, snippets) {
    console.log(`Applying snippets to file: ${targetFile}`);
    let cleanedSnippets = await snippets.join('\n\n\n\n\n', true);
    const manipulator = await createManipulator(targetFile);
    const returnValue = await manipulator.mergeCode(cleanedSnippets);
    await writeFile(targetFile, await manipulator.generateCode());
    return returnValue;
}



async function createManipulator(targetFile) {
    console.log(`Creating manipulator for file: ${targetFile}`);
    const extension = targetFile.split('.').pop();
    console.log(`Detected ${extension} file`);

    const originalCode = await readFile(targetFile);

    let manipulator;
    if (extension === 'js') {
        manipulator = new javascriptManipulator();
        await manipulator.setCode(originalCode);
        await manipulator.parse();
        return manipulator;
    }
    if (extension === 'css') {
        manipulator = new cssManipulator();
        await manipulator.setCode(originalCode);
        await manipulator.parse();
        return manipulator;
    }

    throw new Error('Unsupported file extension');

}</file>

<file fileName="src/prompts/customPrompts.json">[
  "Find the first class method that is incomplete or a stub. Implement it.",
  "Generate the classes and stub methods required to implement the plan. ",
  "Look for class methods that are referenced but not implemented. Add stubs for these missing methods. ",
  "Implement the first todo comment you find. ",
  "Actually write the code for that stub.",
  "Do not give me place holders. Give me actual code. ",
  "Are there any place holders or unimplemented portions of the classes?\nList each method as an individual numbered item in the list like this:\n##ACTION LIST\n1. className.methodName\n2. className.methodName",
  "fully write the next method in the list. ",
  "Generate JSdoc strings for all the methods that are missing JSdoc comments. \n\nDo not generate all the code. Give me just the method stubs with the jsdoc strings.",
  "Write the next method in this class. ",
  "That was not in the correct format. "
]</file>

<file fileName="src/summartyTool.js">import { pack } from "repomix";

function summaryTool() {
  const result =  pack({
    name: "summaryTool",
    version: "1.0.0",
    description: "A tool to summarize text",
    main: "index.js",
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1",
    },
    keywords: ["summary", "tool"],});


    console.log(result);
}

summaryTool();</file>

<file fileName="src/terminalHelpers.js">import { exec } from "child_process";
import path from 'path';
import { ctx } from './main.js';
import { wss } from './apiServer.js';
import { readSetting, writeSetting } from "./fileIO.js";


async function showHelp() {
  if (await readArg('-help') | await readArg('-h')) {
    console.log(`
Usage: a [options]
Options:
  -help:     Show this  help message

  -p [port]: Sets the http server port number. 
             Defaults to 3000

  -debug:    Print debug messages

  -editor:   Set the preferred editor (vscode, neovim, nano, vim)
             Default is vscode

  -setup:    Install Ollama LLM for local use and pull default models
  `);
    process.exit(0);
  }
}

showHelp();



export async function printDebugMessage(...message) {
  if (await readArg('-debug')) {
    //const stack = new Error().stack;
    await getCallerInfo();
    console.log(...message);
  }
}


function getCallerInfo(level = 3) {
  // Create an error object to capture the call stack
  const stack = new Error().stack;

  // Parse the stack trace to find the caller's file name and line number
  if (stack) {
    const stackLines = stack.split('\n');
    if (stackLines.length > level) {
      // Adjust for the desired level in the stack trace
      const callerInfo = stackLines[level].trim();

      // Extract the file name and line number using a regular expression
      const match = callerInfo.match(/\((.*):(\d+):\d+\)$/);
      if (match) {
        console.log(`Called from file: ${match[1]}, line: ${match[2]}`);
        return {
          fileName: match[1],
          lineNumber: parseInt(match[2], 10),
        };
      }
    }
  }

  console.log('Could not determine the caller\'s information');
  // Return null if the caller's information couldn't be determined
  return null;
}



export async function clearTerminal() {

  //return console.log("----------------------------------------------------------------------------");

  if (ctx.ws) {
    ctx.ws.send("clear");
  }

  // Clears the screen buffer entirely, including scrollback history
  await process.stdout.write('\u001b[3J\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer up to the current line
  await process.stdout.write('\u001b[2J\u001b[1J\u001b[H');
  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[J');

  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[0f');
  // Clears the screen buffer from the current line down to the bottom of the screen
  await process.stdout.write('\u001b[0J');

}



export async function printAndPause(message, secondsToPause = 0) {
  if (await readArg('-debug')) await getCallerInfo();
  wss.clients.forEach(client => {
    client.send(message + '\n');
  });

  console.log(message);
  if (secondsToPause === 0) {
    return;
  } else {
    return await new Promise(resolve => setTimeout(resolve, secondsToPause * 1000));
  }
}


export async function printToTerminal(message) {
  process.stdout.write(message); // Real-time printing to console
  // send via websocket
  wss.clients.forEach(client => {
    client.send(message);
  });
}



export async function launchEditor(filePath, lineNumber = null) {
  // load the default editor from the setting
  const editorToUse = await readSetting('preferredEditor.txt');
  printAndPause(`Opening ${filePath} to line ${lineNumber} with ${editorToUse}`);
  if (editorToUse === 'vscode') return launchVScode(filePath, lineNumber);
  if (editorToUse === 'neovim') return launchNeovim(filePath, lineNumber);
  if (editorToUse === 'nano') return launchNano(filePath, lineNumber);
  if (editorToUse === 'vim') return launchVim(filePath, lineNumber);
  return launchVScode(filePath, lineNumber);
}

async function setEditor() {
  if (readArg('-editor')) {
    console.log('Prefered editor is set to:', await readSetting('preferredEditor.txt'));
    console.log('Options are: vscode, neovim, nano, vim');
    if (readArg('-editor') === 'vscode') await writeSetting('preferredEditor.txt', 'vscode');
    if (readArg('-editor') === 'neovim') await writeSetting('preferredEditor.txt', 'neovim');
    if (readArg('-editor') === 'nano') await writeSetting('preferredEditor.txt', 'nano');
    if (readArg('-editor') === 'vim') await writeSetting('preferredEditor.txt', 'vim');
    process.exit(0);
  }
}
setEditor();


export function launchVScode(filePath, lineNumber = null) {
  console.log('launchNano', filePath, lineNumber);

  // convert file path to absolute path
  filePath = path.resolve(filePath);


  const stringCommand = `code -g ${filePath}:${lineNumber}:1`;
  console.log('stringCommand', stringCommand);
  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with VSCode:', error);
    }
  });
}


export function launchNeovim(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Neovim
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `nvim ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Neovim:', error);
    }
  });
}

// launch regular vim 
export function launchVim(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Neovim
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `vim ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Vim:', error);
    }
  });
}


export function launchNano(filePath, lineNumber = null) {
  // Convert file path to absolute path
  filePath = path.resolve(filePath);

  // Construct the command string for Nano
  const lineArgument = lineNumber ? `+${lineNumber}` : '';
  const stringCommand = `nano ${lineArgument} ${filePath}`;
  console.log('stringCommand', stringCommand);

  return exec(stringCommand, (error) => {
    if (error) {
      console.error('Error opening the file with Nano:', error);
    }
  });
}



export function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }

  // return true if the flag is found but no value is provided
  if (index !== -1) {
    return true
  }

  return null; // Return null if the flag or its value is not found
}</file>

<file fileName="tests/exampleFile.js">class exampleClass{
    exampleMethod(){
        console.log('do something else');
        return 'example';
    }
    
    exampleMethod2(){
        return 'example2';
    }

    exampleMethod3(){
        return 'example3';
    }
}





class exampleClass{
    exampleMethod(){
        console.log('do something else');
        return 'example';
    }
}

</file>


</fileContents>
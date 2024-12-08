import { ConfirmDialog } from "./confirmDialog.js";
import { doAjax } from "./doAjax.js";
import { MarkdownToHtml } from "./MarkdownToHtml.js";



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
            await doAjax('/setConversationTitle', { id: conversationId, title: this.conversationTitleInput.value });
            await this.loadConversationsList();
        });



        // add an input element that displays the target file path
        this.targetFileInput = document.createElement('input');
        this.targetFileInput.type = 'text';
        this.targetFileInput.style.width = '100%';


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
        this.conversationPicker.addEventListener('change', async () => {
            const selectedId = this.conversationPicker.value;
            if (selectedId) {
                await this.loadConversation(selectedId);
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
        this.autoApplyCheckbox.style.margin = '10px';
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
        this.promptsDialog.style.top = '50%';
        this.promptsDialog.style.bottom = '15%';
        this.promptsDialog.style.right = '15%';
        this.promptsDialog.style.left = '15%';
        


        this.promptsDialog.style.padding = '40px';
        this.promptsDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
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
        this.userInput.placeholder = "Tell me what you want, what you really really want...";
        this.container.appendChild(this.userInput);

        // add button to submit user input
        this.submitButton = document.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.submitButton.style.width = '100%';
        this.submitButton.style.marginBottom = '10px';
        this.submitButton.addEventListener('click', async () => {
            await this.addMessage(this.userInput.value);
            this.userInput.value = '';
            await this.callLLM();
        });
        this.container.appendChild(this.submitButton);

        this.setInput("");

        // Call loadConversation with the selected conversation ID if any
        //alert('this.conversationPicker.value: ' + this.conversationPicker.value);
        if (this.conversationPicker.value) {
            await this.loadConversation(this.conversationPicker.value);
        } else {
            // set the conversation picker to the first conversation
            this.conversationPicker.selectedIndex = 0;
            alert('this.conversationPicker.value: ' + this.conversationPicker.value);
            if (this.conversationPicker.value) {
                await this.loadConversation(this.conversationPicker.value);
            }
        }

        this.autoApplyMode = localStorage.getItem('autoApplyMode') === 'true';
        this.autoApplyCheckbox.checked = this.autoApplyMode;
        this.setInput("")
    }

    async setTargetFile(targetFile) {
        this.targetFileInput.value = targetFile;
    }

    async loadConversationsList() {
        const conversations = await doAjax('/getConversationsList', {});
        console.log('conversations', conversations);
        // format the conversations list
        // [
        //     {
        //         "id": "20241206_051509050Z",
        //         "title": "",
        //         "lastModified": "2024-12-06T05:15:09.050Z"
        //     },

        // ]

        // sort the conversations by lastModified
        conversations.sort((a, b) => {
            return new Date(b.lastModified) - new Date(a.lastModified);
        });

        // clear the conversation picker
        this.conversationPicker.innerHTML = '';

        // add an option for each conversation
        conversations.forEach((conversation) => {
            const option = document.createElement('option');
            option.value = conversation.id;
            option.textContent = conversation.title || conversation.id;
            this.conversationPicker.appendChild(option);
        });


    }

    async loadConversation(conversationId) {
        console.log('conversationId', conversationId);
        const response = await doAjax('/pullMessages', { id: conversationId });
        ctx.fileManager.currentFile = response.targetFile;
        this.setTargetFile(response.targetFile);
        this.conversationTitleInput.value = response.title;
        console.log('response.messages', response.messages);
        this.chatMessageDiv.innerHTML = '';
        response.messages.forEach(async (message) => {
            const individualMessageDiv = document.createElement('div');
            individualMessageDiv.style.border = '1px solid black';
            individualMessageDiv.style.padding = '10px';
            individualMessageDiv.style.marginBottom = '10px';

            if (message.role === 'user') {
                //slightly transparent blue
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
            const markdown = new MarkdownToHtml(contentDiv, message.content);
            individualMessageDiv.appendChild(contentDiv);

            if (this.chatMode === 'plan' && message.role === 'assistant') {
                const savePlanButton = document.createElement('button');
                savePlanButton.textContent = '💾 Replace plan'
                savePlanButton.style.cursor = 'pointer';
                savePlanButton.style.background = 'none';
                savePlanButton.style.border = '1px solid white';
                savePlanButton.style.color = 'white';
                savePlanButton.style.padding = '2px 5px';
                savePlanButton.style.borderRadius = '3px';
                savePlanButton.addEventListener('click', async () => {
                    await doAjax('/savePlan', { plan: message.content });

                });
                individualMessageDiv.appendChild(savePlanButton);


                // button to append to plan
                const appendPlanButton = document.createElement('button');
                appendPlanButton.textContent = '📝 Append to plan';
                appendPlanButton.style.cursor = 'pointer';
                appendPlanButton.style.background = 'none';
                appendPlanButton.style.border = '1px solid white';
                appendPlanButton.style.color = 'white';
                appendPlanButton.style.padding = '2px 5px';
                appendPlanButton.style.borderRadius = '3px';
                appendPlanButton.addEventListener('click', async () => {
                    await doAjax('/savePlan', { plan: message.content, append: true });

                });
                individualMessageDiv.appendChild(appendPlanButton);
            }


            if (message.role === 'user') {
                // make a button that adds the users prompt to the custom prompt list
                const addPromptButton = document.createElement('button');
                addPromptButton.textContent = '📝 Add to prompts'
                addPromptButton.style.cursor = 'pointer';
                addPromptButton.style.background = 'none';
                addPromptButton.style.border = '1px solid white';
                addPromptButton.style.color = 'white';

                addPromptButton.style.padding = '2px 5px';

                addPromptButton.style.borderRadius = '3px';
                addPromptButton.addEventListener('click', async () => {
                    //await doAjax('/storeCustomPrompts', { prompt: message.content });
                    const prompt = message.content;
                    // get the current list of prompts
                    const customPromptsJSON = await doAjax('/readFile', { targetFile: './.aiCoder/customPrompts.json' });
                    let customPrompts = JSON.parse(customPromptsJSON.fileContent);
                    if (!customPrompts) customPrompts = [];
                    console.log('prompts', customPrompts);
                    // check if the prompt is already in the list
                    if (!customPrompts.includes(prompt)) {
                        customPrompts.push(prompt);
                        await doAjax('/writeFile', {
                            targetFile: './.aiCoder/customPrompts.json',
                            fileContent: JSON.stringify(customPrompts),
                        });
                    }

                });

                individualMessageDiv.appendChild(addPromptButton);
            }

            this.chatMessageDiv.appendChild(individualMessageDiv);
            this.submitButton.scrollIntoView();


            // check if this is the last message
            if (response.messages.indexOf(message) === response.messages.length - 1) {

                console.log("We are at the last message. ");
                console.log(response.messages.indexOf(message), response.messages.length - 1);



                individualMessageDiv.scrollIntoView();
                //check if the last message is from the assistant
                if (message.role === 'assistant' && this.autoApplyMode) {
                    // check if the last message from the assistant has a code block
                    if (markdown.codeBlocks.length > 0) {
                        // for loop over the code blocks and apply them
                        for (const codeBlock of markdown.codeBlocks) {
                            const applyCodeBlock = await ConfirmDialog.confirm("Apply code block?", ctx.autoApplyTimeout, true);
                            if (applyCodeBlock) {
                                await doAjax('/applySnippet', { snippet: codeBlock, targetFile: this.targetFileInput.value });
                                ctx.tools.pullMethodsList();
                                // switch to tools
                                ctx.tabs.switchToTab('Tools');
                            }
                        }

                    }
                }
            }

        });

        this.addCodeToolbars();
    }


    async displayPremadePromptsList() {
        const customPromptsJSON = await doAjax('/readFile', { targetFile: './.aiCoder/customPrompts.json' });
        let customPrompts = JSON.parse(customPromptsJSON.fileContent);
        if (!customPrompts) customPrompts = [];
        console.log('prompts', customPrompts);
        // create a modal dialog that displays the list of prompts.
        // Make the dialog as an overlay that covers the whole screen.
        // Add a close button to the dialog.
        // display the list of prompts in a scrollable div.
        // clicking on a prompt should add it to the user input field.

        this.promptsDialog.showModal();

        this.promptsDialog.innerHTML = '';


        // loop over the prompts and add them to the dialog
        for (const prompt of customPrompts) {
            const promptDiv = document.createElement('div');
            promptDiv.textContent = prompt;
            promptDiv.style.padding = '10px';
            promptDiv.style.border = '1px solid black';
            promptDiv.style.backgroundColor = 'rgba(0, 100, 0, 0.7)';
            promptDiv.style.margin = '10px';
            promptDiv.style.cursor = 'pointer';
            promptDiv.addEventListener('click', () => {
                this.setInput(prompt);
                promptsDialog.close();
            });
            this.promptsDialog.appendChild(promptDiv);
        }

    }


    async setInput(newValue) {
        this.userInput.value = newValue;
        this.userInput.focus();
    }

    async addMessage(message) {
        const conversationId = this.conversationPicker.value;
        await doAjax('/addMessage', { id: conversationId, message });
        await this.loadConversation(conversationId); // Fix method call
    }

    async newChat(title = false) {
        const targetFile = this.targetFileInput.value;
        const response = await doAjax('/newChat', { targetFile, title });
        this.chatMode = 'chat';
        await this.loadConversationsList();
        this.conversationPicker.value = response.id;
        await this.loadConversation(response.id); // Fix method call
    }

    async newPlanChat(title = false) {
        const response = await doAjax('/newPlanChat', { title });
        await this.loadConversationsList();
        this.chatMode = 'plan';
        this.conversationPicker.value = response.id;
        await this.loadConversation(response.id); // Fix method call
    }

    async callLLM() {
        const conversationId = this.conversationPicker.value;
        await doAjax('/callLLM', { id: conversationId });
        await this.loadConversation(conversationId); // Fix method call
    }

    async addCodeToolbars() {
        // Query all <code> elements on the page

        let codeElements = [];
        // gather all elements that have the "language-javascript" class
        if (this.chatMode === 'plan') codeElements = await document.querySelectorAll('.language-markdown');

        if (this.chatMode === 'chat') codeElements = await document.querySelectorAll('.language-javascript');

        console.log('codeElements', codeElements);
        if (codeElements.length === 0) return;

        codeElements.forEach((codeElement) => {
            // Create a wrapper to hold the code and toolbar
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block'; // Preserve inline flow of <code> elements

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
                borderRadius: '3px',
            }

            console.log('this.chatMode', this.chatMode);
            console.log("should be making buttons");

            const copyButton = document.createElement('button');
            copyButton.textContent = '📋';
            copyButton.title = 'Copy code to clipboard';
            Object.assign(copyButton.style, buttonStyles);
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeElement.textContent);
                //alert('Code copied to clipboard!');
            });
            toolbar.appendChild(copyButton);

            if (this.chatMode === 'chat') {
                const editButton = document.createElement('button');
                editButton.textContent = '🤖✎⚡';
                editButton.title = 'Apply snippet';
                Object.assign(editButton.style, buttonStyles);
                editButton.addEventListener('click', async () => {
                    codeElement.style.color = 'red';
                    const codeString = codeElement.textContent;
                    await doAjax('/applySnippet', { snippet: codeString, targetFile: this.targetFileInput.value });
                    codeElement.style.color = 'cyan';
                    //editButton.disabled = true;
                    //editButton.style.display = "none";
                    // find the next button with the textContent of '🤖✎⚡' and 
                    // focus it. The button it focuses needs to be lower in the page than this one.
                    const nextButton = document.querySelector(`button[title="Apply snippet"]:not([disabled])`);
                    if (nextButton) nextButton.focus();
                    ctx.tools.pullMethodsList();
                });

                toolbar.appendChild(editButton);
            }

            // Wrap the <code> element with the wrapper
            const parent = codeElement.parentNode;
            parent.insertBefore(wrapper, codeElement);
            wrapper.appendChild(codeElement);

            // Append the toolbar to the wrapper
            wrapper.appendChild(toolbar);
        });
    }

}
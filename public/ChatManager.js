import { doAjax } from "./doAjax.js";
import { MarkdownToHtml } from "./MarkdownToHtml.js";



let ctx = {};

export class ChatManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.chatMode = 'chat';
        this.container = container;
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
        this.submitButton.addEventListener('click', () => {
            this.addMessage(this.userInput.value);
            this.userInput.value = '';
            this.callLLM();
        });
        this.container.appendChild(this.submitButton);


        this.pullMessages();
        this.setInput("")
    }


    async pullMessages() {
        console.log(await doAjax('/getChatMode'));
        this.chatMode = (await doAjax('/getChatMode')).chatMode
        const response = await doAjax('/pullMessages', {});
        this.chatMessageDiv.innerHTML = '';
        response.forEach(async (message) => {
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
            new MarkdownToHtml(contentDiv, message.content);
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
            }



            this.chatMessageDiv.appendChild(individualMessageDiv);
            this.submitButton.scrollIntoView();
        });

        this.addCodeToolbars();
    }

    async setInput(newValue) {
        this.userInput.value = newValue;
        this.userInput.focus();
    }

    async addMessage(message) {
        await doAjax('/addMessage', { message });
        await this.pullMessages();
    }

    async newChat() {
        await doAjax('/newChat', {});
        this.chatMode = 'chat';
        await this.pullMessages();

    }

    async newPlanChat() {
        await doAjax('/newPlanChat', {});
        this.chatMode = 'plan';
        await this.pullMessages();
    }

    async callLLM() {
        await doAjax('/callLLM', {});
        await this.pullMessages();
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
            toolbar.style.right = '0px';
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

            console.log('this.chatMode', this.chatMode);
            if (this.chatMode === 'chat') {
                const editButton = document.createElement('button');
                editButton.textContent = '🤖✎⚡';
                editButton.title = 'Apply snippet';
                Object.assign(editButton.style, buttonStyles);
                editButton.addEventListener('click', async () => {
                    codeElement.style.color = 'red';
                    const codeString = codeElement.textContent;
                    await doAjax('/applySnippet', { snippet: codeString });
                    codeElement.style.color = 'cyan';
                    editButton.disabled = true;
                    editButton.style.display = "none";
                });

                // Add buttons to the toolbar

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
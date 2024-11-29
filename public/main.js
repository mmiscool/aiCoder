import { tabInterface } from './tabInterface.js';
import { MarkdownToHtml } from './MarkdownToHtml.js';
import { LLMSettingsManager } from './LLMSettingsManager.js';
import { doAjax } from './doAjax.js';
import { ProjectSettingsManager } from './ProjectSettingsManager.js';

//async function llmSettingsDiv(container) {





async function setup() {
    const tabs = new tabInterface();
    const chatTab = tabs.createTab("Chat");
    const bla = new generateChatDiv(chatTab);

    const toolsTab = tabs.createTab("Tools");
    const tools = new toolsDiv(toolsTab);

    const projectSettings = tabs.createTab("Project Settings");
    new ProjectSettingsManager(projectSettings);

    const llmSettings = tabs.createTab("LLM Settings");
    new LLMSettingsManager(llmSettings);

    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";

    document.body.appendChild(tabs.getElement());
}


async function setDefaultLocalStorageKey(key, value) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, value);
    }
}

// call the setup function only after the DOM has loaded
document.addEventListener('DOMContentLoaded', setup);




class toolsDiv {
    constructor(container) {
        this.container = container;
        this.container.style.padding = '10px';
        this.container.style.border = '1px solid #ccc';
        this.container.style.flex = '1';
        this.container.style.flexDirection = 'column';
        this.container.style.overflow = 'auto';


        this.showToolBar();
    }

    async showToolBar() {
        this.container.innerHTML = '';
        const toolBar = document.createElement('div');
        toolBar.style.display = 'flex';
        toolBar.style.flexDirection = 'row';
        toolBar.style.justifyContent = 'space-between';
        toolBar.style.marginBottom = '10px';

        const pullMethodsListButton = document.createElement('button');
        pullMethodsListButton.textContent = 'Pull Methods List';
        pullMethodsListButton.addEventListener('click', () => {
            this.pullMethodsList();
        });
        toolBar.appendChild(pullMethodsListButton);

        const implementAllStubsButton = document.createElement('button');
        implementAllStubsButton.textContent = 'Implement All Stubs';
        implementAllStubsButton.addEventListener('click', async () => {
            await this.implementAllStubs();
        });
        toolBar.appendChild(implementAllStubsButton);

        this.container.appendChild(toolBar);
    }

    async pullMethodsList() {
        this.showToolBar();
        const listOfMethods = await doAjax('/pullMethodsList', {});

        // the response contains 
        for (const className in listOfMethods) {
            //console.log(className);
            const methods = listOfMethods[className];

            for (const { name, args, isStub } of methods) {
                const argList = args.join(', ');

                console.log(`${className}.${name}(${argList})`);

                const button = document.createElement('dim');
                button.textContent = `${className}.${name}(${argList})`;
                if (isStub) {
                    button.style.color = 'red';
                }
                else {
                    button.style.color = 'green';
                }
                button.addEventListener('click', async () => {
                    await this.implementSpecificClassMethod(className, name);
                });

                this.container.appendChild(button);
                this.container.appendChild(document.createElement('br'));
            }
        }
    }
}



class generateChatDiv {
    constructor(container) {
        this.container = container;
        this.newChatButton = document.createElement('button');
        this.newChatButton.textContent = 'New Chat';
        this.newChatButton.addEventListener('click', () => {
            this.newChat();
        });
        this.container.appendChild(this.newChatButton);

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
    }

    async pullMessages() {

        const response = await doAjax('/pullMessages', {});
        this.chatMessageDiv.innerHTML = '';
        response.forEach(async message => {
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

            this.chatMessageDiv.appendChild(individualMessageDiv);
            this.submitButton.scrollIntoView();
        });

        addCodeToolbars();
    }

    async addMessage(message) {
        await doAjax('/addMessage', { message });
        await this.pullMessages();
    }

    async newChat() {
        await doAjax('/newChat', {});
        await this.pullMessages();
    }

    async callLLM() {
        await doAjax('/callLLM', {});
        await this.pullMessages();
    }

}







function addCodeToolbars() {
    // Query all <code> elements on the page
    //const codeElements = document.querySelectorAll('code');
    // all elements that have the "language-javascript" class
    const codeElements = document.querySelectorAll('.language-javascript');

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

        // Example buttons for the toolbar
        const copyButton = document.createElement('button');
        copyButton.textContent = '📋';
        // tooltip
        copyButton.title = 'Copy code to clipboard';
        copyButton.style.cursor = 'pointer';
        copyButton.style.background = 'none';
        copyButton.style.border = '1px solid white';
        copyButton.style.color = 'white';
        copyButton.style.padding = '2px 5px';
        copyButton.style.borderRadius = '3px';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeElement.textContent);
            alert('Code copied to clipboard!');
        });

        const editButton = document.createElement('button');
        editButton.textContent = '🤖✎⚡';
        editButton.style.cursor = 'pointer';
        editButton.style.background = 'none';
        editButton.style.border = '1px solid white';
        editButton.style.color = 'white';
        editButton.style.padding = '2px 5px';
        editButton.style.borderRadius = '3px';
        editButton.addEventListener('click', async () => {
            codeElement.style.color = 'red';
            const codeString = codeElement.textContent;
            await doAjax('/applySnippet', { snippet: codeString });
            codeElement.style.color = 'cyan';
        });

        // Add buttons to the toolbar
        toolbar.appendChild(copyButton);
        toolbar.appendChild(editButton);

        // Wrap the <code> element with the wrapper
        const parent = codeElement.parentNode;
        parent.insertBefore(wrapper, codeElement);
        wrapper.appendChild(codeElement);

        // Append the toolbar to the wrapper
        wrapper.appendChild(toolbar);
    });
}

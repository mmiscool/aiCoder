import { doAjax } from "../../doAjax";

class CodeSnippet extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the main container with styles
        const container = document.createElement('div');
        Object.assign(container.style, {
            fontFamily: 'monospace',
            // dark gray as 
            backgroundColor: 'rgb(20, 20, 20)', // Dark mode
            color: 'yellow',
            padding: '5px',
            margin: '0px',
            borderRadius: '4px',
            boxSize: 'border-box',
        });



        // Create a preformatted text block
        const pre = document.createElement('pre');
        Object.assign(pre.style, {
            whiteSpace: 'pre-no-wrap',
            overflowY: 'auto',
        });
        pre.textContent = this.textContent;

        // Add preformatted text to the container
        container.appendChild(pre);

        // Create the button container
        const buttonContainer = this.createButtonContainer(this.innerText);

        // Append elements to the shadow DOM
        shadow.appendChild(buttonContainer);
        shadow.appendChild(container);
    }

    // Create button container with "Apply" and "Reject" buttons
    createButtonContainer(codeContent) {
        const buttonContainer = document.createElement('div');
        Object.assign(buttonContainer.style, {
            marginTop: '10px',
            display: 'flex',
            gap: '2px',
            marginBottom: '-30px',
        });

        const applyButton = this.createButton({
            text: '🤖✎⚡',
            bgColor: 'black',
            onClick: () => this.applySnippet(),
            toolTip: 'Apply the code snippet',
        });

        const copyButton = this.createButton({
            text: '📋',
            bgColor: 'black',
            onClick: () => this.copySnippet(codeContent),
            toolTip: 'Copy the code snippet',
        });

        buttonContainer.appendChild(applyButton);
        buttonContainer.appendChild(copyButton);

        // add an element to display the filename

        const fileNameElement = document.createElement('div');
        fileNameElement.textContent = `Filename: ${this.getAttribute('filename')}`;
        fileNameElement.style.padding = '5px';
        buttonContainer.appendChild(fileNameElement);
        return buttonContainer;
    }

    // Create a styled button
    createButton(inputObject) {
        const { text, bgColor, onClick, toolTip } = inputObject;
        const button = document.createElement('button');
        button.textContent = text;
        button.title = toolTip || '';
        Object.assign(button.style, {
            backgroundColor: bgColor,
            color: '#fff',
            border: '1px solid white',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
        });
        button.addEventListener('click', onClick);
        return button;
    }

    // "Apply" button handler
    async applySnippet() {

        const id = await this.find_conversationId();
        alert(`Applying code snippet to conversation: ${id}
            target file is this: ${this.getAttribute('filename')}
            `);


        const snippet = this.textContent;
        const targetFile = this.getAttribute('filename');
        await doAjax('applySnippet', { targetFile, snippet, id });


        //alert(`Applying code snippet: ${this.textContent}`);
    }

    async find_conversationId() {
        // find the conversation id
        // work up the tree until we find the conversation id
        let parent = this.parentElement;
        while (parent) {
            if (parent.getAttribute('conversationid')) {
                return parent.getAttribute('conversationid');
            }
            parent = parent.parentElement;
        }
    }


    copySnippet(code) {
        navigator.clipboard.writeText(code);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
        alert(`Attribute ${name} has changed.`);
    }
}

// Define the custom element
customElements.define('code-snippet-xml', CodeSnippet);

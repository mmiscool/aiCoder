import { doAjax } from "./doAjax.js";

let ctx;

export class toolsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
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

        const pullStubsListButton = document.createElement('button');
        pullStubsListButton.textContent = 'Pull Stubs List';
        pullStubsListButton.addEventListener('click', () => {
            this.pullMethodsList(true);
        });
        toolBar.appendChild(pullStubsListButton);

        const implementAllStubsButton = document.createElement('button');
        implementAllStubsButton.textContent = 'Implement All Stubs';
        implementAllStubsButton.addEventListener('click', async () => {
            await this.implementAllStubs();
        });
        toolBar.appendChild(implementAllStubsButton);

        this.container.appendChild(toolBar);
    }

    async pullMethodsList(showOnlyStubs = false) {
        this.showToolBar();
        const listOfMethods = await doAjax('/getMethodsList', {});
        // the response contains 
        for (const className in listOfMethods) {
            //console.log(className);
            const methods = listOfMethods[className];

            for (const { name, args, isStub, lineNumber } of methods) {
                if (showOnlyStubs && !isStub) continue;

                const argList = args.join(', ');

                console.log(`${className}.${name}(${argList})`);

                const methodItemElement = document.createElement('dim');
                // add class .hover-effect to
                methodItemElement.classList.add('hover-effect');

                methodItemElement.textContent = `${className}.${name}(${argList})`;
                if (isStub) {
                    methodItemElement.style.color = 'red';
                    methodItemElement.addEventListener('click', async () => {
                        await this.implementSpecificClassMethod(className, name, lineNumber);
                    });
                }
                else {
                    methodItemElement.style.color = 'green';
                    methodItemElement.addEventListener('click', async () => {
                        await this.addToChatPrompt(className, name, lineNumber);
                        console.log('this is the line number ', lineNumber);
                    });
                }

                this.container.appendChild(methodItemElement);
                this.container.appendChild(document.createElement('br'));
            }
        }
    }

    async implementSpecificClassMethod(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', { lineNumber });
        await ctx.chat.newChat();
        await ctx.chat.addMessage(`Write the ${methodName} method in the ${className} class.`);
        await ctx.chat.callLLM();
    }

    async addToChatPrompt(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', { lineNumber });
        await ctx.chat.newChat();
        await ctx.chat.setInput(`Modify the ${methodName} method in the ${className} class.\nImprove it.`);
    }
}

import { doAjax } from "./doAjax.js";

let ctx;

const buttonStyle = {
    display: 'block',
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
}



export class toolsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.container.style.padding = '5px';
        this.container.style.border = '1px solid #ccc';
        this.container.style.flex = '1';
        this.container.style.flexDirection = 'column';
        this.container.style.overflow = 'auto';


        this.showToolBar();
    }

    async showToolBar() {
        this.container.innerHTML = '';
        this.toolBar = document.createElement('div');
        this.toolBar.style.display = 'flex';
        this.toolBar.style.flexDirection = 'row';
        //toolBar.style.justifyContent = 'space-between';
        this.toolBar.style.margin = '0px';

        const pullMethodsListButton = await this.makeToolBarButton('Methods List', async () => {
            await this.pullMethodsList();
        });
        this.toolBar.appendChild(pullMethodsListButton);

        const pullStubsListButton = await this.makeToolBarButton('Stubs List', async () => {
            await this.pullMethodsList(true);
        });
        this.toolBar.appendChild(pullStubsListButton);

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
            await this.prependClassStructur();
        });
        this.toolBar.appendChild(prependClassStructureButton);



        this.container.appendChild(this.toolBar);
    }

    async implementAllStubs() {
        if (!await this.verifyTargetFileSpecified()) return;
        await doAjax('/implementAllStubs', { targetFile: ctx.fileManager.currentFile });
    }

    async mergeAndFormat() {
        if (!await this.verifyTargetFileSpecified()) return;
        await doAjax('/mergeAndFormat', { targetFile: ctx.fileManager.currentFile });
    }

    async makeToolBarButton(title, handler) {
        const button = document.createElement('button');
        button.textContent = title;
        Object.assign(button.style, buttonStyle);
        button.addEventListener('click', handler);
        this.toolBar.appendChild(button);
        return button;
    }

    async prependClassStructur() {
        if (!await this.verifyTargetFileSpecified()) return;
        await doAjax('/prependClassStructure', { targetFile: ctx.fileManager.currentFile });
    }

    async pullMethodsList(showOnlyStubs = false) {
        this.showToolBar();
        if (!await this.verifyTargetFileSpecified()) return;


        const listOfMethods = await doAjax('/getMethodsList', { targetFile: ctx.fileManager.currentFile });
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
                        await this.pullMethodsList(showOnlyStubs);
                    });
                }
                else {
                    methodItemElement.style.color = 'green';
                    methodItemElement.addEventListener('click', async () => {
                        await this.addToChatPrompt(className, name, lineNumber);
                        console.log('this is the line number ', lineNumber);
                        await this.pullMethodsList(showOnlyStubs);
                    });
                }

                this.container.appendChild(methodItemElement);
                this.container.appendChild(document.createElement('br'));
            }
        }
    }

    async implementSpecificClassMethod(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', { lineNumber, targetFile: ctx.fileManager.currentFile });
        await ctx.chat.newChat(`Implement ${methodName}.${className}`);
        await ctx.chat.addMessage(`Write the ${methodName} method in the ${className} class.`);
        await ctx.chat.callLLM();
    }

    async addToChatPrompt(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', { lineNumber, targetFile: ctx.fileManager.currentFile });
        await ctx.chat.newChat(`Modify ${methodName}.${className}`);
        await ctx.chat.setInput(`Modify the ${methodName} method in the ${className} class.\nImprove it.`);
    }

    async verifyTargetFileSpecified() {
        if (!ctx.fileManager.currentFile) {
            alert('Please select a file first');
            ctx.tabs.switchToTab('Files');
            return false;
        }
        return true;
    }
}
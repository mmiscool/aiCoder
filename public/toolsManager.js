
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
        this.showToolBar();
    }
    async showToolBar() {
        this.container.innerHTML = '';
        this.toolBar = document.createElement('div');
        this.toolBar.style.display = 'flex';
        this.toolBar.style.flexDirection = 'row';
        // toolBar.style.justifyContent = 'space-between';
        this.toolBar.style.margin = '0px';
        const pullMethodsListButton = await this.makeToolBarButton('Methods List', async () => {
            await this.pullMethodsList();
        });
        this.toolBar.appendChild(pullMethodsListButton);
        const pullStubsListButton = await this.makeToolBarButton('Stubs List', async () => {
            await this.pullMethodsList(true);
        });
        this.toolBar.appendChild(pullStubsListButton);
        const pullFunctionListButton = await this.makeToolBarButton('Function List', async () => {
            await this.pullFunctionList();
        });
        this.toolBar.appendChild(pullFunctionListButton);
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
    }
    async implementAllStubs() {
        if (!await this.verifyTargetFileSpecified())
            return;
        this.showToolBar();
        await doAjax('/implementAllStubs', { targetFile: ctx.targetFile });
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
        await doAjax('/applySnippet', {
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
        await doAjax('/prependClassStructure', { targetFile: ctx.targetFile });
    }
    async pullMethodsList(showOnlyStubs = false) {
        this.showToolBar();
        if (!await this.verifyTargetFileSpecified())
            return;
        const listOfMethods = await doAjax('/getMethodsList', { targetFile: ctx.targetFile });
        console.log(listOfMethods);
        // the response contains
        for (const className in listOfMethods) {
            // console.log(className);
            const methods = listOfMethods[className];
            for (const {name, args, isStub, lineNumber} of methods) {
                if (showOnlyStubs && !isStub)
                    continue;
                const argList = args.join(', ');
                console.log(`${ className }.${ name }(${ argList })`);
                const methodItemElement = document.createElement('dim');
                // add class .hover-effect to
                methodItemElement.classList.add('hover-effect');
                methodItemElement.textContent = `${ className }.${ name }(${ argList })`;
                if (isStub) {
                    methodItemElement.style.color = 'red';
                    methodItemElement.addEventListener('click', async () => {
                        await this.implementSpecificClassMethod(className, name, lineNumber);
                        await this.pullMethodsList(showOnlyStubs);
                    });
                } else {
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
    async pullFunctionList(showOnlyStubs = false) {
        // this calls the getFunctionList endpoint and displays the list of functions in the container
        // similar to pullMethodsList, but for functions
        this.showToolBar();
        if (!await this.verifyTargetFileSpecified())
            return;
        const listOfFunctions = await doAjax('/getFunctionList', { targetFile: ctx.targetFile });
        console.log(listOfFunctions);
        /* format of the response
            {
                "test": {
                    "functionName": "test",
                    "args": [],
                    "isStub": true,
                    "lineNumber": 1131
                },
                "test2": {
                    "functionName": "test2",
                    "args": [],
                    "isStub": true,
                    "lineNumber": 1135
                }
            }*/
        for (const key in listOfFunctions) {
            console.log(key);
            // Logs the key (function name) from the response
            const {functionName, args, isStub, lineNumber} = listOfFunctions[key];
            const argList = args.join(', ');
            console.log(`${ functionName }(${ argList })`);
            const functionItemElement = document.createElement('dim');
            // add class .hover-effect to
            functionItemElement.classList.add('hover-effect');
            functionItemElement.textContent = `${ functionName }(${ argList })`;
            if (isStub) {
                functionItemElement.style.color = 'red';
                functionItemElement.addEventListener('click', async () => {
                    await this.implementSpecificFunction(functionName, lineNumber);
                    await this.pullFunctionList(showOnlyStubs);
                });
            } else {
                functionItemElement.style.color = 'green';
                functionItemElement.addEventListener('click', async () => {
                    await this.addFunctionToChatPrompt(functionName, lineNumber);
                    console.log('this is the line number ', lineNumber);
                    await this.pullFunctionList(showOnlyStubs);
                });
            }
            this.container.appendChild(functionItemElement);
            this.container.appendChild(document.createElement('br'));
        }
    }
    async implementSpecificClassMethod(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Implement ${ methodName }.${ className }`);
        await ctx.chat.addMessage(`Write the ${ methodName } method in the ${ className } class.`);
        await ctx.chat.callLLM();
    }
    async addToChatPrompt(className, methodName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Modify ${ methodName }.${ className }`);
        await ctx.chat.setInput(`Modify the ${ methodName } method in the ${ className } class.\nImprove it.`);
    }
    async implementSpecificFunction(functionName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Implement ${ functionName }`);
        await ctx.chat.addMessage(`Write the ${ functionName } function.`);
        await ctx.chat.callLLM();
    }
    async addFunctionToChatPrompt(functionName, lineNumber) {
        ctx.tabs.switchToTab('Chat');
        await doAjax('/gotoLineNumber', {
            lineNumber,
            targetFile: ctx.targetFile
        });
        await ctx.chat.newChat(`Modify ${ functionName }`);
        await ctx.chat.setInput(`Modify the ${ functionName } function.\nImprove it.`);
    }
    async verifyTargetFileSpecified() {
        if (!ctx.targetFile) {
            alert('Please select a file first');
            ctx.tabs.switchToTab('Files');
            return false;
        }
        return true;
    }
}

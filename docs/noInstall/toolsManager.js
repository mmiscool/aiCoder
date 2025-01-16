
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
}
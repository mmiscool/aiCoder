import { doAjax } from "./doAjax.js";

export class toolsManager {
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

import { doAjax } from './doAjax.js';

let ctx = {};

export class FileManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.filesListDiv = null;
        this.filesList = null;
        this.currentFile = null;
        this.init();
    }

    async init() {
        this.container.innerHTML = '';
        this.addRefreshButton();
        this.filesList = await this.fetchFilesList();
        this.createFilesListDiv();
    }

    async addRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '🔄';
        refreshButton.title = 'Refresh file list';
        refreshButton.style.padding = '10px';
        refreshButton.style.margin = '10px';
        refreshButton.style.backgroundColor = 'blue';
        refreshButton.addEventListener('click', () => this.refresh());
        this.container.appendChild(refreshButton);
    }

    async refresh() {
        await this.init();
    }

    async fetchFilesList() {
        const response = await doAjax('/getFilesList', {});
        return response.files || [];
    }

    createFilesListDiv() {
        this.filesListDiv = document.createElement('div');
        this.filesListDiv.style.padding = '10px';
        this.filesListDiv.style.border = '1px solid #ccc';
        this.filesListDiv.style.flex = '1';
        this.filesListDiv.style.flexDirection = 'column';
        this.filesListDiv.style.overflow = 'auto';

        // Populate the files list
        this.populateFilesList(this.filesList, this.filesListDiv);

        this.container.appendChild(this.filesListDiv);
    }

    populateFilesList(files, parentDiv) {
        if (!Array.isArray(files)) return;

        files.forEach(file => {
            const fileDiv = document.createElement('div');
            fileDiv.textContent = file;
            fileDiv.style.marginBottom = '5px';
            fileDiv.style.padding = '5px';
            fileDiv.style.border = '1px solid #ddd';
            parentDiv.appendChild(fileDiv);

            fileDiv.addEventListener('click', async () => {
                ctx.chat.setTargetFile(file);
                this.currentFile = file;
                ctx.tabs.switchToTab('Chat');
            });

        });
    }
}

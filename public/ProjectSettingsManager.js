import { doAjax } from './doAjax.js';

export class ProjectSettingsManager {
    constructor(container) {
        this.container = container;
        this.promptsDiv = null;
        this.systemPrompts = null;
        this.init();
    }

    async init() {
        this.container.innerHTML = '';
        this.addSaveButton();
        this.addRefreshButton();
        this.systemPrompts = await this.fetchPrompts();
        this.createPromptsDiv();
        
    }

    async addRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '🔄';
        refreshButton.title = 'Refresh settings';
        refreshButton.style.padding = '10px';
        refreshButton.style.margin = '10px';
        refreshButton.style.backgroundColor = 'blue';
        refreshButton.addEventListener('click', () => this.refresh());
        this.container.appendChild(refreshButton);
    }

    async refresh() {
        this.init();
    }

    async fetchPrompts() {
        return await doAjax('/getSystemPrompts', {});
    }

    createPromptsDiv() {
        this.promptsDiv = document.createElement('div');
        this.promptsDiv.style.padding = '10px';
        this.promptsDiv.style.border = '1px solid #ccc';
        this.promptsDiv.style.flex = '1';
        this.promptsDiv.style.flexDirection = 'column';
        this.promptsDiv.style.overflow = 'auto';

        // Create an editable div for each field in the systemPrompts object
        for (const field in this.systemPrompts) {
            this.createFieldConfig(field, this.systemPrompts[field]);
        }

        this.container.appendChild(this.promptsDiv);
    }

    createFieldConfig(field, value) {
        const fieldDiv = document.createElement('div');
        fieldDiv.style.marginBottom = '10px';
        fieldDiv.style.border = '1px solid #ccc';
        fieldDiv.style.padding = '10px';

        // Create a label for the field
        const fieldLabel = this.createLabel(field);
        fieldDiv.appendChild(fieldLabel);

        // Create an editable div for the field value
        const editableDiv = this.createEditableDiv(value);
        editableDiv.setAttribute('data-field', field); // Tagging the div with its field name
        fieldDiv.appendChild(editableDiv);

        this.promptsDiv.appendChild(fieldDiv);
    }

    createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        label.style.display = 'block';
        label.style.marginBottom = '5px';
        return label;
    }

    createEditableDiv(content) {
        const editableDiv = document.createElement('div');
        editableDiv.style.width = '100%';
        editableDiv.style.marginBottom = '10px';
        editableDiv.style.border = '1px solid #ddd';
        editableDiv.style.padding = '8px';
        editableDiv.style.overflowY = 'auto';
        editableDiv.style.backgroundColor = 'black';
        // contents is preformatted text
        editableDiv.style.whiteSpace = 'pre-wrap';
        editableDiv.contentEditable = true; // Makes the div editable
        editableDiv.textContent = content;
        return editableDiv;
    }

    addSaveButton() {
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾';
        saveButton.title = 'Save changes';
        saveButton.style.padding = '10px';
        saveButton.style.margin = '10px';
        saveButton.style.backgroundColor = 'green';
        
        //saveButton.style.backgroundColor = 'blue';
        saveButton.addEventListener('click', () => this.savePrompts());
        this.container.appendChild(saveButton);
    }

    async savePrompts() {
        const updatedPrompts = {};

        // Gather updated values from editable divs
        for (const fieldDiv of this.promptsDiv.children) {
            const editableDiv = fieldDiv.querySelector('div[contenteditable]');
            if (editableDiv) {
                const field = editableDiv.getAttribute('data-field');
                const value = editableDiv.textContent.trim(); // Retrieve the edited content
                updatedPrompts[field] = value;
            }
        }

        console.log(updatedPrompts); // Log the updated data for debugging
        await doAjax('/updateSystemPrompts', updatedPrompts); // Send updated prompts back to the server
    
        await this.init(); // Reinitialize the settings manager
    }
}

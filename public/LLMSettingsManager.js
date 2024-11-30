import { doAjax } from './doAjax.js';

export class LLMSettingsManager {
    constructor(container) {
        this.container = container;
        this.settingsDiv = null;
        this.llmSettings = null;
        this.init();
    }

    async init() {
        this.container.innerHTML = '';
        this.addSaveButton();
        this.addRefreshButton();
        this.llmSettings = await this.fetchSettings();
        this.createSettingsDiv();
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

    async fetchSettings() {
        return await doAjax('/llmSettings', {});
    }

    createSettingsDiv() {
        this.settingsDiv = document.createElement('div');
        this.settingsDiv.style.padding = '10px';
        this.settingsDiv.style.border = '1px solid #ccc';
        this.settingsDiv.style.flex = '1';
        this.settingsDiv.style.flexDirection = 'column';
        this.settingsDiv.style.overflow = 'auto';

        for (const llm in this.llmSettings) {
            this.createLLMConfig(llm, this.llmSettings[llm]);
        }

        this.container.appendChild(this.settingsDiv);
    }

    createLLMConfig(llm, settings) {
        console.log(llm, settings);
        const llmDiv = document.createElement('div');
        llmDiv.style.marginBottom = '10px';
        llmDiv.style.border = '1px solid #ccc';
        llmDiv.style.padding = '10px';

        const llmTitle = document.createElement('h2');
        llmTitle.textContent = llm;
        llmDiv.appendChild(llmTitle);

        llmDiv.appendChild(this.createLabel('Model:'));
        const modelSelect = this.createModelSelect(settings.models, settings.model);
        llmDiv.appendChild(modelSelect);

        llmDiv.appendChild(this.createLabel('API Key:'));
        const apiKeyInput = this.createApiKeyInput(settings.apiKey);
        llmDiv.appendChild(apiKeyInput);

        llmDiv.appendChild(this.createLabel('Active:'));
        const activeCheckbox = this.createActiveCheckbox(settings.active);
        activeCheckbox.addEventListener('click', () => this.handleActiveToggle(activeCheckbox));
        llmDiv.appendChild(activeCheckbox);

        this.settingsDiv.appendChild(llmDiv);
    }

    createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        return label;
    }

    createModelSelect(models, selectedModel) {
        const modelSelect = document.createElement('select');
        modelSelect.style.width = '100%';
        modelSelect.style.marginBottom = '10px';

        for (const model of models) {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        }

        modelSelect.value = selectedModel;
        return modelSelect;
    }

    createApiKeyInput(apiKey) {
        const input = document.createElement('input');
        input.type = 'password';
        input.style.width = '100%';
        input.style.marginBottom = '10px';
        input.value = apiKey;
        return input;
    }

    createActiveCheckbox(isActive) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isActive;
        return checkbox;
    }

    handleActiveToggle(activeCheckbox) {
        if (activeCheckbox.checked) {
            for (const llmDiv of this.settingsDiv.children) {
                llmDiv.querySelector('input[type="checkbox"]').checked = false;
            }
            activeCheckbox.checked = true;
        }
    }

    addSaveButton() {
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾';
        saveButton.title = 'Save Settings';
        saveButton.style.padding = '10px';
        saveButton.style.margin = '10px';
        saveButton.style.backgroundColor = 'green';

        saveButton.addEventListener('click', () => this.saveSettings());
        this.container.appendChild(saveButton);
    }

    async saveSettings() {
        const newSettings = {};
        const activeModels = [];

        for (const llmDiv of this.settingsDiv.children) {
            const llm = llmDiv.querySelector('h2').textContent;
            const model = llmDiv.querySelector('select').value;
            const apiKey = llmDiv.querySelector('input[type="password"]').value;
            const active = llmDiv.querySelector('input[type="checkbox"]').checked;

            if (active) activeModels.push(llm);

            newSettings[llm] = { model, apiKey, active };
        }

        if (activeModels.length > 1) {
            alert('Only one model can be active at a time');
            return;
        }

        console.log(newSettings);
        await doAjax('/llmSettingsUpdate', newSettings);

        await this.init();
    }
}

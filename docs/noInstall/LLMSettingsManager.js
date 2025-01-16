import { doAjax } from './doAjax.js';

let ctx = {};

export class LLMSettingsManager {
    constructor(container, app_ctx) {
        ctx = app_ctx;
        this.container = container;
        this.settingsDiv = null;
        this.llmSettings = null;
        this.init();
    }

    async init() {
        this.container.innerHTML = '';
        this.addRefreshButton();
        this.llmSettings = await this.fetchSettings();
        console.log(this.llmSettings);
        this.createSettingsDiv();
        // check if there is an active LLM
        const activeLLM = await this.getActiveLLM();
        // if no LLMS are active swap to this tab
        if (!activeLLM) {
            await ctx.tabs.disableAllTabs();
            await ctx.tabs.enableTab('LLM Settings');
            
            // add an element to the top of the container to notify the user
            const notification = document.createElement('div');
            notification.textContent = 'You must select an active LLM and model';
            notification.style.backgroundColor = 'red';
            notification.style.color = 'white';
            notification.style.padding = '10px';
            notification.style.margin = '10px';
            this.container.insertBefore(notification, this.settingsDiv);
            
        }else{
            ctx.tabs.enableAllTabs();
        }
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
        return await doAjax('./llmSettings', {});
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
        modelSelect.onchange = () => this.saveSettings();
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
        input.onchange = () => this.saveSettings();
        input.type = 'password';
        input.style.width = '100%';
        input.style.marginBottom = '10px';
        input.value = apiKey;
        return input;
    }

    createActiveCheckbox(isActive) {
        const checkbox = document.createElement('input');
        checkbox.onchange = () => this.saveSettings();
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

    async getActiveLLM() {
        for (const llmDiv of this.settingsDiv.children) {
            if (llmDiv.querySelector('input[type="checkbox"]').checked) {
                return llmDiv.querySelector('h2').textContent;
            }
        }
        return null;
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
            await alert('Only one model can be active at a time');
            return;
        }

        console.log(newSettings);
        await doAjax('./llmSettingsUpdate', newSettings);

        await this.init();
    }
}

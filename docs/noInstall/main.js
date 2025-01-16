import { fileSystem } from './fs/fileSystem.js';
import { tabInterface } from './tabInterface.js';
import { LLMSettingsManager } from './LLMSettingsManager.js';
import { ProjectSettingsManager } from './ProjectSettingsManager.js';
import { ChatManager } from './ChatManager.js';
import { toolsManager } from './toolsManager.js';
import './confirmDialog.js';

let ctx = {};

let doAjax;

async function setup() {
    await fileSystem.start();

    const { fakeDoAjax } = await import("./fakeBackend/aiCoderApiFunctions.js")
    doAjax = fakeDoAjax;

    // Extract the hash from the URL
    const hashText = window.location.hash;
    let extractedText = await hashText.startsWith('#') ? hashText.substring(1) : hashText;
    // turn the extracted text back in to plain text
    extractedText = await decodeURIComponent(extractedText);
    //alert(extractedText);

    ctx.autoApplyTimeout = 10;
    const tabs = new tabInterface();
    ctx.tabs = tabs;
    const chatTab = tabs.createTab("Chat", "💬");
    ctx.chat = new ChatManager(chatTab, ctx);

    const toolsTab = tabs.createTab("Tools", "🛠️");
    ctx.tools = new toolsManager(toolsTab, ctx);

    const projectSettings = tabs.createTab("Project Settings", "⚙️");
    ctx.projectSettings = new ProjectSettingsManager(projectSettings, ctx);

    const llmSettingsTab = tabs.createTab("LLM Settings", "🧠");
    ctx.llmSettings = new LLMSettingsManager(llmSettingsTab, ctx);


    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";

    document.body.appendChild(tabs.getElement());
    window.ctx = ctx;



    // Remove the leading '#' if it exists

    tabs.switchToTab(extractedText);

}


async function setDefaultLocalStorageKey(key, value) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, value);
    }
}

// call the setup function only after the DOM has loaded
document.addEventListener('DOMContentLoaded', setup);





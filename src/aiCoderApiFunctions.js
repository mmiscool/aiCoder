import { applySnippets } from "./aiAssistedCodeChanges.js";
import { getMethodsWithArguments } from "./classListing.js";
import { readFile, readOrLoadFromDefault, writeFile } from "./fileIO.js";
import { conversation, llmSettings, llmSettingsUpdate } from "./llmCall.js";
import { ctx } from "./main.js";


let webUIConversation = new conversation();
readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md');
readOrLoadFromDefault('./.aiCoder/default-plan-prompt.md', '/prompts/default-plan-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md');
readOrLoadFromDefault('./.aiCoder/snippet-validation-prompt.md', '/prompts/snippet-validation-prompt.md');




export class aiCoderApiFunctions {
    async addMessage(parsedBody) {
        console.log('addMessage', parsedBody.message);
        // Assuming `webUIConversation.addMessage` exists
        await webUIConversation.addMessage("user", parsedBody.message);
        return { success: true };

    }
    
    async pullMessages() {
        const response = await webUIConversation.getMessages();
        return response;
    }

    async newChat() {
        webUIConversation = new conversation();
        webUIConversation.addFileMessage("system", './.aiCoder/default-system-prompt.md');
        webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md');
        webUIConversation.addFileMessage("user", ctx.targetFile, "// Code file to be edited");
        webUIConversation.addFileMessage("system", './.aiCoder/snippet-production-prompt.md');
        return webUIConversation.getMessages();
    }

    async newPlanChat() {
        webUIConversation = new conversation();
        webUIConversation.addFileMessage("system", './.aiCoder/default-system-prompt.md');
        webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md', "Plan to be edited:");
        return webUIConversation.getMessages();
    }

    async callLLM() {
        console.log('callLLM');
        await webUIConversation.callLLM();
        const response = await webUIConversation.getMessages();
        return response;
    }

    async applySnippet(parsedBody) {
        await applySnippets([parsedBody.snippet], true);
        return { success: true };
    }

    async pullMethodsList() {
        const response = await getMethodsWithArguments(await readFile(ctx.targetFile));
        return response;
    }

    async llmSettings(parsedBody) {
        return await llmSettings();
    }

    async llmSettingsUpdate(parsedBody) {
        return await llmSettingsUpdate(parsedBody);
    }

    async getSystemPrompts() {
        return {
            default_plan_prompt: await readOrLoadFromDefault('./.aiCoder/default-plan-prompt.md', '/prompts/default-plan-prompt.md'),
            default_system_prompt: await readOrLoadFromDefault('./.aiCoder/default-system-prompt.md', '/prompts/default-system-prompt.md'),
            snippet_production_prompt: await readOrLoadFromDefault('./.aiCoder/snippet-production-prompt.md', '/prompts/snippet-production-prompt.md'),
        };
    }

    async updateSystemPrompts(parsedBody) {
        await writeFile('./.aiCoder/default-system-prompt.md', parsedBody.default_system_prompt);
        await writeFile('./.aiCoder/snippet-production-prompt.md', parsedBody.snippet_production_prompt);
        return { success: true };
    }
}


import { applySnippets } from "./aiAssistedCodeChanges.js";
import { getMethodsWithArguments } from "./classListing.js";
import { appendFile, getAllFiles, readFile, readOrLoadFromDefault, writeFile } from "./fileIO.js";
import { conversation, llmSettings, llmSettingsUpdate } from "./llmCall.js";
import { ctx } from "./main.js";
import { launchNano, printAndPause } from "./terminalHelpers.js";


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

    async getChatMode() {
        if (this.chatMode == undefined) this.chatMode = 'chat';
        return { chatMode: this.chatMode };
    }

    async newChat() {
        this.chatMode = 'chat';
        webUIConversation = new conversation();
        webUIConversation.addFileMessage("system", './.aiCoder/default-system-prompt.md');
        webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md');
        webUIConversation.addFileMessage("user", ctx.targetFile, "// Code file to be edited");
        webUIConversation.addFileMessage("system", './.aiCoder/snippet-production-prompt.md');
        return webUIConversation.getMessages();
    }

    async newPlanChat() {
        this.chatMode = 'plan';
        webUIConversation = new conversation();
        webUIConversation.addMessage("system", `
You are an AI coding tool. You are working on the requirements and plan for a code project.

You will will not be writing code directly, but you will be creating a structured markdown file that will be used to generate code.

Your response will be a markdown file that will be used to generate code. It must be complete and correct.
Never actually write code. Only write the plan for the code.

You will not change the plan title if it already has one. 
Do not be lazy. Give me the complete plan as part of your response.
`);
        webUIConversation.addFileMessage("user", './.aiCoder/default-plan-prompt.md', "Plan to be edited:");
        return webUIConversation.getMessages();
    }

    async callLLM() {
        printAndPause('callLLM');
        await webUIConversation.callLLM();
        const response = await webUIConversation.getMessages();
        return response;
    }

    async applySnippet(parsedBody) {
        await applySnippets([parsedBody.snippet], true);
        return { success: true };
    }

    async getMethodsList() {
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
        await writeFile('./.aiCoder/default-plan-prompt.md', parsedBody.default_plan_prompt);
        await writeFile('./.aiCoder/default-system-prompt.md', parsedBody.default_system_prompt);
        await writeFile('./.aiCoder/snippet-production-prompt.md', parsedBody.snippet_production_prompt);
        return { success: true };
    }

    async savePlan(parsedBody) {
        if (parsedBody.append) {
            await appendFile('./.aiCoder/default-plan-prompt.md', parsedBody.plan, true);
        } else {
            await writeFile('./.aiCoder/default-plan-prompt.md', parsedBody.plan);
        }

        return { success: true };
    }

    async gotoLineNumber(parsedBody) {
        await launchNano(ctx.targetFile, parsedBody.lineNumber);
        return { success: true };
    }

    async setTargetFile(parsedBody) {
        ctx.targetFile = parsedBody.targetFile;
        return { success: true };
    }

    async getTargetFile() {
        return { targetFile: ctx.targetFile };
    }

    async getFilesList() {
        return { files: await getAllFiles("./") };
    }
}


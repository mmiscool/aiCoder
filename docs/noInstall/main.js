import { conversation } from "../onlineVersion/llmCall.js";








const newConversation = new conversation();
newConversation.addMessage("user", "Hello");
newConversation.callLLM();



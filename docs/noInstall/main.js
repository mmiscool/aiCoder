import { conversation } from "./conversation";








const newConversation = new conversation();
newConversation.addMessage("user", "Hello");
newConversation.callLLM();



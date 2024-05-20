import { Conversation } from "../conversation/Conversation";
export declare class ChatModel {
  conversations: Array<Conversation>;
  selectedConversationId: string | undefined;
  addAndSelectConversation(conversation: Conversation): void;
  getConversationById(id: string): Conversation | undefined;
  deleteConversation(id: string): void;
}

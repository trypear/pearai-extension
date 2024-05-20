import { AIClient } from "../ai/AIClient";
import { ConversationType } from "../conversation/ConversationType";
import { DiffEditorManager } from "../diff/DiffEditorManager";
import { ChatModel } from "./ChatModel";
import { ChatPanel } from "./ChatPanel";
export declare class ChatController {
  private readonly chatPanel;
  private readonly chatModel;
  private readonly ai;
  private readonly getConversationType;
  private readonly diffEditorManager;
  private readonly basicChatTemplateId;
  private readonly generateConversationId;
  constructor({
    chatPanel,
    chatModel,
    ai,
    getConversationType,
    diffEditorManager,
    basicChatTemplateId,
  }: {
    chatPanel: ChatPanel;
    chatModel: ChatModel;
    ai: AIClient;
    getConversationType: (id: string) => ConversationType | undefined;
    diffEditorManager: DiffEditorManager;
    basicChatTemplateId: string;
  });
  private updateChatPanel;
  private addAndShowConversation;
  showChatPanel(): Promise<void>;
  receivePanelMessage(rawMessage: unknown): Promise<void>;
  createConversation(conversationTypeId: string): Promise<void>;
}

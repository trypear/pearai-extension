import { AIClient } from "../ai/AIClient";
import { DiffEditorManager } from "../diff/DiffEditorManager";
import { Conversation } from "./Conversation";
import { DiffData } from "./DiffData";
import { PearAITemplate } from "./template/PearAITemplate";
export type CreateConversationResult =
  | {
      type: "success";
      conversation: Conversation;
      shouldImmediatelyAnswer: boolean;
    }
  | {
      type: "unavailable";
      display?: undefined;
    }
  | {
      type: "unavailable";
      display: "info" | "error";
      message: string;
    };
export declare class ConversationType {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly source: "built-in" | "local-workspace" | "extension";
  readonly variables: PearAITemplate["variables"];
  private template;
  constructor({
    template,
    source,
  }: {
    template: PearAITemplate;
    source: ConversationType["source"];
  });
  get tags(): PearAITemplate["tags"];
  createConversation({
    conversationId,
    ai,
    updateChatPanel,
    initVariables,
    diffEditorManager,
  }: {
    conversationId: string;
    ai: AIClient;
    updateChatPanel: () => Promise<void>;
    initVariables: Record<string, unknown>;
    diffEditorManager: DiffEditorManager;
  }): Promise<CreateConversationResult>;
  hasDiffCompletionHandler(): boolean;
  getDiffData(): Promise<undefined | DiffData>;
}

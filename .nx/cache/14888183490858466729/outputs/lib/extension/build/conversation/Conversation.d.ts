import { webviewApi } from "@pearai/common";
import { AIClient } from "../ai/AIClient";
import { DiffEditorManager } from "../diff/DiffEditorManager";
import { DiffData } from "./DiffData";
import { PearAITemplate } from "./template/PearAITemplate";
export declare class Conversation {
  readonly id: string;
  protected readonly ai: AIClient;
  protected state: webviewApi.MessageExchangeContent["state"];
  protected error: webviewApi.Error | undefined;
  protected readonly messages: webviewApi.Message[];
  protected readonly updateChatPanel: () => Promise<void>;
  protected readonly initVariables: Record<string, unknown>;
  private readonly template;
  private temporaryEditorContent;
  private temporaryEditorDocument;
  private temporaryEditor;
  private diffContent;
  private diffEditor;
  private readonly diffData;
  private readonly diffEditorManager;
  constructor({
    id,
    initVariables,
    ai,
    updateChatPanel,
    template,
    diffEditorManager,
    diffData,
  }: {
    id: string;
    initVariables: Record<string, unknown>;
    ai: AIClient;
    updateChatPanel: () => Promise<void>;
    template: PearAITemplate;
    diffEditorManager: DiffEditorManager;
    diffData: DiffData | undefined;
  });
  getTitle(): Promise<string>;
  isTitleMessage(): boolean;
  getCodicon(): string;
  insertPromptIntoEditor(): Promise<void>;
  exportMarkdown(): Promise<void>;
  private getMarkdownExport;
  private resolveVariablesAtMessageTime;
  private evaluateTemplate;
  private executeChat;
  private handlePartialCompletion;
  private handleCompletion;
  private updateTemporaryEditor;
  private updateDiff;
  retry(): Promise<void>;
  answer(userMessage?: string): Promise<void>;
  protected addUserMessage({
    content,
    botAction,
  }: {
    content: string;
    botAction?: string;
  }): Promise<void>;
  protected addBotMessage({
    content,
    responsePlaceholder,
  }: {
    content: string;
    responsePlaceholder?: string;
  }): Promise<void>;
  protected updatePartialBotMessage({
    content,
  }: {
    content: string;
  }): Promise<void>;
  private setError;
  dismissError(): Promise<void>;
  toWebviewConversation(): Promise<webviewApi.Conversation>;
  private refinementInstructionState;
}

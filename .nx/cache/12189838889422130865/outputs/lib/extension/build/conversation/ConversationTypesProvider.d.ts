import * as vscode from "vscode";
import { ConversationType } from "./ConversationType";
export declare class ConversationTypesProvider {
  private readonly extensionUri;
  private readonly extensionTemplates;
  private readonly conversationTypes;
  constructor({ extensionUri }: { extensionUri: vscode.Uri });
  getConversationType(id: string): ConversationType | undefined;
  getConversationTypes(): ConversationType[];
  registerExtensionTemplate({ template }: { template: string }): void;
  loadConversationTypes(): Promise<void>;
  private loadBuiltInTemplates;
  private loadBuiltinTemplate;
  private loadExtensionTemplates;
  private loadWorkspaceTemplates;
}

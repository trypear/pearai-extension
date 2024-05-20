import * as vscode from "vscode";
type UpdateEvent = "clear key" | "set key";
export declare class ApiKeyManager {
  private readonly secretStorage;
  private messageEmitter;
  private messageHandler;
  constructor({ secretStorage }: { secretStorage: vscode.SecretStorage });
  clearOpenAIApiKey(): Promise<void>;
  getOpenAIApiKey(): Promise<string | undefined>;
  hasOpenAIApiKey(): Promise<boolean>;
  onUpdate: vscode.Event<UpdateEvent>;
  private storeApiKey;
  enterOpenAIApiKey(): Promise<void>;
}
export {};

import * as vscode from "vscode";
import { AIClient } from "../ai/AIClient";
export declare function indexRepository({
  ai,
  outputChannel,
}: {
  ai: AIClient;
  outputChannel: vscode.OutputChannel;
}): Promise<void>;

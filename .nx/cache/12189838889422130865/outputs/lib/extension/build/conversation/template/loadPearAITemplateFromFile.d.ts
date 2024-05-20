import * as vscode from "vscode";
import { PearAITemplateLoadResult } from "./PearAITemplateLoadResult";
export declare const loadConversationFromFile: (
  file: vscode.Uri
) => Promise<PearAITemplateLoadResult>;

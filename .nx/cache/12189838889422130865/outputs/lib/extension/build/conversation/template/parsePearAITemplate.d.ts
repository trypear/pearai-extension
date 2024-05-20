import { PearAITemplate, Prompt } from "./PearAITemplate";
export type PearAITemplateParseResult =
  | {
      type: "success";
      template: PearAITemplate;
    }
  | {
      type: "error";
      error: unknown;
    };
declare class NamedCodeSnippetMap {
  private readonly contentByLangInfo;
  set(langInfo: string, content: string): void;
  get(langInfo: string): string;
  resolveTemplate(prompt: Prompt, templateId: string): void;
  private getHandlebarsTemplate;
}
export declare const extractNamedCodeSnippets: (
  content: string
) => NamedCodeSnippetMap;
export declare function parsePearAITemplateOrThrow(
  templateAsRdtMarkdown: string
): PearAITemplate;
export declare function parsePearAITemplate(
  templateAsRdtMarkdown: string
): PearAITemplateParseResult;
export {};

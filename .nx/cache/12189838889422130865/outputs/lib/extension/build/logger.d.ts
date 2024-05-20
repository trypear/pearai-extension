import * as vscode from "vscode";
/** Log levels in increasing order of importance */
declare const logLevels: readonly ["debug", "info", "warning", "error"];
type LogLevel = (typeof logLevels)[number];
export declare function getVSCodeLogLevel(): LogLevel;
export interface Logger {
  setLevel(level: LogLevel): void;
  debug(message: string | string[]): void;
  log(message: string | string[]): void;
  warn(message: string | string[]): void;
  error(message: string | string[]): void;
}
export declare class LoggerUsingVSCodeOutput implements Logger {
  private level;
  private readonly outputChannel;
  constructor({
    level,
    outputChannel,
  }: {
    level: LogLevel;
    outputChannel: vscode.OutputChannel;
  });
  setLevel(level: LogLevel): void;
  debug(message: string | string[]): void;
  log(message: string | string[]): void;
  warn(message: string | string[]): void;
  error(message: string | string[]): void;
  private write;
  private canLog;
}
export {};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerUsingVSCodeOutput = exports.getVSCodeLogLevel = void 0;
const vscode = __importStar(require("vscode"));
/** Log levels in increasing order of importance */
const logLevels = ["debug", "info", "warning", "error"];
function getVSCodeLogLevel() {
    const setting = vscode.workspace
        .getConfiguration("pearai.logger")
        .get("level", "");
    return logLevels.find((l) => setting == l) ?? "info";
}
exports.getVSCodeLogLevel = getVSCodeLogLevel;
class LoggerUsingVSCodeOutput {
    constructor({ level, outputChannel, }) {
        this.level = level;
        this.outputChannel = outputChannel;
    }
    setLevel(level) {
        this.level = level;
    }
    debug(message) {
        return this.write({
            lines: [].concat(message),
            prefix: "[DEBUG]",
            level: "debug",
        });
    }
    log(message) {
        return this.write({
            lines: [].concat(message),
            prefix: "[INFO]",
            level: "info",
        });
    }
    warn(message) {
        return this.write({
            lines: [].concat(message),
            prefix: "[WARNING]",
            level: "warning",
        });
    }
    error(message) {
        return this.write({
            lines: [].concat(message),
            prefix: "[ERROR]",
            level: "error",
        });
    }
    write(options) {
        const { lines, prefix, level } = options;
        if (!this.canLog(level))
            return;
        lines.forEach((line) => {
            this.outputChannel.appendLine(`${prefix} ${line}`);
        });
    }
    canLog(level) {
        const requestedLevel = logLevels.findIndex((l) => l == level);
        const minLevel = logLevels.findIndex((l) => l == this.level);
        return requestedLevel >= minLevel;
    }
}
exports.LoggerUsingVSCodeOutput = LoggerUsingVSCodeOutput;
//# sourceMappingURL=logger.js.map
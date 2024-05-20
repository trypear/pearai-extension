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
exports.WebviewContainer = void 0;
const vscode = __importStar(require("vscode"));
const generateNonce_1 = require("./generateNonce");
class WebviewContainer {
    constructor({ panelId, panelCssId = panelId, webview, extensionUri, isStateReloadingEnabled, }) {
        this.panelId = panelId;
        this.panelCssId = panelCssId;
        this.webview = webview;
        this.extensionUri = extensionUri;
        this.isStateReloadingEnabled = isStateReloadingEnabled;
        this.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri],
        };
        this.webview.html = this.createHtml();
        this.onDidReceiveMessage = this.webview.onDidReceiveMessage;
    }
    async updateState(state) {
        return this.webview.postMessage({
            type: "updateState",
            state,
        });
    }
    getUri(...paths) {
        const baseUri = this.extensionUri.fsPath.endsWith("dev")
            ? this.extensionUri
            : vscode.Uri.joinPath(this.extensionUri, "lib");
        return this.webview.asWebviewUri(vscode.Uri.joinPath(baseUri, "webview", ...paths));
    }
    createHtml() {
        const baseCssUri = this.getUri("asset", "base.css");
        const codiconsCssUri = this.getUri("asset", "codicons.css");
        const panelCssUri = this.getUri("asset", `${this.panelCssId}.css`);
        const scriptUri = this.getUri("dist", "webview.js");
        const prismScriptUri = this.getUri("asset", "prism.js");
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, generateNonce_1.generateNonce)();
        const prismNonce = (0, generateNonce_1.generateNonce)();
        const cspSource = this.webview?.cspSource;
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'none'; font-src ${cspSource}; style-src ${cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' 'nonce-${prismNonce}';" />
    <link href="${baseCssUri}" rel="stylesheet" />
    <link href="${codiconsCssUri}" rel="stylesheet" />
    <link href="${panelCssUri}" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root" />

    <!-- Without the closing /script tag, the second script doesn't load -->
    <script nonce="${prismNonce}" src="${prismScriptUri}"></script>
    <script nonce="${nonce}"
            src="${scriptUri}"
            data-panel-id="${this.panelId}"
            data-state-reloading-enabled="${this.isStateReloadingEnabled}" />
  </body>
</html>`;
    }
}
exports.WebviewContainer = WebviewContainer;
//# sourceMappingURL=WebviewContainer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffEditorManager = void 0;
const DiffEditor_1 = require("./DiffEditor");
class DiffEditorManager {
    constructor({ extensionUri }) {
        this.extensionUri = extensionUri;
    }
    createDiffEditor({ title, editorColumn, conversationId, }) {
        return new DiffEditor_1.DiffEditor({
            title,
            editorColumn,
            extensionUri: this.extensionUri,
            conversationId,
        });
    }
}
exports.DiffEditorManager = DiffEditorManager;
//# sourceMappingURL=DiffEditorManager.js.map
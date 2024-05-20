"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveVariable = void 0;
const getFilename_1 = require("./getFilename");
const getLanguage_1 = require("./getLanguage");
const getSelectedText_1 = require("./getSelectedText");
const getSelectedLocationText_1 = require("./getSelectedLocationText");
const getSelectionWithDiagnostics_1 = require("./getSelectionWithDiagnostics");
const getOpenFiles_1 = require("./getOpenFiles");
async function resolveVariable(variable, { messages } = {}) {
    const variableType = variable.type;
    switch (variableType) {
        case "context":
            return (0, getOpenFiles_1.getOpenFiles)();
        case "constant":
            return variable.value;
        case "message":
            return messages?.at(variable.index)?.[variable.property];
        case "selected-text":
            return (0, getSelectedText_1.getSelectedText)();
        case "selected-location-text":
            return (0, getSelectedLocationText_1.getSelectedLocationText)();
        case "filename":
            return (0, getFilename_1.getFilename)();
        case "language":
            return (0, getLanguage_1.getLanguage)();
        case "selected-text-with-diagnostics":
            return (0, getSelectionWithDiagnostics_1.getSelectedTextWithDiagnostics)({
                diagnosticSeverities: variable.severities,
            });
        default: {
            const exhaustiveCheck = variableType;
            throw new Error(`unsupported type: ${exhaustiveCheck}`);
        }
    }
}
exports.resolveVariable = resolveVariable;
//# sourceMappingURL=resolveVariable.js.map
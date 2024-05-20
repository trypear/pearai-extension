"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveVariables = void 0;
const resolveVariable_1 = require("./resolveVariable");
const validateVariable_1 = require("./validateVariable");
async function resolveVariables(variables, { time, messages, }) {
    const variableValues = {
        messages,
    };
    // messages is a special variable that is always available:
    if (messages != null) {
        variableValues.messages = messages;
    }
    for (const variable of variables ?? []) {
        if (variable.time !== time) {
            continue;
        }
        if (variableValues[variable.name] != undefined) {
            throw new Error(`Variable '${variable.name}' is already defined`);
        }
        const value = await (0, resolveVariable_1.resolveVariable)(variable, { messages });
        (0, validateVariable_1.validateVariable)({ value, variable });
        variableValues[variable.name] = value;
    }
    return variableValues;
}
exports.resolveVariables = resolveVariables;
//# sourceMappingURL=resolveVariables.js.map
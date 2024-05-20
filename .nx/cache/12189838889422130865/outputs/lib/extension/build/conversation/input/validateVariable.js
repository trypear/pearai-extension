"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVariable = void 0;
function validateVariable({ value, variable, }) {
    for (const constraint of variable.constraints ?? []) {
        if (constraint.type === "text-length") {
            if (value == undefined) {
                throw new Error(`Variable '${variable.name}' is undefined`);
            }
            if (typeof value !== "string") {
                throw new Error(`Variable '${variable.name}' is not a string`);
            }
            if (value.length < constraint.min) {
                throw new Error(`Variable '${variable.name}' is too short`);
            }
        }
    }
}
exports.validateVariable = validateVariable;
//# sourceMappingURL=validateVariable.js.map
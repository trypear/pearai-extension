"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLinePositions = void 0;
function calculateLinePositions(lines, lineSeparator) {
    const linePositions = [];
    let position = 0;
    for (const line of lines) {
        linePositions.push({
            start: position,
            end: position + line.length, // note: separator is not included
        });
        position += line.length + lineSeparator.length;
    }
    return linePositions;
}
exports.calculateLinePositions = calculateLinePositions;
//# sourceMappingURL=calculateLinePositions.js.map
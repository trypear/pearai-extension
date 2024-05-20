"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSplitLinearLines = void 0;
const calculateLinePositions_1 = require("./calculateLinePositions");
function createSplitLinearLines({ maxChunkCharacters, lineSeparator = "\n", }) {
    return function splitLinearLines(content) {
        const lines = content.split(lineSeparator);
        const linePositions = (0, calculateLinePositions_1.calculateLinePositions)(lines, lineSeparator);
        const chunks = [];
        let segment = undefined;
        function addSegmentToChunks(currentLine) {
            if (segment == undefined) {
                return;
            }
            chunks.push({
                startPosition: linePositions[segment.startLine].start,
                endPosition: linePositions[currentLine].end,
                content: segment.lines.join(lineSeparator),
            });
            segment = undefined;
        }
        for (let i = 0; i < lines.length; i++) {
            const lineText = lines[i];
            if (segment == null) {
                segment = {
                    lines: [lineText],
                    startLine: i,
                    characterCount: lineText.length,
                };
            }
            else {
                segment.lines.push(lineText);
                segment.characterCount += lineText.length + lineSeparator.length;
            }
            // this leads to chunks that are too big (by 1 line)
            if (segment.characterCount > maxChunkCharacters) {
                addSegmentToChunks(i);
            }
        }
        addSegmentToChunks(lines.length - 1);
        return chunks;
    };
}
exports.createSplitLinearLines = createSplitLinearLines;
//# sourceMappingURL=splitLinearLines.js.map
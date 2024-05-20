"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosineSimilarity = void 0;
function cosineSimilarity(a, b) {
    return dotProduct(a, b) / (magnitude(a) * magnitude(b));
}
exports.cosineSimilarity = cosineSimilarity;
function dotProduct(a, b) {
    return a.reduce((acc, val, i) => acc + val * b[i], 0);
}
function magnitude(a) {
    return Math.sqrt(dotProduct(a, a));
}
//# sourceMappingURL=cosineSimilarity.js.map
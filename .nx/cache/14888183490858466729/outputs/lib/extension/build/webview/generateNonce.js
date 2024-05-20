"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNonce = void 0;
const POSSIBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateNonce() {
    let text = "";
    for (let i = 0; i < 32; i++) {
        text += POSSIBLE_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_CHARS.length));
    }
    return text;
}
exports.generateNonce = generateNonce;
//# sourceMappingURL=generateNonce.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNextId = void 0;
function createNextId({ prefix = "" }) {
    let id = 0;
    return () => `${prefix}${id++}`;
}
exports.createNextId = createNextId;
//# sourceMappingURL=nextId.js.map
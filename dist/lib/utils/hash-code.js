"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCode = void 0;
const hashCode = (obj) => {
    const s = JSON.stringify(obj);
    const r = s.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    return (r + 2147483647) + 1;
};
exports.hashCode = hashCode;
//# sourceMappingURL=hash-code.js.map
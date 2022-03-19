"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateParser = void 0;
const dateParser = (text, permDate) => {
    if (/PERM|ПОСТ/.test(text))
        return new Date('2030-01-01T00:00:00Z');
    const match = text.match(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
    if (!match)
        return permDate;
    const [s, y, m, d, hour, min] = match;
    return new Date(Date.UTC(+y + 2000, +m - 1, +d, +hour, +min, 0, 0));
};
exports.dateParser = dateParser;
//# sourceMappingURL=date-parser.js.map
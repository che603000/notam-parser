"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathCoords = exports.selectCoords = exports.parseCoords = exports.parseLng = exports.parseLat = void 0;
const parseLat = (str) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match)
        throw Error(`Invalid parse Lat. source = ${str}`);
    const [, d, m, s, attr] = match;
    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
};
exports.parseLat = parseLat;
const parseLng = (str) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/);
    if (!match)
        throw Error(`Invalid parse Lng. source = ${str}`);
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
};
exports.parseLng = parseLng;
const parseCoords = (str) => {
    if (!str)
        return [0, 0];
    const match = str.replace(/ /g, '').match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
    if (!match)
        throw Error(`Invalid coord. source= ${str}`);
    const [, lat, lng] = match;
    return [(0, exports.parseLng)(lng), (0, exports.parseLat)(lat)];
};
exports.parseCoords = parseCoords;
const selectCoords = (text) => text.match(/(\d{4,6}[СNЮS]\d{6,7}[ВЗEW][\s\S]+?[^0-9\-СВ\n\s])/);
exports.selectCoords = selectCoords;
const pathCoords = (text) => {
    const res = text.match(/(\d{4,6}[СNЮS]\d{5,7}[ВЗEW])/g);
    if (res)
        return res.map(coords => (0, exports.parseCoords)(coords));
    else
        return [];
};
exports.pathCoords = pathCoords;
//# sourceMappingURL=coords-parser.js.map
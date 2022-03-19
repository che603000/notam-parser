"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip = void 0;
const turf_1 = require("@turf/turf");
const coords_parser_1 = require("../coords-parser");
const calculationPoint = (point, width, bearing) => {
    const pt = (0, turf_1.destination)(point, width, bearing);
    return (0, turf_1.getCoord)(pt);
};
const createSegment = (point1, point2, width) => {
    const _bearing = (0, turf_1.bearing)(point1, point2);
    return (0, turf_1.polygon)([[
            calculationPoint(point1, width, _bearing + 90),
            calculationPoint(point1, width, _bearing - 90),
            calculationPoint(point2, width, _bearing - 90),
            calculationPoint(point2, width, _bearing + 90),
            calculationPoint(point1, width, _bearing + 90),
        ]]);
};
const unions = (polygons, properties) => {
    if (polygons.length === 0)
        return null;
    // const ccc = polygons
    //     .filter(p => p.properties?.circle)
    //     //.map(p => truncate(p, {precision: 4, coordinates: 2}))
    //     //.map(p => cleanCoords(p))
    //     .map(p => getCoords(p));
    // const c = multiPolygon(ccc);
    // const ppp = polygons
    //     .filter(p => p.properties?.circle === undefined)
    //     //.map(p => truncate(p, {precision: 4, coordinates: 2}))
    //     //.map(p => cleanCoords(p))
    //     .map(p => getCoords(p));
    // const p = multiPolygon(ppp);
    // return union(c, p, {properties});
    let res = polygons[0];
    for (let index = 0; index < polygons.length; index++) {
        const nextPolygon = polygons[index + 1];
        if (!nextPolygon)
            break;
        const newPolygon = (0, turf_1.union)(res, nextPolygon, {});
        if (newPolygon)
            res = newPolygon;
    }
    return res;
};
const createStrip = (path, width, properties) => {
    if (!path || !width)
        return undefined;
    const polygons = path.reduce((res, coords, index) => {
        res.push((0, turf_1.circle)(coords, width, { properties: { circle: true } }));
        const coordsNext = path[index + 1];
        if (coordsNext) {
            res.push(createSegment(coords, coordsNext, width));
        }
        return res;
    }, new Array());
    const polygon = unions(polygons, { properties });
    return polygon && (0, turf_1.truncate)(polygon, { precision: 4, coordinates: 2 });
};
const type = 'ПОЛОСА';
const regType = new RegExp(type, 'i');
const parseWidth = (text) => {
    //ПОЛОСА ШИРИНОЙ ПО 0.75 КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА:
    const m = text.match(/ШИРИНОЙ\s+ПО\s+([0-9.,]{1,6})\s?([А-Я]{1,4})/);
    if (!m)
        throw new Error(`Invalid parse radius. source = ${text}`);
    const [, value, units] = m;
    return {
        value: +(value.replace(',', '.')),
        units
    };
    //const value =
};
exports.strip = {
    test(text) {
        return regType.test(text);
    },
    nextText(text) {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text) {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        const strCoords = subText.match(/(\d{4,6}[СNЮS]\d{6,7}[В][\s\S]+?[^0-9\-СВ\n\s])/);
        const path = strCoords ? ((0, coords_parser_1.pathCoords)(strCoords[0])) : [];
        const width = parseWidth(subText);
        return path ? createStrip(path, width.value, { path, width: 2 }) : undefined;
    }
};
//# sourceMappingURL=strip.js.map
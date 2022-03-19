"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sector = exports.circle = void 0;
const turf_1 = require("@turf/turf");
const coords_parser_1 = require("../coords-parser");
const alts_parser_1 = require("../alts-parser");
const type = 'ОКРУЖНОСТЬ';
const regType = new RegExp(type, 'i');
const parseAzimuth = (text) => {
    //1. СЕКТОР ЦЕНТР 600115С0304715В АЗИМУТ 300-120 ГР. РАДИУС 2КМ ПОВЕРХНОСТЬ-900М СР.УР.МОРЯ.
    let m = text.match(/АЗИМУТ\s([0-9.]{1,3})[-\s]{1,4}([0-9]{1,3})/);
    // ОТ АЗИМУТА 050ГР ДО АЗИМУТА 235ГР,
    if (!m)
        m = text.match(/ОТ АЗИМУТА ([0-9.]{1,3})ГР ДО АЗИМУТА ([0-9.]{1,3})ГР/);
    if (!m)
        throw new Error(`Invalid parse азимут. source = ${text}`);
    const [, b1, b2] = m;
    return [+b1, +b2];
};
const parseRadius = (text) => {
    //ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 540000С0324800В. ПОВЕРХНОСТЬ-550М СР.УР.МОРЯ.
    const m = text.match(/РАДИУСО?М?\s([0-9.,]{1,6})\s?([А-Я]{1,4})/);
    if (!m)
        throw new Error(`Invalid parse radius. source = ${text}`);
    const [, value, units] = m;
    return {
        value: +(value.replace(',', '.')),
        units
    };
    //const value =
};
const parseCenter = (text) => {
    //ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 540000С0324800В. ПОВЕРХНОСТЬ-550М СР.УР.МОРЯ.
    let m = text.match(/ЦЕНТРО?М?\s(\d{4,6}[СNЮS]\d{5,7}[ВЗWE])/);
    //С ЦЕНТРОМ В Г.Т. 441800С 0384100В
    if (!m)
        m = text.match(/ЦЕНТРО?М?[\s\S]+(\d{4,6}[СNЮS]\s?\d{5,7}[ВЗWE])/);
    if (!m)
        throw new Error(`Invalid parse radius. source = ${text}`);
    const [, center] = m;
    return (0, coords_parser_1.parseCoords)(center);
};
exports.circle = {
    test(text) {
        return regType.test(text);
    },
    nextText(text) {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text) {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        const center = parseCenter(subText);
        const radius = parseRadius(subText);
        const alts = (0, alts_parser_1.parserAlts)(subText);
        const polygon = (0, turf_1.circle)(center, radius.value, {
            properties: {
                center,
                radius,
                alts
            }
        });
        return polygon && (0, turf_1.truncate)(polygon, { precision: 4, coordinates: 2 });
    }
};
const typeSector = 'СЕКТОР';
const regTypeSector = new RegExp(typeSector, 'i');
exports.sector = {
    test(text) {
        return regTypeSector.test(text);
    },
    nextText(text) {
        return text.replace(typeSector, Array.from(type).join('_'));
    },
    create(text) {
        const index = text.indexOf(typeSector);
        const subText = text.slice(index);
        const center = parseCenter(subText);
        const radius = parseRadius(subText);
        const alts = (0, alts_parser_1.parserAlts)(subText);
        const azimuth = parseAzimuth(subText);
        const polygon = (0, turf_1.sector)(center, radius.value, azimuth[0], azimuth[1], {
            properties: {
                center,
                radius,
                azimuth,
                alts
            }
        });
        return polygon && (0, turf_1.truncate)(polygon, { precision: 4, coordinates: 2 });
    }
};
//# sourceMappingURL=circle.js.map
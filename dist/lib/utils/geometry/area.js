"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.area = void 0;
const turf_1 = require("@turf/turf");
const coords_parser_1 = require("../coords-parser");
const type = 'РАЙОН';
const regType = new RegExp(type, 'i');
exports.area = {
    test(text) {
        return regType.test(text);
    },
    nextText(text) {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text) {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        try {
            const strCoords = subText.match(/(\d{4,6}[СNЮS]\d{5,7}[ВЗWE][\s\S]+?[^0-9\-СNЮSВЗWE\n\s])/);
            const coords = strCoords ? (0, coords_parser_1.pathCoords)(strCoords[0]) : [];
            const polygon = (0, turf_1.polygon)([coords]);
            return polygon && (0, turf_1.truncate)(polygon, { precision: 4, coordinates: 2 });
        }
        catch (e) {
            throw new Error(`Error create polygon. source = ${subText}`);
        }
    }
};
//# sourceMappingURL=area.js.map
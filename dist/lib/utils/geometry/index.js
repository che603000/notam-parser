"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserTextNotam = void 0;
const circle_1 = require("./circle");
const area_1 = require("./area");
const strip_1 = require("./strip");
const parserTextNotam = (source) => {
    let text = `${source}`;
    const features = [];
    while (true) {
        if (circle_1.circle.test(text)) {
            features.push(circle_1.circle.create(text));
            text = circle_1.circle.nextText(text);
            continue;
        }
        if (circle_1.sector.test(text)) {
            features.push(circle_1.sector.create(text));
            text = circle_1.sector.nextText(text);
            continue;
        }
        if (area_1.area.test(text)) {
            features.push(area_1.area.create(text));
            text = area_1.area.nextText(text);
            continue;
        }
        if (strip_1.strip.test(text)) {
            const f = strip_1.strip.create(text);
            f && features.push(f);
            text = strip_1.strip.nextText(text);
            continue;
        }
        break;
    }
    return features;
};
exports.parserTextNotam = parserTextNotam;
//# sourceMappingURL=index.js.map
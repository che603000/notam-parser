"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserAlts = exports.parserAlt = exports.foot2Met = exports.level2Met = exports.mileToMet = void 0;
const mileToMet = (value) => 1852 * value;
exports.mileToMet = mileToMet;
const level2Met = (value) => (30.48 * value + 0.5) | 0;
exports.level2Met = level2Met;
const foot2Met = (value) => (0.3048 * value + 0.5) | 0;
exports.foot2Met = foot2Met;
/*
((ПОВЕРХНОСТЬ|\d{1,5}М СР[.\s]УР[.\s]МОРЯ|\d{1,5}М УР[.\s]ЗЕМЛИ|\d{1,5}\s?М AMSL)[-\s]{1,4}(\d{1,5}М УР[.\s]ЗЕМЛИ|\d{1,5}М СР[.\s]УР[.\s]МОРЯ|\d{1,5}\s?М AMSL))
 */
const TEMPLATE_GND = [
    'ПОВЕРХНОСТЬ',
    'ЗЕМЛЯ',
    'GND',
];
const TEMPLATE = [
    '\\d{1,5}\\s?[МM] СР[.\\s]УР[.\\s]МОРЯ',
    '\\d{1,5}\\s?[МM] УР[.\\s]ЗЕМЛИ',
    '\\d{1,5}\\s?[МM] AMSL',
    'ЭШ\\d{2,3}'
];
const TEMPLATE_UNL = [
    'НЕОГРАНИ',
    'UNL'
];
const regExp = new RegExp(`((${[...TEMPLATE_GND, ...TEMPLATE].join('|')})[-\\s]{1,4}(${[...TEMPLATE, ...TEMPLATE_UNL].join('|')}))`, 'i');
const regTestGND = new RegExp(TEMPLATE_GND.join('|'), 'i');
const regTestUNL = new RegExp(TEMPLATE_UNL.join('|'), 'i');
const parserAlt = (text) => {
    if (regTestGND.test(text))
        return 0;
    if (regTestUNL.test(text))
        return 100000;
    if (/ЭШ/.test(text)) {
        const m = text.match(/\d{2,3}/g);
        if (!m)
            return NaN;
        return (0, exports.level2Met)(+m);
    }
    return parseInt(text);
};
exports.parserAlt = parserAlt;
const parserAlts = (text) => {
    const m = text.match(regExp);
    if (!m)
        return;
    const [, str, min, max] = m;
    return {
        str,
        range: [(0, exports.parserAlt)(min), (0, exports.parserAlt)(max)]
    };
};
exports.parserAlts = parserAlts;
//# sourceMappingURL=alts-parser.js.map
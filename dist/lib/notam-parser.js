"use strict";
/*
(К3153/19 НОТАМН
Щ)УУВЖ/ЩРТЦА/ИЖ/БО/В/000/120/5612С03709В004
А)УУВЖ Б)1904250300 Ц)1904271100
Д)25 26 0300-2300, 27 0300-1100
Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА РАЙОН:
560930С0370830В-561048С0370319В-561304С0370248В-561424С0370830В-
561503С0371259В-561324С0371500В-561326С0371113В-561424С0370830В-
560930С0370830В.
Ф)ПОВЕРХНОСТЬ Г)ЭШ120)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = exports.parserNotam = exports.parseIndex = exports.parseRegime = exports.selectFiled = exports.handlerNotam = exports.NOTAM_FIELD = void 0;
const translate_1 = require("./utils/translate");
const parse_q_1 = require("./utils/parse-q");
const alts_parser_1 = require("./utils/alts-parser");
const date_parser_1 = require("./utils/date-parser");
const parse_schedule_1 = require("./utils/parse-schedule");
var NOTAM_FIELD;
(function (NOTAM_FIELD) {
    NOTAM_FIELD["A"] = "\u0410";
    NOTAM_FIELD["B"] = "\u0411";
    NOTAM_FIELD["C"] = "\u0426";
    NOTAM_FIELD["D"] = "\u0414";
    NOTAM_FIELD["E"] = "\u0415";
    NOTAM_FIELD["F"] = "\u0424";
    NOTAM_FIELD["G"] = "\u0413";
    NOTAM_FIELD["Q"] = "\u0429";
})(NOTAM_FIELD = exports.NOTAM_FIELD || (exports.NOTAM_FIELD = {}));
const handlerNotam = (text) => {
    const enText = (0, translate_1.ru2en)(text);
    const m = enText.match(/^\(?([A-Z]\d{4}\/\d{2}.*?)\s/);
    if (!m)
        return;
    return m[1];
};
exports.handlerNotam = handlerNotam;
const selectFiled = (name, source) => {
    const text = (source || "").replace('(ЗОНА)', '');
    const reg = new RegExp(`${name}\\)([\\s\\S]*?)([ЩАБЦДЕФГ]\\)|$)`);
    const match = text.match(reg);
    if (!match)
        return "";
    return match[1];
};
exports.selectFiled = selectFiled;
const parseRegime = (text) => {
    let m = text.match(/\(([МM][РR]\d{2,8})/); // мест режим
    if (!m)
        m = text.match(/\(([BВV][РОPRO]\d{3,6})/); // врем режим
    if (!m)
        return "";
    return m[1];
};
exports.parseRegime = parseRegime;
const parseIndex = (text) => {
    const m = text.match(/\w{2,4}\d{2,6}/);
    if (!m)
        return "";
    return m[0];
};
exports.parseIndex = parseIndex;
const parserNotam = (text) => {
    return {
        text,
        A: (0, translate_1.ru2en)((0, exports.selectFiled)(NOTAM_FIELD.A, text)),
        B: (0, exports.selectFiled)(NOTAM_FIELD.B, text),
        C: (0, exports.selectFiled)(NOTAM_FIELD.C, text),
        D: (0, exports.selectFiled)(NOTAM_FIELD.D, text),
        E: (0, exports.selectFiled)(NOTAM_FIELD.E, text),
        F: (0, exports.selectFiled)(NOTAM_FIELD.F, text),
        G: (0, exports.selectFiled)(NOTAM_FIELD.G, text),
        Q: (0, exports.selectFiled)(NOTAM_FIELD.Q, text)
    };
};
exports.parserNotam = parserNotam;
const createModel = (notam) => {
    const { text, A, B, C, D, E, F, G, Q } = notam;
    const dateStart = (0, date_parser_1.dateParser)(B, new Date('2022-01-01T00:00:00'));
    const dateEnd = (0, date_parser_1.dateParser)(C, new Date('2032-01-01T00:00:00'));
    return {
        id: (0, exports.handlerNotam)(text),
        text,
        notam,
        area: A.trim(),
        schedule: {
            str: `${dateStart === null || dateStart === void 0 ? void 0 : dateStart.toISOString()}-${dateEnd === null || dateEnd === void 0 ? void 0 : dateEnd.toISOString()}, ${D}`,
            rangeDate: [dateStart, dateEnd],
            rangeTime: (0, parse_schedule_1.createSchedule)([dateStart, dateEnd], D),
            active: false
        },
        props: (0, parse_q_1.parseQ)(Q),
        items: [],
        alts: (0, alts_parser_1.parserAlts)(`${F.trim()}-${G.trim()}`),
        regime: (0, exports.parseRegime)(E),
        index: (0, exports.parseIndex)(E)
    };
};
exports.createModel = createModel;
//# sourceMappingURL=notam-parser.js.map
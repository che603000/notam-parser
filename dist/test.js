"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notams = void 0;
const notam_parser_1 = require("./lib/notam-parser");
const geometry_1 = require("./lib/utils/geometry");
const turf_1 = require("@turf/turf");
const hash_code_1 = require("./lib/utils/hash-code");
const notam_data_json_1 = __importDefault(require("./data/notam-data.json"));
class Notams {
    constructor(items) {
        /**
         "RA": "резервирование воздушного пространства (указать)",
         "RD": "опасная зона (указать национальный индекс и номер)",
         "RP": "запретная зона (указать национальный индекс и номер)",
         "RR": "зона ограничения полетов (указать национальный индекс и номер)",
         * @param subjects
         */
        this.createActiveTime = (subjects) => {
            return this.models
                .filter((item) => subjects.some(s => s === item.props.subject))
                .map(model => {
                const { index, schedule } = model;
                return { index, schedule };
            })
                .reduce((res, item) => {
                if (item.index)
                    res[item.index] = item.schedule;
                return res;
            }, {});
        };
        /**
         "RT": "зона временного ограничения полетов (указать зону)",
         "WB": "выполнение фигур высшего пилотажа",
         "WD": "подрыв взрывчатых веществ",
         "WP": "Тренировочные парашютные прыжки, парапланеризм или дельтапланеризм",
         "WE": "учения (указать)",
         "WM": "пуски ракет, стрельба из пушек или стредьба ракетами",
         * @param type
         * @param subjects
         */
        this.createRegime = (type, subjects) => {
            return this.models
                .filter((model) => subjects.some(s => s === model.props.subject))
                .map(model => {
                try {
                    model.items = (0, geometry_1.parserTextNotam)(model.notam.E);
                    if (model.items.length === 0)
                        throw new Error('Parsing not found');
                    model.isValid = true;
                }
                catch (e) {
                    console.log(e, '\n', model.text);
                    model.items = [(0, turf_1.circle)(model.props.center, model.props.radius)];
                    model.isValid = false;
                }
                return model;
            })
                .reduce((res, model) => {
                model.items.forEach((item, index) => {
                    const { id, items } = model, data = __rest(model, ["id", "items"]);
                    const m = Object.assign(Object.assign({}, data), { geometry: item.geometry, id, cid: `${model.id}-${index}` });
                    res.push(m);
                });
                return res;
            }, [])
                .map(model => {
                const { id, cid, regime, schedule, alts, text, isValid, geometry } = model;
                return {
                    id: cid,
                    type,
                    name: id,
                    index: regime,
                    activeSchedule: schedule,
                    alts: alts,
                    active: false,
                    schedule: schedule.str,
                    comment: text,
                    isValid,
                    geometry,
                    checksum: (0, hash_code_1.hashCode)({ text })
                };
            });
        };
        const nowDate = new Date();
        this.models = items.map(item => (0, notam_parser_1.parserNotam)(item))
            .map(item => (0, notam_parser_1.createModel)(item))
            .filter(item => {
            const [, e] = item.schedule.rangeDate;
            return nowDate <= e;
        });
    }
}
exports.Notams = Notams;
const notams = new Notams(notam_data_json_1.default.items);
const actives = notams.createActiveTime(["RR"]);
const regime = notams.createRegime('REGIMEZ', ["RT", "WB", "WD", "WP", "WE", "WM"]);
//# sourceMappingURL=test.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const notam_data_json_1 = __importDefault(require("./data/notam-data.json"));
const notams = new lib_1.Notams(notam_data_json_1.default.items);
//const actives = notams.createActiveTime("LZ", ["RR"]);
//const regime = notams.createRegime('REGIMEZ', ["RT", "WB", "WD", "WP", "WE", "WM"]);
const messages = notams.createMessage('NOTAM');
debugger;
//# sourceMappingURL=test.js.map
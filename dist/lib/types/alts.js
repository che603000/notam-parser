"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alts = exports.Alt = exports.AltUnits = void 0;
var AltUnits;
(function (AltUnits) {
    AltUnits["FT"] = "ft";
    AltUnits["MET"] = "met";
    AltUnits["FL"] = "FL";
})(AltUnits = exports.AltUnits || (exports.AltUnits = {}));
class Alt {
    constructor(value, units) {
        this.value = value;
        this.unit = units;
    }
    get meters() {
        switch (this.unit) {
            case AltUnits.FT:
                return this.value * 0.342;
            case AltUnits.FL:
                return this.value * 342;
            case AltUnits.MET:
                return this.value;
        }
        return 0;
    }
    ;
    static parse(text) {
        if ([/ПОВЕРХ/i, /GND/i].some(reg => reg.test(text)))
            return new Alt(0, AltUnits.MET);
        if ([/ЭШ/i, /FL/i].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m)
                throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.FL);
        }
        if ([/фут/i, /ft/i].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m)
                throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.FT);
        }
        if ([/\s+[MМ]/].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m)
                throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.MET);
        }
        throw new Error('invalid parse Alt');
    }
}
exports.Alt = Alt;
class Alts {
    constructor(title, min, max) {
        this.title = title;
        this.range = [min, max];
    }
    static parse(text) {
        const [minText, maxText] = text.split('-');
        const min = Alt.parse(minText);
        const max = Alt.parse(maxText);
        return new Alts(text, min.meters, max.meters);
    }
}
exports.Alts = Alts;
//# sourceMappingURL=alts.js.map
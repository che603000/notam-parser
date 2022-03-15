export enum AltUnits {
    FT = "ft",
    MET = 'met',
    FL = 'FL'
}

export interface IAlt {
    value: number
    unit: AltUnits

    get meters(): number
}

export type TAlt = {
    value: number
    unit: AltUnits
    meters: number
}

export type TAlts = {
    title: string,
    meters: [number, number]
}

export class Alt implements IAlt {
    value: number;
    unit: AltUnits;

    get meters(): number {
        switch (this.unit) {
            case AltUnits.FT:
                return this.value * 0.342;
            case AltUnits.FL:
                return this.value * 342;
            case AltUnits.MET:
                return this.value;
        }
        return 0;
    };

    constructor(value: number, units: AltUnits) {
        this.value = value;
        this.unit = units;
    }

    static parse(text: string) {
        if ([/ПОВЕРХ/i, /GND/i].some(reg => reg.test(text)))
            return new Alt(0, AltUnits.MET);

        if ([/ЭШ/i, /FL/i].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m) throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.FL);
        }

        if ([/фут/i, /ft/i].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m)  throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.FT);
        }

        if ([/\s+[MМ]/].some(reg => reg.test(text))) {
            const m = text.match(/\d{2,4}/g);
            if (!m)  throw new Error('invalid parse Alt');
            return new Alt(+m[0], AltUnits.MET);
        }

        throw new Error('invalid parse Alt');
    }

}

export class Alts {
    title: string;
    range: [number, number];

    constructor(title: string, min: number, max: number) {
        this.title = title;
        this.range = [min, max];
    }

    static parse(text: string): Alts {
        const [minText, maxText] = text.split('-')
        const min = Alt.parse(minText);
        const max = Alt.parse(maxText);
        return new Alts(text, min.meters, max.meters);
    }

}
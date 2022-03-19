export declare enum AltUnits {
    FT = "ft",
    MET = "met",
    FL = "FL"
}
export interface IAlt {
    value: number;
    unit: AltUnits;
    get meters(): number;
}
export declare type TAlt = {
    value: number;
    unit: AltUnits;
    meters: number;
};
export declare type TAlts = {
    title: string;
    meters: [number, number];
};
export declare class Alt implements IAlt {
    value: number;
    unit: AltUnits;
    get meters(): number;
    constructor(value: number, units: AltUnits);
    static parse(text: string): Alt;
}
export declare class Alts {
    title: string;
    range: [number, number];
    constructor(title: string, min: number, max: number);
    static parse(text: string): Alts;
}
//# sourceMappingURL=alts.d.ts.map
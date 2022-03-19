import { Geometry, Feature } from "@turf/turf";
export declare type TRange = [number, number];
export declare type TRangeDate = [Date, Date];
export declare type TSchedule = {
    str: string;
    rangeDate: TRangeDate;
    rangeTime?: TRangeDate[];
    active: boolean;
};
export declare type TAlts = {
    range: TRange;
    str: string;
};
export interface IQField {
    text: string;
    area: string;
    subject: string;
    condition: string;
    conditionText: string;
    rules: string;
    target: string;
    scope: string;
    alts: [number, number];
    center: [number, number];
    radius: number;
}
export interface INotam {
    text: string;
    Q: string;
    A: string;
    B: string;
    D: string;
    C: string;
    E: string;
    F: string;
    G: string;
}
export interface IModelNotam {
    id: string;
    text: string;
    notam: INotam;
    props: IQField;
    schedule: TSchedule;
    regime?: string;
    index?: string;
    items: Feature[];
    alts?: TAlts;
    isValid?: boolean;
}
export interface IActiveTime {
    [index: string]: TSchedule;
}
export interface IRegime {
    id: string;
    type: string;
    index: string;
    name: string;
    active: boolean;
    activeSchedule?: TSchedule;
    alts: TAlts;
    schedule: string;
    comment: string;
    isValid: boolean;
    geometry: Geometry;
    checksum?: number;
}
//# sourceMappingURL=interface.d.ts.map
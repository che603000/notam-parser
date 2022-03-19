import { INotam, IModelNotam } from './interface';
export declare enum NOTAM_FIELD {
    A = "\u0410",
    B = "\u0411",
    C = "\u0426",
    D = "\u0414",
    E = "\u0415",
    F = "\u0424",
    G = "\u0413",
    Q = "\u0429"
}
export declare const handlerNotam: (text: string) => string | undefined;
export declare const selectFiled: (name: NOTAM_FIELD, source: string) => string;
export declare const parseRegime: (text: string) => string;
export declare const parseIndex: (text: string) => string;
export declare const parserNotam: (text: string) => INotam;
export declare const createModel: (notam: INotam) => IModelNotam;
//# sourceMappingURL=notam-parser.d.ts.map
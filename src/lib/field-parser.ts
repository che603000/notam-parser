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

import {ru2en} from "./utils/translate";

const FIELDS = 'ЩАБЦДЕФГ';

export enum NOTAM_FIELD {
    A = 'А',
    B = 'Б',
    C = 'Ц',
    D = 'Д',
    E = 'Е',
    F = 'Ф',
    G = 'Г',
    Q = 'Щ',
}

export interface INotam {
    id: string
    Q: string,
    A: string
    B?: Date
    C?: Date
    E: string
    F: string
    G: string
}

export const handlerNotam = (text: string) => {

    const enText = ru2en(text);
    const m = enText.match(/^\(+(\w\d{4}\/\d{2}) NOTAM(\w)/);
    if (!m)
        return
    return m[1]
}

export const selectFiled = (nameFile: NOTAM_FIELD, text: string) => {
    const reg = new RegExp(`${nameFile}\\)(.*?)([${FIELDS}]\\)|\\)$)`, 's');
    const match = text.match(reg);
    if (!match)
        return "";
    return match[1];
}

export const dateParser = (text: string) => {
    const match = text.match(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
    if (!match)
        return;
    const [s, y, m, d, hour, min] = match;
    console.log(text);
    return new Date(Date.UTC(+y + 2000, +m - 1, +d, +hour, +min, 0, 0));
}

export const parserNotam = (text: string): INotam => {
    return {
        id: handlerNotam(text),
        A: ru2en(selectFiled(NOTAM_FIELD.A, text)),
        B: dateParser(selectFiled(NOTAM_FIELD.B, text)),
        C: dateParser(selectFiled(NOTAM_FIELD.C, text)),
        D: selectFiled(NOTAM_FIELD.D, text),
        E: selectFiled(NOTAM_FIELD.E, text),
        F: selectFiled(NOTAM_FIELD.F, text),
        G: selectFiled(NOTAM_FIELD.G, text),
        Q: ru2en(selectFiled(NOTAM_FIELD.Q, text))
    } as INotam

}
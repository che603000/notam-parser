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
import {parseQ} from "./utils/parse-q";
import {parserAlts} from "./utils/alts-parser";
import {dateParser} from "./utils/date-parser";
import {INotam, IModelNotam} from './interface';
import {createSchedule} from "./utils/parse-schedule";

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

export const handlerNotam = (text: string) => {

    const enText = ru2en(text);
    const m = enText.match(/^\(+(\w\d{4}\/\d{2}) NOTAM(\w)/);
    if (!m)
        return
    return m[1]
}

export const selectFiled = (name: NOTAM_FIELD, source: string) => {
    const text = source.replace('(ЗОНА)', '');
    const reg = new RegExp(`${name}\\)([\\s\\S]*?)([ЩАБЦДЕФГ]\\)|$)`);
    const match = text.match(reg);
    if (!match)
        return "";
    return match[1];
}

export const parserNotam = (text: string): INotam => {
    return {
        text,
        A: ru2en(selectFiled(NOTAM_FIELD.A, text)),
        B: selectFiled(NOTAM_FIELD.B, text),
        C: selectFiled(NOTAM_FIELD.C, text),
        D: selectFiled(NOTAM_FIELD.D, text),
        E: selectFiled(NOTAM_FIELD.E, text),
        F: selectFiled(NOTAM_FIELD.F, text),
        G: selectFiled(NOTAM_FIELD.G, text),
        Q: selectFiled(NOTAM_FIELD.Q, text)
    } as INotam
}

export const createModel = (notam: INotam): IModelNotam => {
    const {text, A, B, C, D, F, G, Q} = notam;
    const dateStart = dateParser(B, new Date('2022-01-01T00:00:00'));
    const dateEnd = dateParser(C, new Date('2032-01-01T00:00:00'));
    return {
        id: handlerNotam(text),
        text,
        notam,
        area: A.trim(),
        schedule: {
            str: `${dateStart?.toISOString()}-${dateEnd?.toISOString()}, ${D}`,
            range: [dateStart, dateEnd],
            times: createSchedule([dateStart, dateEnd], D)
        },
        props: parseQ(Q),
        items: [],
        alts: parserAlts(`${F.trim()}-${G.trim()}`)
    } as IModelNotam
}
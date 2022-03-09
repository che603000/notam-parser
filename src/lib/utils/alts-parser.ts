import {AltUnits, TAlt} from '../types/alts';

export const parserAlt = (text: string) => {
    if (/ПОВЕРХ/.test(text) || /GND/.test(text))
        return {
            unit: AltUnits.MET,
            value: 0,
            meters: 0
        } as TAlt;

    if ([/ЭШ/, /FL/].some(reg => reg.test(text))) {
        const m = text.match(/\d{2,4}/g);
        if (!m) return;

        return {
            unit: AltUnits.FL,
            value: +m[0],
            meters: 0
        } as TAlt;
    }

    return ''
}
import {AltUnits, TAlt} from '../types/alts';

export const mileToMet = (value: number) => 1852 * value;
export const level2Met = (value: number) => (30.48 * value + 0.5) | 0;
export const foot2Met = (value: number) => (0.3048 * value + 0.5) | 0;


/*
((ПОВЕРХНОСТЬ|\d{1,5}М СР[.\s]УР[.\s]МОРЯ|\d{1,5}М УР[.\s]ЗЕМЛИ|\d{1,5}\s?М AMSL)[-\s]{1,4}(\d{1,5}М УР[.\s]ЗЕМЛИ|\d{1,5}М СР[.\s]УР[.\s]МОРЯ|\d{1,5}\s?М AMSL))
 */

const TEMPLATE_GND = [
    'ПОВЕРХНОСТЬ',
    'ЗЕМЛЯ',
    'GND',
]
const TEMPLATE = [
    '\\d{1,5}\\s?[МM] СР[.\\s]УР[.\\s]МОРЯ',
    '\\d{1,5}\\s?[МM] УР[.\\s]ЗЕМЛИ',
    '\\d{1,5}\\s?[МM] AMSL',
    'ЭШ\\d{2,3}'
]

const TEMPLATE_UNL = [
    'НЕОГРАНИ',
    'UNL'
]
const regExp = new RegExp(`((${[...TEMPLATE_GND, ...TEMPLATE].join('|')})[-\\s]{1,4}(${[...TEMPLATE, ...TEMPLATE_UNL].join('|')}))`, 'i');
const regTestGND = new RegExp(TEMPLATE_GND.join('|'), 'i');
const regTestUNL = new RegExp(TEMPLATE_UNL.join('|'), 'i');

export const parserAlt = (text: string) => {
    if (regTestGND.test(text))
        return 0;

    if (regTestUNL.test(text))
        return 100000;

    if (/ЭШ/.test(text)) {
        const m = text.match(/\d{2,3}/g);
        if (!m) return NaN;

        return level2Met(+m);
    }

    return parseInt(text);
}

export const parserAlts = (text: string) => {
    const m = text.match(regExp);
    if (!m) return;
    const [, str, min, max] = m;
    return {
        str,
        range: [parserAlt(min), parserAlt(max)]
    }
}
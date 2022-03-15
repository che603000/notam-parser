import {Feature, circle as createCircle, sector as createSector, truncate} from "@turf/turf";
import {parseCoords} from "../coords-parser";
import {parserAlts} from "../alts-parser";

const type = 'ОКРУЖНОСТЬ';
const regType = new RegExp(type, 'i');

const parseAzimuth = (text: string) => {
//1. СЕКТОР ЦЕНТР 600115С0304715В АЗИМУТ 300-120 ГР. РАДИУС 2КМ ПОВЕРХНОСТЬ-900М СР.УР.МОРЯ.
    const m = text.match(/АЗИМУТ\s([0-9.]{1,3})[-\s]{1,4}([0-9]{1,3})/);
    if (!m) throw new Error(`Invalid parse азимут. source = ${text}`);
    const [, b1, b2] = m;
    return [+b1, +b2];
}

const parseRadius = (text: string) => {
//ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 540000С0324800В. ПОВЕРХНОСТЬ-550М СР.УР.МОРЯ.
    const m = text.match(/РАДИУСО?М?\s([0-9.,]{1,6})\s?([А-Я]{1,4})/);
    if (!m) throw new Error(`Invalid parse radius. source = ${text}`);
    const [, value, units] = m;
    return {
        value: +(value.replace(',', '.')),
        units
    }
    //const value =
}

const parseCenter = (text: string) => {
//ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 540000С0324800В. ПОВЕРХНОСТЬ-550М СР.УР.МОРЯ.
    let m = text.match(/ЦЕНТРО?М?\s(\d{4,6}[СNЮS]\d{5,7}[ВЗWE])/);
//С ЦЕНТРОМ В Г.Т. 441800С 0384100В
    if (!m)
        m = text.match(/ЦЕНТРО?М?[\s\S]+(\d{4,6}[СNЮS]\s?\d{5,7}[ВЗWE])/);

    if (!m) throw new Error(`Invalid parse radius. source = ${text}`);
    const [, center] = m;
    return parseCoords(center);
}

export const circle = {
    test(text: string): boolean {
        return regType.test(text);
    },
    nextText(text: string): string {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text: string): Feature {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        const center = parseCenter(subText);
        const radius = parseRadius(subText);
        const alts = parserAlts(subText);
        const polygon = createCircle(
            center,
            radius.value,
            {
                properties: {
                    center,
                    radius,
                    alts
                }
            }
        );
        return polygon && truncate(polygon, {precision: 4, coordinates: 2});
    }
}


const typeSector = 'СЕКТОР';
const regTypeSector = new RegExp(typeSector, 'i');

export const sector = {
    test(text: string): boolean {
        return regTypeSector.test(text);
    },
    nextText(text: string): string {
        return text.replace(typeSector, Array.from(type).join('_'));
    },
    create(text: string): Feature {
        const index = text.indexOf(typeSector);
        const subText = text.slice(index);

        const center = parseCenter(subText);
        const radius = parseRadius(subText);
        const alts = parserAlts(subText);
        const azimuth = parseAzimuth(subText);
        const polygon = createSector(
            center,
            radius.value,
            azimuth[0],
            azimuth[1],
            {
                properties: {
                    center,
                    radius,
                    azimuth,
                    alts
                }
            }
        );
        return polygon && truncate(polygon, {precision: 4, coordinates: 2});
    }
}
import {Feature, polygon as createPolygon, truncate} from "@turf/turf";
import {pathCoords} from "../coords-parser";

const type = ' РАЙОН ';
const regType = new RegExp(type, 'i');

export const area = {
    test(text: string): boolean {
        return regType.test(text);
    },
    nextText(text: string): string {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text: string): Feature {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        try {
            const strCoords = subText.match(/(\d{4,6}[СNЮS]\d{5,7}[ВЗWE][\s\S]+?[^0-9\-СNЮSВЗWE\n\s])/);
            const coords = strCoords ? pathCoords(strCoords[0]) : []

            const polygon = createPolygon([coords]);
            return polygon && truncate(polygon, {precision: 4, coordinates: 2});
        } catch (e) {
            throw new Error(`Error create polygon. source = ${subText}`);
        }


    }
}
import {
    destination,
    getCoord,
    Feature,
    Polygon,
    MultiPolygon,
    bearing,
    polygon,
    union,
    circle,
    truncate,
    multiPolygon,
    getCoords, cleanCoords
} from "@turf/turf";
import {pathCoords} from "../coords-parser";

type TPoint = [number, number];

const calculationPoint = (point: TPoint, width: number, bearing: number) => {
    const pt = destination(point, width, bearing);
    return getCoord(pt);
}

const createSegment = (point1: TPoint, point2: TPoint, width: number) => {
    const _bearing = bearing(point1, point2);
    return polygon([[
        calculationPoint(point1, width, _bearing + 90),
        calculationPoint(point1, width, _bearing - 90),
        calculationPoint(point2, width, _bearing - 90),
        calculationPoint(point2, width, _bearing + 90),
        calculationPoint(point1, width, _bearing + 90),
    ]]);
};

const unions = (polygons: Feature<Polygon>[], properties: any): Feature<Polygon | MultiPolygon> | null => {
    if (polygons.length === 0)
        return null;

    const ccc = polygons
        .filter(p => p.properties?.circle)
        //.map(p => truncate(p, {precision: 4, coordinates: 2}))
        //.map(p => cleanCoords(p))
        .map(p => getCoords(p));
    const c = multiPolygon(ccc);
    const ppp = polygons
        .filter(p => p.properties?.circle === undefined)
        //.map(p => truncate(p, {precision: 4, coordinates: 2}))
        //.map(p => cleanCoords(p))
        .map(p => getCoords(p));
    const p = multiPolygon(ppp);
    return union(c, p, {properties});
    // let res: Feature<Polygon | MultiPolygon> = polygons[0];
    // for (let index = 0; index < polygons.length; index++) {
    //     const nextPolygon = polygons[index + 1];
    //     if (!nextPolygon)
    //         break;
    //     const newPolygon: any = union(res, nextPolygon, {});
    //     if (newPolygon)
    //         res = newPolygon;
    // }
    // return res;
}

const createStrip = (path?: TPoint[], width?: number, properties?: any) => {
    if (!path || !width)
        return undefined;

    const polygons = path.reduce((res, coords, index) => {
        res.push(circle(coords, width, {properties: {circle: true}}) as Feature<Polygon>);
        const coordsNext = path[index + 1];
        if (coordsNext) {
            res.push(createSegment(coords, coordsNext, width));
        }
        return res;
    }, new Array<Feature<Polygon>>());

    const polygon = unions(polygons, {properties});
    return polygon && truncate(polygon, {precision: 4, coordinates: 2});
};


const type = 'ПОЛОСА';
const regType = new RegExp(type, 'i');

const parseWidth = (text: string) => {
//ПОЛОСА ШИРИНОЙ ПО 0.75 КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА:
    const m = text.match(/ШИРИНОЙ\s+ПО\s+([0-9.,]{1,6})\s?([А-Я]{1,4})/);
    if (!m) throw new Error(`Invalid parse radius. source = ${text}`);
    const [, value, units] = m;
    return {
        value: +(value.replace(',', '.')),
        units
    }
    //const value =
}


export const strip = {
    test(text: string): boolean {
        return regType.test(text);
    },
    nextText(text: string): string {
        return text.replace(type, Array.from(type).join('_'));
    },
    create(text: string) {
        const index = text.indexOf(type);
        const subText = text.slice(index);
        const strCoords = subText.match(/(\d{4,6}[СNЮS]\d{6,7}[В][\s\S]+?[^0-9\-СВ\n\s])/);
        const path = strCoords ? (pathCoords(strCoords[0])) : [];
        const width = parseWidth(subText);
        return path ? createStrip(path as TPoint[], width.value, {path, width: 2}) : undefined;
    }
}




import { Feature, Polygon, MultiPolygon } from "@turf/turf";
export declare const strip: {
    test(text: string): boolean;
    nextText(text: string): string;
    create(text: string): Feature<Polygon | MultiPolygon, import("@turf/turf").Properties> | null | undefined;
};
//# sourceMappingURL=strip.d.ts.map
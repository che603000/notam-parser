import {circle, sector} from './circle';
import {area} from './area';
import {strip} from './strip';
import {Feature} from "@turf/turf";

export const parserTextNotam = (source: string) => {

    let text = `${source}`;

    const features: Feature[] = [];

    while (true) {
        if (circle.test(text)) {
            features.push(circle.create(text));
            text = circle.nextText(text);
            continue;
        }
        if (sector.test(text)) {
            features.push(sector.create(text));
            text = sector.nextText(text);
            continue;
        }
        if (area.test(text)) {
            features.push(area.create(text))
            text = area.nextText(text);
            continue;
        }
        if (strip.test(text)) {
            const f = strip.create(text)
            f && features.push(f);
            text = strip.nextText(text);
            continue;
        }
        break;
    }

    return features;
}
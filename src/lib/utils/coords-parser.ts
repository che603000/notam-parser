export const parseLat = (str: string) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error(`Invalid parse Lat. source = ${str}`);
    const [, d, m, s, attr] = match;

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseLng = (str: string) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error(`Invalid parse Lng. source = ${str}`);
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseCoords = (str: string): [number, number] => {
    if (!str)
        return [0,0];
    const match = str.replace(/ /g, '').match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
    if (!match) throw Error(`Invalid coord. source= ${str}`);
    const [, lat, lng] = match;
    return [parseLng(lng), parseLat(lat)];
}

export const selectCoords = (text: string) => text.match(/(\d{4,6}[СNЮS]\d{6,7}[ВЗEW][\s\S]+?[^0-9\-СВ\n\s])/);

export const pathCoords = (text: string) => {
    const res = text.match(/(\d{4,6}[СNЮS]\d{5,7}[ВЗEW])/g);
    if (res)
        return res.map(coords => parseCoords(coords));
    else
        return [];
}
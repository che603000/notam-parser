export const dateParser = (text: string, permDate: Date) => {
    if(/PERM|ПОСТ/.test(text))
        return new Date('2030-01-01T00:00:00Z');

    const match = text.match(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
    if (!match)
        return permDate;
    const [s, y, m, d, hour, min] = match;
    return new Date(Date.UTC(+y + 2000, +m - 1, +d, +hour, +min, 0, 0));
}
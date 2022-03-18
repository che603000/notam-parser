export const hashCode = (obj: any): number => {
    const s = JSON.stringify(obj);
    const r = s.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    return (r + 2147483647) + 1;
};
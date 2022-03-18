import {TRange, TRangeDate, TSchedule} from "../interface";

const rangeDay = (start: number, end: number) => {
    const res = [];
    for (let i = start; i <= end; i++) {
        res.push(i);
    }
    return res;
}

const createNow = (day: number, time: [number, number]) => {
    const [hours, minutes] = time;
    const now = new Date();
    now.setUTCDate(day);
    now.setUTCHours(hours, minutes, 0, 0);
    return now;
}

const testLimitDate = (range: [Date, Date], date: Date) => {
    const [start, end] = range;
    return start <= date && date <= end;
}

const createRangeTime = (limitedDate: [Date, Date], day: number, times: string): TRangeDate | undefined => {
    const m = times.replace(/ /g, '').match(/(\d{2})(\d{2})-(\d{2})(\d{2})/);
    if (!m) throw new Error(`Error create rangeTime. source =${times} `);
    const [, startHours, startMinutes, endHours, endMinutes] = m;
    const start = createNow(day, [+startHours, +startMinutes]);
    const addDay = (+startHours) > (+endHours) ? 1 : 0; // если время начала больше времени окончания то конец след днем
    const end = createNow(day + addDay, [+endHours, +endMinutes]);
    if (testLimitDate(limitedDate, start) && testLimitDate(limitedDate, end))
        return [start, end] as TRangeDate;
    else
        return;
}

const WEEK = [
    'ВС',
    'ПН',
    'ВТ',
    'СР',
    'ЧТ',
    'ПТ',
    'СБ',
]

const createDays = (daysWeek?: string[]) => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const day = now.getUTCDate();
    const days = rangeDay(day, day + 5)
    if (!daysWeek)
        return days;
    else
        return days.map(day => {
            return {
                day,
                week: WEEK[createNow(day, [0, 0]).getDay()]
            }
        })
            .filter(item => daysWeek.some(w => w === item.week))
            .map(item => item.day);
}

const flatDays = (text: string) => {
    return text.replace(/\b\d{1,2}-\d{1,2}\b/g, (d) => {
        const res = [];
        const [min, max] = d.split('-').map(d => +d);
        for (let i = min; i <= max; i++) {
            res.push(i);
        }
        return res.join(' ');
    })
}

const parseDays = (text: string) => {
    // if (/ЕЖЕДН?Е?В?Н?О?/.test(text)) {
    //     return createDays();
    // }

    let m = flatDays(text).match(/(\b\d{1,2}\b)/g)
    if (m) {
        return m.map(d => +d);
    }
    m = text.match(/(ПН|ВТ|СР|ЧТ|ПТ|СБ|ВС)/g)
    if (m) {
        return createDays(m);
    }

    return createDays();
}

const parseTimes = (text: string) => {
    let m = text.match(/(\b\d{4}-\d{4}\b)/g)
    if (m) {
        return m;
    }
    return [];

}

export const createSchedule = (range: [Date, Date], text: string): TRangeDate[] => {
    if (!text)
        return [range];

    const days = parseDays(text);
    const times = parseTimes(text);

    const res: TRangeDate[] = [];
    days.forEach(day => {
        times.forEach(time => {
            const rangeTime = createRangeTime(range, day, time);
            rangeTime && res.push(rangeTime);
        })
    })
    return res;
}


// console.log(createSchedule(
//     [new Date('2022-03-10T00:00:00Z'), new Date('2022-03-26T23:00:00Z')],
//     ''
// ));


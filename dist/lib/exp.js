"use strict";
// const rangeDay = (start, end) => {
//     const res = [];
//     for (let i = start; i <= end; i++) {
//         res.push(i);
//     }
//     return res;
// }
//
// const createNow = (day, time) => {
//     const [hours, minutes] = time;
//     const now = new Date();
//     now.setUTCDate(day);
//     now.setUTCHours(hours, minutes, 0, 0);
//     return now;
// }
//
// const testLimitDate = (range, date) => {
//     const [start, end] = range;
//     return start <= date && date <= end;
// }
//
// const createRangeTime = (limitedDate, day, times) => {
//     const m = times.replace(/ /g, '').match(/(\d{2})(\d{2})-(\d{2})(\d{2})/);
//     if (!m) throw new Error(`Error create rangeTime. source =${times} `);
//     const [, h1, m1, h2, m2] = m;
//     const start = createNow(day, [+h1, +m1]);
//     const end = createNow(day, [+h2, +m2]);
//     if (testLimitDate(limitedDate, start) && testLimitDate(limitedDate, end))
//         return [start, end];
// }
//
// const WEEK = [
//     'ВС',
//     'ПН',
//     'ВТ',
//     'СР',
//     'ЧТ',
//     'ПТ',
//     'СБ',
// ]
//
// const createDays = (daysWeek) => {
//     const now = new Date();
//     now.setUTCHours(0, 0, 0, 0);
//     const day = now.getUTCDate();
//     const days = rangeDay(day, day + 5)
//     if (!daysWeek)
//         return days;
//     else
//         return days.map(day => {
//             return {
//                 day,
//                 week: WEEK[createNow(day, [0, 0]).getDay()]
//             }
//         })
//             .filter(item => daysWeek.some(w => w === item.week))
//             .map(item => item.day);
// }
//
// const flatDays =(text) =>{
//     return text.replace(/\b\d{1,2}-\d{1,2}\b/g, (d) => {
//         const res = [];
//         const [min, max] = d.split('-').map(d => +d);
//         for(let i  = min; i<=max; i++){
//             res.push(i);
//         }
//         return res.join(' ');
//     })
// }
//
// const parseDays = (text) => {
//     // if (/ЕЖЕДН?Е?В?Н?О?/.test(text)) {
//     //     return createDays();
//     // }
//
//     let m = flatDays(text).match(/(\b\d{1,2}\b)/g)
//     if (m) {
//         return m.map(d => +d);
//     }
//     m = text.match(/(ПН|ВТ|СР|ЧТ|ПТ|СБ|ВС)/g)
//     if (m) {
//         return createDays(m);
//     }
//
//     return  createDays();
// }
//
// const parseTimes = (text) => {
//     let m = text.match(/(\b\d{4}-\d{4}\b)/g)
//     if (m) {
//         return m;
//     }
//     return [];
//
// }
//
// const createSchedule = (range, text) => {
//     if(!text)
//         return [range];
//
//     const days = parseDays(text);
//     const times = parseTimes(text);
//
//     const res = [];
//     days.forEach(day => {
//         times.forEach(time => {
//             const times = createRangeTime(range, day, time);
//             times && res.push(times);
//         })
//     })
//     return res;
// }
//
//
// console.log(createSchedule(
//     [new Date('2022-03-10T00:00:00Z'), new Date('2022-03-26T23:00:00Z')],
//     ''
// ));
//
//# sourceMappingURL=exp.js.map
"use strict";
/*
 табель сообщений TC-2013
 http://saon.ru/forum/download/file.php?id=25156

 ПРИЛОЖЕНИЕ № 3
 к Табелю сообщений о движении воздушных судов в Российской Федерации

 ТАБЛИЦА СООТВЕТСТВИЯ БУКВ РУССКОГО АЛФАВИТА БУКВАМ ЛАТИНСКОГО АЛФАВИТА, ИСПОЛЬЗУЕМЫХ В СТАНДАРТНЫХ СООБЩЕНИЯХ
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ru2en = void 0;
// n.b. Буквы ЁЧШЩЪЭЮ не встречаются в 5-ти буквенных кодах
//[ [ru, en], ...]
const mapper = new Map([
    ['А', 'A'],
    ['Б', 'B'],
    ['В', 'W'],
    ['Г', 'G'],
    ['Д', 'D'],
    ['Э', 'E'],
    ['Е', 'E'],
    ['Ж', 'V'],
    ['З', 'Z'],
    ['И', 'I'],
    ['Й', 'J'],
    ['К', 'K'],
    ['Л', 'L'],
    ['М', 'M'],
    ['Н', 'N'],
    ['О', 'O'],
    ['П', 'P'],
    ['Р', 'R'],
    ['С', 'S'],
    ['Т', 'T'],
    ['У', 'U'],
    ['Ф', 'F'],
    ['Х', 'H'],
    ['Ц', 'C'],
    ['Ч', 'CH'],
    ['Ш', 'SH'],
    ['Ы', 'Y'],
    ['Щ', 'Q'],
    ['Ь', 'X'],
    ['Ю', 'IU'],
    ['Я', 'Y']
]);
const ru2en = (text) => {
    text = (text || "").toUpperCase();
    return Array.from(text).map(c => mapper.get(c) || c).join('');
};
exports.ru2en = ru2en;
//# sourceMappingURL=translate.js.map
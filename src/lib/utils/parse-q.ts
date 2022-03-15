import {parseCoords} from './coords-parser';
import {level2Met, mileToMet} from './alts-parser';
import {ru2en} from "../utils/translate";
import {IQField} from "../interface";


//UUXX/QRRCA/IV/BO/W/000/400/5820S03528W034
export const parseQ = (text: string) :IQField => {
    const [area, code, rules, target, scope, minAlt, maxAlt, coordinates] = text.split('/').map(item => item.trim());
    const [, coords, radius] = coordinates && coordinates.match(/(\d{4}[NSСЮ]\d{5}[EWЗВ])(\d{3})/) || [];
    const [, subject, condition, conditionText = ""] = code && ru2en(code).match(/Q(\w{2})(\w{2})(.+){0,40}/) || [];

    return {
        text,
        // РПИ – индекс (указатель) местоположения ИКАО
        // РПИ или указатель страны плюс «ХХ», если это относится более чем одному РПИ в пределах государства, что затем указывается в пункте А.
        area: ru2en(area),

        // Код NOTAM – пятибуквенный код ИКАО
        // - первая буква всегда Q – означает, что передаваемая информация кодирована последними четырьмя буквами;
        subject,
        // - вторая и третья буквы означают предмет сообщения (вид средства или условия);
        condition,
        // - четвертая и пятая буквы обозначают условие, относящееся к предмету сообщения (вид опасности и эксплуатационное состояние).
        conditionText,

        //  Правила полетов
        // I = ППП (IVR)
        // V = ПВП (VFR)
        // IV = ППП/ПВП.
        rules:ru2en(rules),

        // Цель
        // N – означает NOTAM для незамедлительного уведомления эксплуатанта ВС;
        // B – NOTAM включается в бюллетени предполетной информации БПИ (PIB);
        // O – важная эксплуатационная информация для полетов по ППП;
        // M – NOTAM для предполетного инструктажа необязателен.
        target: ru2en(target),

        // сфера действия
        // А – аэродром;
        // Е – маршрут;
        // W – навигационное предупреждение;
        // АЕ – радионавигационные средства используются в качестве аэродромных и маршрутных.
        scope: ru2en(scope),

        alts: [level2Met(+minAlt), level2Met(+maxAlt)],
        center: parseCoords(coords),
        radius: mileToMet(+radius)
    }
};





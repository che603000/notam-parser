export interface INotam {
    text: string
    Q: string,
    A: string
    B: string
    D: string
    C: string
    E: string
    F: string
    G: string
}

export interface ISchedule {
    str: string
    range: [Date, Date],
    times?: [Date, Date][]
}

export interface IModelNotam {
    id: string
    text: string
    notam: INotam
    props: IQField
    schedule: ISchedule
    items: any[]
    alts?: {
        str: string,
        range: [number, number]
    }
}

export interface IQField {
    text: string
    // РПИ – индекс (указатель) местоположения ИКАО
    // РПИ или указатель страны плюс «ХХ», если это относится более чем одному РПИ в пределах государства, что затем указывается в пункте А.
    area: string

    // Код NOTAM – пятибуквенный код ИКАО
    // - первая буква всегда Q – означает, что передаваемая информация кодирована последними четырьмя буквами;
    subject: string
    // - вторая и третья буквы означают предмет сообщения (вид средства или условия);
    condition: string
    // - четвертая и пятая буквы обозначают условие, относящееся к предмету сообщения (вид опасности и эксплуатационное состояние).
    conditionText: string

    //  Правила полетов
    // I = ППП (IVR)
    // V = ПВП (VFR)
    // IV = ППП/ПВП.
    rules: string

    // Цель
    // N – означает NOTAM для незамедлительного уведомления эксплуатанта ВС;
    // B – NOTAM включается в бюллетени предполетной информации БПИ (PIB);
    // O – важная эксплуатационная информация для полетов по ППП;
    // M – NOTAM для предполетного инструктажа необязателен.
    target: string

    // сфера действия
    // А – аэродром;
    // Е – маршрут;
    // W – навигационное предупреждение;
    // АЕ – радионавигационные средства используются в качестве аэродромных и маршрутных.
    scope: string

    alts: [number, number],
    center: [number, number]
    radius: number
}
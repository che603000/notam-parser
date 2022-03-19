import {parserNotam, createModel} from "./notam-parser";
import {parserTextNotam} from "./utils/geometry";
import {circle as createCircle} from "@turf/turf";
import {IActiveTime, IModelNotam, IRegime} from "./interface";
import {hashCode} from "./utils/hash-code";


export class Notams {
    models: IModelNotam[];

    constructor(items: string[]) {
        const nowDate = new Date();

        this.models = items.map(item => parserNotam(item))
            .map(item => createModel(item))
            .filter(item => {
                const [, e] = item.schedule.rangeDate;
                return nowDate <= e;
            });
    }

    /**
     "RA": "резервирование воздушного пространства (указать)",
     "RD": "опасная зона (указать национальный индекс и номер)",
     "RP": "запретная зона (указать национальный индекс и номер)",
     "RR": "зона ограничения полетов (указать национальный индекс и номер)",
     * @param subjects
     */
    createActiveTime = (type: string, subjects: string[]): IActiveTime => {
        return this.models
            .filter((item: IModelNotam) => subjects.some(s => s === item.props.subject))
            .map(model => {
                const {index, schedule} = model;
                return {index, schedule};
            })
            .reduce((res, item) => {
                if (item.index)
                    res[item.index] = item.schedule;
                return res;
            }, {} as IActiveTime);
    }
    /**
     "RT": "зона временного ограничения полетов (указать зону)",
     "WB": "выполнение фигур высшего пилотажа",
     "WD": "подрыв взрывчатых веществ",
     "WP": "Тренировочные парашютные прыжки, парапланеризм или дельтапланеризм",
     "WE": "учения (указать)",
     "WM": "пуски ракет, стрельба из пушек или стредьба ракетами",
     * @param type
     * @param subjects
     */
    createRegime = (type: string, subjects: string[]): IRegime[] => {
        return this.models
            .filter((model: IModelNotam) => subjects.some(s => s === model.props.subject))
            .map(model => {
                try {
                    if(/9348/.test(model.id))
                        debugger;
                    model.items = parserTextNotam(model.notam.E);
                    if (model.items.length === 0)
                        throw new Error(`Invalid parsing geometry. source =${model.notam.E}`);
                    model.isValid = true;
                } catch (e) {
                    console.log(e, '\n', model.text);
                    model.items = [createCircle(model.props.center, model.props.radius / 1000)];
                    model.isValid = false;
                }
                return model;
            })
            .reduce((res: any[], model) => {
                model.items.forEach((item, index) => {
                    const {id, items, ...data} = model;
                    const m = {...data, geometry: item.geometry, id, cid: `${model.id.replace("/", "_")}_${index}`}
                    res.push(m);
                })
                return res;
            }, [])
            .map(model => {
                const {id, cid, regime, schedule, alts, text, isValid, geometry} = model;
                return {
                    id: cid,
                    type,
                    name: id,
                    index: regime,
                    activeSchedule: schedule,
                    alts: alts,
                    active: false,

                    schedule: schedule.str,
                    comment: text,
                    isValid,

                    geometry,
                    checksum: hashCode({text})

                } as IRegime;
            })
    }
}

// const notams = new Notams(data.items);
// const actives = notams.createActiveTime(["RR"]);
// const regime = notams.createRegime('REGIMEZ', ["RT", "WB", "WD", "WP", "WE", "WM"]);

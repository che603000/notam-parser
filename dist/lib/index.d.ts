import { IActiveTime, IModelNotam, IRegime } from "./interface";
export declare class Notams {
    models: IModelNotam[];
    constructor(items: string[]);
    /**
     "RA": "резервирование воздушного пространства (указать)",
     "RD": "опасная зона (указать национальный индекс и номер)",
     "RP": "запретная зона (указать национальный индекс и номер)",
     "RR": "зона ограничения полетов (указать национальный индекс и номер)",
     * @param subjects
     */
    createActiveTime: (type: string, subjects: string[]) => IActiveTime;
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
    createRegime: (type: string, subjects: string[]) => IRegime[];
}
//# sourceMappingURL=index.d.ts.map
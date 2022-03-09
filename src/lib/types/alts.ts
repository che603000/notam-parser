export enum AltUnits {
    FT = "ft",
    MET = 'met',
    FL = 'FL'
}

export interface IAlt {
    value: number
    unit: AltUnits
    meters: number
}

export type TAlt = {
    value: number
    unit: AltUnits
    meters: number
}

export type TAlts = {
    title: string,
    meters: [number, number]
}
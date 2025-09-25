// src/types.ts
export type Units = "metric" | "imperial";

export type Place = { name: string; lat: number; lon: number };

export type CurrentBlock = {
    city: string;
    date: string;
    temp: number;
    code: number;          // WMO
};

export type StatBlock = {
    feelsLike: number | null;
    humidity: number | null; // %
    wind: number | null;     // km/h | mph
    precip: number | null;   // mm или %
};

export type HourSlot = { time: string; temp: number; code: number };
export type DaySlot = { date: string; min: number; max: number; code: number; precipProb?: number };

export type UIWeather = {
    current: CurrentBlock;
    stats: StatBlock;
    hourly: HourSlot[];
    daily: DaySlot[];
};

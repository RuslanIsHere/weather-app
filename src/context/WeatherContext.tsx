import { createContext, useContext, useState } from "react";

export type Units = "metric" | "imperial";
export type Place = { name: string; lat: number; lon: number } | null;

type Ctx = {
    place: Place;
    units: Units;
    setPlace: (p: Place) => void;
    setUnits: (u: Units) => void;
};

const WeatherCtx = createContext<Ctx | null>(null);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [place, setPlace] = useState<Place>(null);
    const [units, setUnits] = useState<Units>("metric");
    return (
        <WeatherCtx.Provider value={{ place, units, setPlace, setUnits }}>
            {children}
        </WeatherCtx.Provider>
    );
}

export const useWeatherCtx = () => {
    const ctx = useContext(WeatherCtx);
    if (!ctx) throw new Error("useWeatherCtx must be used inside WeatherProvider");
    return ctx;
};

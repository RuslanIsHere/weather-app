import { createContext, useContext, useState } from "react";
import type { Place, Units } from "../types";

type Ctx = {
    place: Place | null;
    units: Units;
    setPlace: (p: Place | null) => void;
    setUnits: (u: Units) => void;
};
const C = createContext<Ctx | null>(null);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [place, setPlace] = useState<Place | null>(null);
    const [units, setUnits] = useState<Units>("metric");
    return <C.Provider value={{ place, units, setPlace, setUnits }}>{children}</C.Provider>;
}
export const useWeatherCtx = () => {
    const v = useContext(C);
    if (!v) throw new Error("useWeatherCtx must be used inside provider");
    return v;
};


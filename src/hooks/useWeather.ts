// src/hooks/useWeather.ts
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/openMeteo";
import type { Place, Units } from "../types";

function hasCoords(p: Place | null): p is Place & { lat: number; lon: number } {
    return (
        !!p &&
        typeof p.lat === "number" &&
        typeof p.lon === "number" &&
        Number.isFinite(p.lat) &&
        Number.isFinite(p.lon)
    );
}

export function useWeather(place: Place | null, units: Units) {
    const enabled = hasCoords(place); // запрос не стартует, пока координаты не валидные
    return useQuery({
        queryKey: ["weather", place?.lat, place?.lon, units],
        queryFn: () => fetchWeather(place!.lat, place!.lon, place!.name, units),
        enabled,
        retry: 1,
        staleTime: 60_000,
    });
}



import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/openMeteo";
import { useWeatherCtx } from "../context/WeatherContext";

export function useWeather(defaultLat?: number, defaultLon?: number) {
    const { place, units } = useWeatherCtx();
    const lat = place?.lat ?? defaultLat;
    const lon = place?.lon ?? defaultLon;

    return useQuery({
        queryKey: ["weather", lat, lon, units],
        queryFn: () => fetchWeather(lat!, lon!),
        enabled: typeof lat === "number" && typeof lon === "number",
        staleTime: 1000 * 60, // 1 минута
    });
}


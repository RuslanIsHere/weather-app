import { fetchWeatherApi } from "openmeteo";

export type CityOpt = { value: string; label: string; lat: number; lon: number };

export async function geoSuggest(q: string): Promise<CityOpt[]> {
    if (!q) return [];
    const r = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en`
    );
    const j = await r.json();
    const rows: any[] = j?.results ?? [];
    return rows.map((x) => {
        const label = `${x.name}${x.admin1 ? ", " + x.admin1 : ""}, ${x.country_code}`;
        const value = `${label}::${x.latitude},${x.longitude}`; // уникально (решает дубли ключей)
        return { value, label, lat: x.latitude, lon: x.longitude };
    });
}

export async function getHourlyFromDocs(lat: number, lon: number) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = { latitude: lat, longitude: lon, hourly: "temperature_2m" as const };
    const [response] = await fetchWeatherApi(url, params);

    const hourly = response.hourly();
    if (!hourly) return { times: [], temps: [] as number[] };

    const start = Number(hourly.time());
    const end = Number(hourly.timeEnd());
    const step = hourly.interval();
    const tz = response.utcOffsetSeconds();

    const times = Array.from({ length: (end - start) / step }, (_, i) =>
        new Date((start + i * step + tz) * 1000)
    );
    const temps = Array.from(hourly.variables(0)?.valuesArray() ?? []); // Float32Array | null -> number[]

    return { times, temps };
}



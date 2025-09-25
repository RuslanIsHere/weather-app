import type { UIWeather, Units } from "../types";

// маппинг кода погоды -> ключ иконки (подставь свои названия)
export function weatherCodeToIcon(code: number): string {
    if ([0].includes(code)) return "clear";
    if ([1, 2, 3].includes(code)) return "partly";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
    if ([56, 57, 66, 67].includes(code)) return "freezing_rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "thunder";
    return "unknown";
}

export async function fetchWeather(lat: number, lon: number, city: string, units: Units): Promise<UIWeather> {
    try {
        const params = new URLSearchParams({
            latitude: String(lat),
            longitude: String(lon),
            current_weather: "true",
            hourly: [
                "temperature_2m",
                "apparent_temperature",
                "relativehumidity_2m",
                "precipitation_probability",
                "weather_code",
                "wind_speed_10m",
            ].join(","),
            daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"].join(","),
            timezone: "auto",
            ...(units === "imperial"
                ? { temperature_unit: "fahrenheit", wind_speed_unit: "mph", precipitation_unit: "inch" }
                : { temperature_unit: "celsius", wind_speed_unit: "kmh", precipitation_unit: "mm" }),
        });

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
        if (!res.ok) throw new Error(`Weather failed: ${res.status}`);
        const j = await res.json();

        // ---- адаптация к UI-модели ----
        const currentCode = j.current_weather?.weathercode ?? null;

        const current = {
            city,
            date: new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
            temp: j.current_weather?.temperature ?? 0,
            code: currentCode,
        };

        // найти индекс "сейчас" в hourly, чтобы взять feelsLike/humidity/wind/precip
        const hourTimes: string[] = j.hourly?.time ?? [];
        const nowIso = j.current_weather?.time ?? hourTimes[0];
        const idx = Math.max(0, hourTimes.indexOf(nowIso));

        const stats = {
            feelsLike: j.hourly?.apparent_temperature?.[idx] ?? null,
            humidity: j.hourly?.relativehumidity_2m?.[idx] ?? null,
            wind: j.hourly?.wind_speed_10m?.[idx] ?? j.current_weather?.windspeed ?? null,
            precip: j.daily?.precipitation_probability_max?.[0] ?? j.hourly?.precipitation_probability?.[idx] ?? null,
        };

        const hourly: { time: string; temp: number; code: number }[] = (j.hourly?.time ?? []).map((t: string, i: number) => ({
            time: t, // ISO; отформатируешь в компоненте
            temp: j.hourly.temperature_2m?.[i],
            code: j.hourly.weather_code?.[i],
        }));

        const daily = (j.daily?.time ?? []).map((d: string, i: number) => ({
            date: d,
            min: j.daily.temperature_2m_min?.[i],
            max: j.daily.temperature_2m_max?.[i],
            code: j.daily.weather_code?.[i],
            precipProb: j.daily.precipitation_probability_max?.[i],
        }));

        const dto: UIWeather = { current, stats, hourly, daily };

        // временный лог
        console.log("[weather] current", dto.current);
        console.log("[weather] stats", dto.stats);
        console.log("[weather] hourly first 3", dto.hourly.slice(0, 3));
        console.log("[weather] daily", dto.daily);

        return dto;
    } catch (e) {
        console.error("[weather] error", e);
        throw e;
    }
}

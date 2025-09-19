export type WeatherResponse = {
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
    };
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Ошибка загрузки: ${res.status}`);
        }

        const data = (await res.json()) as WeatherResponse;

        console.log("[API] Response:", data);
        return data;
    } catch (err) {
        console.error("[API] Ошибка:", err);
        throw err; 
    }
}

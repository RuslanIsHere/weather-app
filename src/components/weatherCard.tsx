import { useWeather } from "../hooks/useWeather";
import { useWeatherCtx } from "../context/WeatherContext";

export default function WeatherCard() {
    const { place } = useWeatherCtx();

    const { data, error, isLoading } = useWeather(48.8534, 2.3488);

    if (!place) {
        return (
            <div className="rounded-xl p-6 bg-neutral-800 mt-8 text-center">
                <div className="text-xl font-semibold mb-1">Where are we looking?</div>
                <div className="opacity-80">Search a city to see current weather.</div>
            </div>
        );
    }

    if (isLoading) {
        return <div className="rounded-xl p-6 bg-neutral-800 mt-8">Loading…</div>;
    }

    if (error) {
        return (
            <div className="rounded-xl p-6 bg-red-800 mt-8">
                Error: {(error as Error).message}
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="rounded-xl p-6 bg-neutral-800 mt-8">
            <h2 className="text-xl font-bold mb-2">{place.name}</h2>
            <p>Temperature: {data.current_weather.temperature}°C</p>
            <p>Wind: {data.current_weather.windspeed} km/h</p>
            <p>Direction: {data.current_weather.winddirection}°</p>
        </div>
    );
}

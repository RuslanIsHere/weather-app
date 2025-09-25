import type { UIWeather } from "../types";

export function StatGrid({ data, units }: { data: UIWeather; units: "metric" | "imperial" }) {
    const windUnit = units === "imperial" ? "mph" : "km/h";
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl p-4 bg-[#3a395c]">
                <div className="text-white/60 text-sm">Feels Like</div>
                <div className="text-white text-2xl">{data.stats.feelsLike ?? "—"}°</div>
            </div>
            <div className="rounded-xl p-4 bg-[#3a395c]">
                <div className="text-white/60 text-sm">Humidity</div>
                <div className="text-white text-2xl">{data.stats.humidity ?? "—"}%</div>
            </div>
            <div className="rounded-xl p-4 bg-[#3a395c]">
                <div className="text-white/60 text-sm">Wind</div>
                <div className="text-white text-2xl">{data.stats.wind ?? "—"} {windUnit}</div>
            </div>
            <div className="rounded-xl p-4 bg-[#3a395c]">
                <div className="text-white/60 text-sm">Precipitation</div>
                <div className="text-white text-2xl">{data.stats.precip ?? "—"}{typeof data.stats.precip === "number" ? " mm" : ""}</div>
            </div>
        </div>
    );
}

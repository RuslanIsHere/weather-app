import { weatherCodeToIcon } from "../api/openMeteo";
import type { UIWeather } from "../types";

export function DailyTiles({ data }: { data: UIWeather }) {
    return (
        <div className="mt-6">
            <h3 className="text-white mb-3">Daily forecast</h3>
            <div className="grid grid-cols-7 gap-3">
                {data.daily.slice(0, 7).map((d) => {
                    const day = new Date(d.date).toLocaleDateString(undefined, { weekday: "short" });
                    const icon = weatherCodeToIcon(d.code);
                    return (
                        <div key={d.date} className="rounded-xl p-3 bg-[#3a395c] text-center">
                            <div className="text-white/70">{day}</div>
                            <img src={`/icons/${icon}.svg`} className="mx-auto my-2 h-6 w-6" alt="" />
                            <div className="text-white text-sm">
                                {Math.round(d.max)}°<span className="text-white/60"> / {Math.round(d.min)}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

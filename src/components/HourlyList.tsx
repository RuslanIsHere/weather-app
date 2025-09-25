import { weatherCodeToIcon } from "../api/openMeteo";
import type { UIWeather } from "../types";

export function HourlyList({ data }: { data: UIWeather }) {
    return (
        <div className="rounded-2xl p-4 bg-[#3a395c]">
            <h3 className="text-white mb-3">Hourly forecast</h3>
            <div className="grid gap-2">
                {data.hourly.slice(15, 24).map((h) => { // пример диапазона
                    const t = new Date(h.time);
                    const hour = t.toLocaleTimeString([], { hour: "numeric" });
                    const icon = weatherCodeToIcon(h.code);
                    return (
                        <div key={h.time} className="flex justify-between items-center rounded-lg px-3 py-2 bg-[#262540]">
                            <div className="flex items-center gap-3">
                                <img src={`/icons/${icon}.svg`} className="h-5 w-5" alt="" />
                                <span>{hour}</span>
                            </div>
                            <span>{Math.round(h.temp)}°</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

import { weatherCodeToIcon } from "../api/openMeteo";
import type { UIWeather } from "../types";

export function CurrentCard({ data }: { data: UIWeather }) {
    const iconKey = weatherCodeToIcon(data.current.code);
    return (
        <div className="rounded-2xl p-6 bg-[#262540]">
            <div className="text-white/90">{data.current.city}</div>
            <div className="text-white/60 text-sm">{data.current.date}</div>
            <div className="mt-6 flex items-center gap-6">
                <img src={`/icons/${iconKey}.svg`} alt="" className="h-16 w-16" />
                <div className="text-6xl font-semibold">{Math.round(data.current.temp)}°</div>
            </div>
        </div>
    );
}

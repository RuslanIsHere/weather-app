import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import { geocode } from "../api/geocoding";
import { useWeatherCtx } from "../context/WeatherContext";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [pending, setPending] = useState(false);
    const { setPlace } = useWeatherCtx();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (pending) return;                 // защита от дабл-кликов
        const q = query.trim();
        if (!q) return;

        setPending(true);
        try {
            const hit = await geocode(q);      // <- ожидаем { name, lat, lon }
            if (!hit) {
                alert("Nothing found for this query");
                return;
            }
            // ВАЖНО: передаём lat/lon, а не latitude/longitude
            setPlace({ name: hit.name, lat: hit.lat, lon: hit.lon });
            // по желанию:
            // setQuery("");
            // (e.currentTarget.elements.namedItem("search") as HTMLInputElement)?.blur();
        } catch (err) {
            console.error(err);
            alert("Search failed");
        } finally {
            setPending(false);
        }
    }

    return (
        <form
            className="flex items-center gap-4 w-full max-w-md mx-auto mt-8"
            onSubmit={onSubmit}
        >
            <div className="relative flex-1">
                <img
                    src={searchIcon}
                    alt="Search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
                <input
                    name="search"
                    type="text"
                    autoComplete="off"
                    placeholder="Search for a place..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full text-present-5 rounded-[12px] pl-10 pr-4 py-2 bg-[#262540] placeholder-gray-400"
                />
            </div>
            <button
                type="submit"
                disabled={pending || !query.trim()}
                className="px-4 py-2 rounded-[12px] bg-blue-600 text-white font-medium hover:bg-blue-500 transition disabled:opacity-60"
            >
                {pending ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

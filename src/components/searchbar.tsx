import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import { geocode } from "../api/geocoding";
import { useWeatherCtx } from "../context/WeatherContext";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [pending, setPending] = useState(false);
    const { setPlace } = useWeatherCtx();

    return (
        <form
            className="flex items-center gap-4 w-full max-w-md mx-auto mt-8"
            onSubmit={async (e) => {
                e.preventDefault();
                if (!query.trim()) return;
                setPending(true);
                try {
                    const hit = await geocode(query.trim());
                    if (hit) {
                        setPlace({ name: hit.name, lat: hit.latitude, lon: hit.longitude });
                    } else {
                        // ничего не нашли — можно показать тост/алерт
                        alert("Nothing found for this query");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Search failed");
                } finally {
                    setPending(false);
                }
            }}
        >
            <div className="relative flex-1">
                <img
                    src={searchIcon}
                    alt="Search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
                <input
                    type="text"
                    placeholder="Search for a place..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full text-present-5 rounded-[12px] pl-10 pr-4 py-2 bg-[#262540] placeholder-gray-400"
                />
            </div>
            <button
                type="submit"
                disabled={pending}
                className="px-4 py-2 rounded-[12px] bg-blue-600 text-white font-medium hover:bg-blue-500 transition disabled:opacity-60"
            >
                {pending ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

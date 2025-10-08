import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import { geocode } from "../api/geocoding";
import { useWeatherCtx } from "../context/WeatherContext";
import Search from "antd/es/input/Search";
import {Tooltip} from "antd";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [pending, setPending] = useState(false);
    const { setPlace } = useWeatherCtx();

    async function onSearch(e: React.FormEvent<HTMLFormElement>) {
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
        <Search
            placeholder="Search for a place..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            prefix={
                <img src={searchIcon} alt="" style={{ width: 16, height: 16 }} />
            }
        />
    );
}

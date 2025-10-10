import { useRef, useState } from "react";
import { AutoComplete, Input } from "antd";
import searchIcon from "../assets/images/icon-search.svg";
import { fetchWeatherApi } from "openmeteo";

const { Search } = Input;

type Opt = { value: string; label: string; lat: number; lon: number };

export default function SearchBar() {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<Opt[]>([]);
    const t = useRef<number | null>(null);

    // --- подсказки с геокодинга ---
    async function geoSuggest(q: string): Promise<Opt[]> {
        if (!q) return [];
        const r = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en`
        );
        const j = await r.json();
        const rows: any[] = j?.results ?? [];
        return rows.map((x) => {
            const label = `${x.name}${x.admin1 ? ", " + x.admin1 : ""}, ${x.country_code}`;
            const key = `${x.latitude},${x.longitude}`; // уникальность
            return { value: `${label}::${key}`, label, lat: x.latitude, lon: x.longitude };
        });
    }

    // --- погода как в доках ---
    async function loadWeather(lat: number, lon: number, where: string) {
        const url = "https://api.open-meteo.com/v1/forecast";
        const [res] = await fetchWeatherApi(url, { latitude: lat, longitude: lon, hourly: "temperature_2m" });
        const h = res.hourly(); if (!h) return;
        const start = Number(h.time()), end = Number(h.timeEnd()), step = h.interval(), tz = res.utcOffsetSeconds();
        const times = Array.from({ length: (end - start) / step }, (_, i) => new Date((start + i * step + tz) * 1000));
        const temps = Array.from(h.variables(0)?.valuesArray() ?? []);
        console.log(`City: ${where} -> ${lat},${lon}`);
        console.log("First 5:", times.slice(0, 5).map((t, i) => [t.toISOString(), temps[i]]));
    }

    // выбор из списка
    const onSelect = (_: string, opt: any) => {
        const o = opt as Opt;
        setValue(o.label);            // показать красивое имя
        loadWeather(o.lat, o.lon, o.label);
    };

    // клик по кнопке Search — берём 1-ю подсказку
    const onSearchButton = async (text: string) => {
        const arr = await geoSuggest(text);
        if (arr[0]) {
            setValue(arr[0].label);
            loadWeather(arr[0].lat, arr[0].lon, arr[0].label);
        } else {
            console.log("Nothing found");
        }
    };

    return (
        <AutoComplete
            value={value}
            options={options}
            optionLabelProp="label"       // в поле подставляется label, не value
            style={{ width: "100%" }}
            onSelect={onSelect}
            onSearch={(text) => {
                setValue(text);
                if (t.current) clearTimeout(t.current);
                t.current = window.setTimeout(async () => setOptions(await geoSuggest(text)), 250);
            }}
        >
            <Search
                size="large"
                placeholder="Search for a place..."
                allowClear
                enterButton="Search"
                prefix={<img src={searchIcon} alt="" style={{ width: 16, height: 16 }} />}
                onSearch={onSearchButton}
            />
        </AutoComplete>
    );
}

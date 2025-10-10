export type CityOpt = { value: string; label: string; lat: number; lon: number };

export async function geoSuggest(q: string): Promise<CityOpt[]> {
    if (!q) return [];
    const r = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en`
    );
    const j = await r.json();
    const rows = j?.results ?? [];
    return rows.map((x: any) => ({
        value: `${x.name}, ${x.country_code}`,
        label: `${x.name}${x.admin1 ? ", " + x.admin1 : ""}, ${x.country_code}`,
        lat: x.latitude,
        lon: x.longitude,
    }));
}



export type GeoResult = { name: string; latitude: number; longitude: number; country?: string };

export async function geocode(query: string): Promise<GeoResult | null> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
    )}&count=1&language=en&format=json`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const g = data?.results?.[0];
    if (!g) return null;

    return {
        name: g.name + (g.country ? `, ${g.country}` : ""),
        latitude: g.latitude,
        longitude: g.longitude,
    };
}

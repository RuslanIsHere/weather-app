import type { Place } from "../types";

export async function geocode(query: string): Promise<Place | null> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
    const data = await res.json();
    const hit = data?.results?.[0];
    if (!hit) return null;
    return { name: `${hit.name}${hit.country ? ", " + hit.country : ""}`, lat: hit.latitude, lon: hit.longitude };
}


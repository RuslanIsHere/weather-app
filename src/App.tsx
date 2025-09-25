// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider, useWeatherCtx } from "./context/WeatherContext";
import SearchBar from "./components/searchbar";
import { useWeather } from "./hooks/useWeather";
import { CurrentCard } from "./components/CurrentCard";
import { StatGrid } from "./components/StatGrid";
import { HourlyList } from "./components/HourlyList";
import { DailyTiles } from "./components/DailyTiles";
import Header from "./components/header.tsx";

const qc = new QueryClient();

function Dashboard() {
    const { place, units } = useWeatherCtx();
    const { data, isLoading, error } = useWeather(place, units);

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <SearchBar />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {isLoading && <div className="rounded-2xl p-6 bg-[#262540]">Loading…</div>}
                    {error && <div className="rounded-2xl p-6 bg-red-900/40">Error: {(error as Error).message}</div>}
                    {data && (
                        <>
                            <CurrentCard data={data} />
                            <StatGrid data={data} units={units} />
                        </>
                    )}
                </div>
                {data && <HourlyList data={data} />}
            </div>
            {data && <DailyTiles data={data} />}
        </div>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={qc}>
            <WeatherProvider>
                <Dashboard />
            </WeatherProvider>
        </QueryClientProvider>
    );
}


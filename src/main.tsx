import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {WeatherProvider} from "./context/WeatherContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <WeatherProvider>
                <App />
            </WeatherProvider>
        </QueryClientProvider>
    </StrictMode>
)

import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
export default function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <form
            className="flex items-center gap-2 w-full max-w-md mx-auto mt-8"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className="relative flex-1">
                <img
                    src={searchIcon}
                    alt="Search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search for a place..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-12px pl-10 pr-4 py-2 text-white bg-[#262540] placeholder-gray-400"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition"
            >
                Search
            </button>
        </form>
    );
}

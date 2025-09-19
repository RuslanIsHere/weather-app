import SearchBar from "./components/searchbar.tsx";
import Header from "./components/header.tsx";
import WeatherCard from "./components/weatherCard.tsx";

function App() {

  return (
    <>
        <div className="container">
            <Header />
            <h1 className='text-preset-2 text-center my-[64px]'>How’s the sky looking today?</h1>
            <SearchBar/>
            <WeatherCard />

        </div>

    </>
  )
}

export default App

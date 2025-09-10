import SearchBar from "./components/searchbar.tsx";
import Header from "./components/header.tsx";

function App() {

  return (
    <>
        <div className="container">
            <Header />
            <h1 className='text-preset-2 text-center'>How’s the sky looking today?</h1>
            <SearchBar/>
        </div>

    </>
  )
}

export default App

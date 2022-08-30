import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { FavouritesPages } from "./pages/FavouritesPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/favourites" element={<FavouritesPages />}></Route>
      </Routes>
    </>
  );
}

export default App;

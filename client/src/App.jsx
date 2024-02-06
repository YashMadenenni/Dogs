import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateDog,
  Dog,
  Home,
  Navbar,
  SearchDogs
} from './components'

const App = () => {
  return (
    <BrowserRouter>
     <div className="relative z-0 bg-gradient-to-r from-amber-400  via-yellow-300 to-amber-400">
     <Navbar />
      <Home />
      <Routes>
        <Route path="/" element={<SearchDogs />}></Route>
        <Route path="/:name" element={<Dog />}></Route>
      </Routes>
      <>
        <CreateDog />
      </>
     </div>
    </BrowserRouter>
  );
};

export default App;

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
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:dogID" element={<Dog />} />
          
        </Routes>
     </div>
    </BrowserRouter>
  );
};

export default App;

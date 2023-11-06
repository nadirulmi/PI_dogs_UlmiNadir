import Home from "./components/home/Home";
import Cards from "./components/cards/Cards";
import Detail from "./components/detail/Detail";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
import { Form } from "./components/form/Form";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Curiosities } from "./components/curiosities/Curiosities";

function App() {
  const location = useLocation();
  const loginPage = location.pathname === "/";

  
  return (
    <div className="App">
      {!loginPage && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Cards />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/curiosities" element={<Curiosities />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

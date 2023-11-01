import Home from './components/home/Home';
import Cards from './components/cards/Cards';
import Detail from './components/detail/Detail';
import {Routes, Route} from "react-router-dom"
import { Nav } from './components/nav/Nav';
import { Form } from './components/form/Form';
function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dogs' element={<Cards/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;

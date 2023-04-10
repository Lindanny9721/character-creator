import './App.css'
// import DayDetail from './components/DayDetail';
import Navbar from './components/NavBar';
import Create from './components/Create';
import Gallery from './components/Gallery';
import Homepage from './components/Homepage';
import { Route, Routes } from "react-router-dom";
import EditPost from './components/EditCharacter';

function App() {
  return (
      <nav>
        <div className="App">
          <Navbar/>
            <Routes>
              <Route excat path="/" element={<Homepage />}/>
              <Route path="/Create" element={<Create/> }/>
              <Route path="/Gallery" element={<Gallery/>} />
              <Route path="/edit/:id" element={<EditPost/>} />
            </Routes>
        </div>
      </nav>
  )
}

export default App

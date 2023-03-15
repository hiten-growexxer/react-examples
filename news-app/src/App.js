import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewsList from './Components/NewsList';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<NewsList query='india'  />} />
          <Route exact path="/sport" element={<NewsList query='sports'/>} />
          <Route exact path="/politics" element={<NewsList query='politics' />} />
          <Route exact path="/business" element={<NewsList query='business' />} />
          <Route exact path="/technology" element={<NewsList query='technology' />} />
          <Route exact path="/health" element={<NewsList query='health' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

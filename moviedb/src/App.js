
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Upcoming from './components/Upcoming';
import MovieSearchResults from './components/MovieSearchResults';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Popular />} />
          <Route path='/TopRated' element={<TopRated />} />
          <Route path='/Upcoming' element={<Upcoming />} />
          <Route path='/search' element={<MovieSearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


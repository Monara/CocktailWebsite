import React, {useState, useEffect} from 'react';
import './App.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  let [data, setData] = useState(null);

  useEffect(() => {
    fetch("/search")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <Router>
        <Heading />
        <Search />
        <div id='results'>
          {data && data.map((item) => <SearchResult data = {item}/> )}
        </div>
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

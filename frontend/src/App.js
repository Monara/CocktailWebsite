import React, {useState, useEffect} from 'react';
import './App.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  let [resultData, setResultData] = useState(null);
  /*let [autocompleteData, setAutocompleteData] = useState(null);

  useEffect(() => {
    fetch("/getTitles")
      .then((res) => res.json())
      .then((autocompleteData) => setAutocompleteData(autocompleteData));
  }, []);*/

  useEffect(() => {
    fetch("/search")
      .then((res) => res.json())
      .then((resultData) => setResultData(resultData));
  }, []);

  return (
    <div className="App">
      <Router>
        <Heading />
        <Search />
        <div id='results'>
          {resultData && resultData.map((item) => <SearchResult data = {item}/> )}
        </div>
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

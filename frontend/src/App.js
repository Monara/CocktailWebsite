import React, {useState, useEffect} from 'react';
import './App.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import Footer from  './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  let [url, setUrl] = useState('');
  let [showRand, setShowRand] = useState(true);
  let [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (url !== '') { /*so not empty string on loading */
      fetch(url)
      .then((res) => res.json())
      .then((resultData) => setResultData(resultData));
      setShowRand(false);

    }
    else if (showRand === true) {
      fetch('/getRand')
      .then((res) => res.json())
      .then((resultData) => setResultData(resultData));
    }
  }, [url]); /*[url] means will run again when updated */

  return (
    <div className="App">
      <Router>
        <Heading />
        <Search url={url => setUrl(url)}/>
        <div id='results'>
          {resultData && resultData.map((item) => <SearchResult data={item} key={item.cocktail_id}/> )}
        </div>
        <Footer />
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
/*unique key to avoid warning*/
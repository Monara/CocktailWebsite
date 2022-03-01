import React, {useState, useEffect} from 'react';
import './Home.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import Footer from  './components/Footer';

function Home() {

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
  }, [url, showRand]); /*[url] means will run again when updated */

  return (
    <div className="Home">
        <Heading />
        <Search url={url => setUrl(url)}/>
        <div id='results'>
          {resultData && resultData.map((item) => <SearchResult data={item} key={item.cocktail_id}/> )}
        </div>
        <Footer />
    </div>
  );
}

export default Home
/*unique key to avoid warning*/
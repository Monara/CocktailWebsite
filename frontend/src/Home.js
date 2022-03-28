import React, {useState, useEffect, useContext} from 'react';
import './Home.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import Footer from  './components/Footer';
import ScrollUpButton from "react-scroll-up-button";
import { scrollStyle } from './components/Styles';
import { LanguageContext } from './App';

function Home() {

  const [language] = useContext(LanguageContext);

  let [url, setUrl] = useState('');
  let [showRand, setShowRand] = useState(false);
  let [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (url === '') { /*if URL is empty show random */
      setShowRand(true);
      fetch('/api/getRand')
      .then((res) => res.json())
      .then((resultData) => setResultData(resultData));
    }
    else if (url === '/api/search') { /**if no search criteria present show no result */
      setShowRand(false);
      setResultData(null);
    }
    else { /*else show results with URL*/
      setShowRand(false);
      fetch(url)
      .then((res) => res.json())
      .then((resultData) => setResultData(resultData));
    }
  }, [url]); /*[url] means will run again when updated */

  return (
    <div className="Home">
        <Heading />
        <Search url={url => setUrl(url)}/>
        <div id='results'>
          {Array.isArray(resultData) && resultData.length ? resultData.map((item) => <SearchResult data={item} random={showRand} key={item.id}/>) : <p id='no-result'>{ language === "english" ? "No results found" : "Rezultatų nėra"}</p>}
        </div>
        <ScrollUpButton 
          StopPosition={0}
          ShowAtPosition={300}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
          style={scrollStyle}
          ToggledStyle={{}}
        />
        <Footer />
    </div>
  );
}

export default Home
/*unique key to avoid warning*/
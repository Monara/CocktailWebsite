import React, {useState, useEffect} from 'react';
import './Home.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import Footer from  './components/Footer';
import ScrollUpButton from "react-scroll-up-button";

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

  var scrollStyle = {
    background: "var(--faintpurple)",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    padding: "0.5%"
  }

  return (
    <div className="Home">
        <Heading />
        <Search url={url => setUrl(url)}/>
        <div id='results'>
          {Array.isArray(resultData) && resultData.length ? resultData.map((item) => <SearchResult data={item} random={showRand} key={item.cocktail_id}/>) : <p id='no-result'>No results found</p>}
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
import React, {useState, useEffect, useContext} from 'react';
import './Home.css';
import Heading from './components/Heading';
import Search from  './components/Search';
import SearchResult from './components/SearchResult';
import Footer from  './components/Footer';
import ScrollUpButton from 'react-scroll-up-button';
import {scrollStyle} from './components/Styles';
import {LangContext} from './App';
import {text} from './components/Text';

const Home = () => {

  const [lang] = useContext(LangContext);
  const [url, setUrl] = useState('');
  const [showRand, setShowRand] = useState(false);
  const [resultData, setResultData] = useState(null);
  const i = (lang === 'eng' ? 0 : 1); /*index for translations in text object arrays*/

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
    <div className='Home'>
      <Heading />
      <Search url={url => setUrl(url)}/>
      <div id='results'>
        {Array.isArray(resultData) && resultData.length ? resultData.map((item) => <SearchResult data={item} random={showRand} key={item.id}/>) : <p id='no-result'>{text.no_res[i]}</p>}
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

export default Home;
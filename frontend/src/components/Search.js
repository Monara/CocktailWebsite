import React, {useState, useEffect, useContext} from 'react';
import './Search.css';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp, faChevronDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {inputStyle} from './Styles';
import {LangContext} from '../App';
import {text} from './Text';

/*Checkboxes for filtering */
const Filters = ({checkboxState: [checkboxes, setCheckboxes]}) => {

  const [lang] = useContext(LangContext);
  const i = (lang === 'eng' ? 0 : 1); /*index for translations in text object arrays*/

  const markCheckbox1 = () => {
    const mark1 = {...checkboxes, first: !checkboxes.first}; /**spread operator, overwrite first to be toggled */
    setCheckboxes(mark1);
  }

  const markCheckbox2 = () => {
    const mark2 = {...checkboxes, second: !checkboxes.second};
    setCheckboxes(mark2);
  }

  return (
    <div className='filter-container'>
        <label>
            <input type='checkbox' onClick={markCheckbox1} />
            {checkboxes.first ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}&nbsp;{text.max3[i]} 
        </label>
        <label>
            <input type='checkbox' onClick={markCheckbox2} />
            {checkboxes.second ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}&nbsp;{text.veg[i]} 
        </label>
    </div>
  );
} 


const Search = ({url}) => {

/*Language chosen */
const [lang] = useContext(LangContext);
/*States */
const [filterVisibility, setFilterVisibility] = useState(false);
const [titleValue, setTitleValue] = useState('');
const [tagValue, setTagValue] = useState('');
const [checkboxes, setCheckboxes] = useState({first:false, second:false}); /*object for state */
const i = (lang === 'eng' ? 0 : 1); /*index for translations in text object arrays*/



/*Fetch data for autocomplete search*/
/*ReactSearchAutocomplete picks up on the other language even with fuseOptions 
*(some LT suggestions shown only when typing the equivalent in EN), thus data separated*/
const [autocompleteTitles, setAutocompleteTitle] = useState('');
const [autocompleteTags, setAutocompleteTag] = useState('');
const [autocompleteTitlesLT, setAutocompleteTitleLT] = useState('');
const [autocompleteTagsLT, setAutocompleteTagLT] = useState('');

  useEffect(() => {
    fetch('/api/getTitles')
      .then((res) => res.json())
      .then((autocompleteTitles) => setAutocompleteTitle(autocompleteTitles));
  }, []);

  useEffect(() => {
    fetch('/api/getTags')
      .then((resp) => resp.json())
      .then((autocompleteTags) => setAutocompleteTag(autocompleteTags));
  }, []);

  useEffect(() => {
    fetch('/api/getTitlesLT')
      .then((res) => res.json())
      .then((autocompleteTitlesLT) => setAutocompleteTitleLT(autocompleteTitlesLT));
  }, []);

  useEffect(() => {
    fetch('/api/getTagsLT')
      .then((resp) => resp.json())
      .then((autocompleteTagsLT) => setAutocompleteTagLT(autocompleteTagsLT));
  }, []);

  /*Make a URL for search upon clicking button */
  const searchClick = () => {
    const url = new URL('https://example.com/api/search');
    if (titleValue !== '') {
      url.searchParams.append('cocktail', titleValue);
    }
    if (tagValue !== '') {
      url.searchParams.append('tag', tagValue);
    }
    if (checkboxes.first) {
      url.searchParams.append('short', 'true');
    }
    if (checkboxes.second) {
      url.searchParams.append('vegan', 'true');
    }
    return url.toString().substring(19);
  }

  /*format autosuggestions for both languages*/
  const formatResult = (item) => {
    return (
      <span style={{display: 'block', textAlign: 'left'}}>{lang === 'eng'? (item.title ? item.title : item.tag_en) : (item.title_lt ? item.title_lt : item.tag_lt)}</span>
    );
  }

  const handleSubmit = (e) => { /*Form used for ENTER key to work. Two inputs need a button within a form, included a dummy button. Including filters within form toggles their visibility. */
    e.preventDefault();
    url(searchClick());
  };

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
        {lang === 'eng'? <h2>Find a cocktail</h2> : <h2>Kokteiliu<span id='ogonek'>&#808;</span> paieška</h2>}
              <form onSubmit={handleSubmit}>
              <div className='input-autocomplete' style={{zIndex: 1}}>
                <ReactSearchAutocomplete
                  items={lang === 'eng'? autocompleteTitles : autocompleteTitlesLT}
                  onSelect={(item) => setTitleValue(item.id)}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={lang === 'eng'? {keys: ['title']} : {keys: ['title_lt']}}
                  resultStringKeyName={lang === 'eng'? 'title' : 'title_lt'}
                  placeholder={text.bytitle[i]}
                  showIcon={false}
                  onClear={() => setTitleValue('')}
                  styling={inputStyle}
                /> 
              </div>
              <div id='empty'></div>
              <div className='input-autocomplete'>
                <ReactSearchAutocomplete
                  items={lang === 'eng'? autocompleteTags : autocompleteTagsLT}
                  onSelect={(item) => setTagValue(item.id)}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={lang === 'eng'? {keys: ['tag_en']} : {keys: ['tag_lt']}}
                  resultStringKeyName={lang === 'eng'? 'tag_en' : 'tag_lt'}
                  placeholder={text.bytag[i]}
                  showIcon={false}
                  onClear={() => setTagValue('')}
                  styling={inputStyle}
                />
              </div>
              <button style={{display:'none'}}></button>
              </form> 
              <div className='filters'>
                <button id='filter-button' onClick={() => {setFilterVisibility(!filterVisibility) }}>
                  {filterVisibility ? <>{text.less[i]}&nbsp;<FontAwesomeIcon icon={faChevronUp} /></> : <>{text.more[i]}&nbsp;<FontAwesomeIcon icon={faChevronDown} /></>}
                </button>
                {filterVisibility && <Filters checkboxState={[checkboxes, setCheckboxes]}/>}
              </div>
              <button id='search-button' onClick={() => {url(searchClick()); document.getElementById('results').scrollIntoView({behavior: 'smooth', block: 'start'});}}>
                {text.search2[i]}<FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>     
        </div>    
      </div>
    </>
  )
}

export default Search;
import React, {useState, useEffect, useContext} from 'react'
import './Search.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { inputStyle } from './Styles';
import { LanguageContext } from '../App';

function Search(props) {

/*Language chosen */
const [language] = useContext(LanguageContext);
/*States */
const [filterVisibility, setFilterVisibility] = useState(false);
const [titleValue, setTitleValue] = useState("");
const [tagValue, setTagValue] = useState("");
const [checkbox1Marked, markCheckbox1] = useState(false);
const [checkbox2Marked, markCheckbox2] = useState(false);

/*Checkboxes for filtering */
const Filters = () =>

<div className='filter-container'>
    <label>
        <input type="checkbox" onClick={() => { markCheckbox1(!checkbox1Marked)}} />
        {checkbox1Marked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}&nbsp;
        { language === "english"? 'max. 3 ingredients' : '3 ingredientai ar mažiau' } 
    </label>
    <label>
        <input type="checkbox" onClick={() => {markCheckbox2(!checkbox2Marked)}} />
        {checkbox2Marked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}&nbsp;
        { language === "english"? 'vegan' : 'veganiški' } 
    </label>
</div>;

/*Fetch data for autocomplete search*/
let [autocompleteTitles, setAutocompleteTitle] = useState(""); /**pakeista cia */
let [autocompleteTags, setAutocompleteTag] = useState("");

  useEffect(() => {
    fetch("/api/getTitles")
      .then((res) => res.json())
      .then((autocompleteTitles) => setAutocompleteTitle(autocompleteTitles));
  }, []);

  useEffect(() => {
    fetch("/api/getTags")
      .then((resp) => resp.json())
      .then((autocompleteTags) => setAutocompleteTag(autocompleteTags));
  }, []);

  /*Make a URL for search upon clicking button */
  function searchClick() {

    let url = new URL("https://example.com/api/search");
    if (titleValue !== "") {
      url.searchParams.append('cocktail', titleValue);
    }
    if (tagValue !== "") {
      url.searchParams.append('tag', tagValue);
    }
    if (checkbox1Marked === true) {
      url.searchParams.append('short', 'true');
    }
    if (checkbox2Marked === true) {
      url.searchParams.append('vegan', 'true');
    }
    return url.toString().substring(19);
  }

  /*format autosuggestions */
  const formatResult = (item) => {
    return (
        <span style={{ display: 'block', textAlign: 'left' }}>{item.title ? item.title : item.tag_en}</span>
    )
  }

  const formatResultLT = (item) => {
    return (
        <span style={{ display: 'block', textAlign: 'left' }}>{item.title_lt ? item.title_lt : item.tag_lt}</span>
    )
  }

  const handleSubmit = (e) => { /*Form used for ENTER key to work. Two inputs need a button within a form, included a dummy button. Including filters within form toggles their visibility. */
    e.preventDefault();
    props.url(searchClick());
  };

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
        { language === "english"? <h2>Find a cocktail</h2> : <h2>Kokteiliu&#808; paieška</h2> }
              <form onSubmit={handleSubmit}>
              <div className="input-autocomplete" style={{zIndex: 1}}>
                <ReactSearchAutocomplete
                  items={autocompleteTitles}
                  onSelect={(item) => setTitleValue(item.id)}
                  autoFocus
                  formatResult={ language === "english"? formatResult : formatResultLT}
                  fuseOptions={{keys: ["id", "title"], minMatchCharLength: 2}}
                  resultStringKeyName={ language === "english"? "title" : "title_lt" }
                  placeholder={ language === "english"? "By title" : "Pagal pavadinimą"}
                  showIcon={false}
                  onClear={() => setTitleValue("")}
                  styling={inputStyle}
                /> 
              </div>
              <div id="empty"></div>
              <div className="input-autocomplete">
                <ReactSearchAutocomplete
                  items={autocompleteTags}
                  onSelect={(item) => setTagValue(item.id)}
                  autoFocus
                  formatResult={ language === "english"? formatResult : formatResultLT}
                  fuseOptions={{keys: ["id", "tag_en"], minMatchCharLength: 2}}
                  resultStringKeyName={ language === "english"? "tag_en" : "tag_lt" }
                  placeholder={ language === "english"? "By ingredient" : "Pagal ingredientą"}
                  showIcon={false}
                  onClear={() => setTagValue("")}
                  styling={inputStyle}
                />
              </div>
              <button style={{display:"none"}}></button>
              </form> 
              <div className='filters'>
                <button id='filter-button' onClick={() => {setFilterVisibility(!filterVisibility) }}>{ language === "english"? <>{filterVisibility ? "Less" : "More"}</> : <>{filterVisibility ? "Mažiau" : "Daugiau"}</> }&nbsp;
                  {filterVisibility ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </button>
                {filterVisibility && <Filters />}
              </div>
              <button id='search-button' onClick={() => props.url(searchClick())}>{ language === "english"? 'Search ' : 'Ieškoti ' }<FontAwesomeIcon icon={faMagnifyingGlass} /></button>     
        </div>    
      </div>
    </>
  )
}

export default Search
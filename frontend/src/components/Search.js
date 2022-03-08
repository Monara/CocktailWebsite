import React, {useState, useEffect} from 'react'
import './Search.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { inputStyle } from './Styles';

function Search(props) {

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
        {checkbox1Marked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
        &nbsp;3 ingredients or less
    </label>
    <label>
        <input type="checkbox" onClick={() => {markCheckbox2(!checkbox2Marked)}} />
        {checkbox2Marked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
        &nbsp;vegan
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

  const handleSubmit = (e) => { /*Form used for ENTER key to work. Two inputs need a button within a form, included a dummy button. Including filters within form toggles their visibility. */
    e.preventDefault();
    props.url(searchClick());
  };

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
              <h2>Find a cocktail</h2>
              <form onSubmit={handleSubmit}>
              <div className="input-autocomplete" style={{zIndex: 1}}>
                <ReactSearchAutocomplete
                  items={autocompleteTitles}
                  onSelect={(item) => setTitleValue(item.id)}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={{keys: ["id", "title"], minMatchCharLength: 2}}
                  resultStringKeyName="title"
                  placeholder="By title"
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
                  formatResult={formatResult}
                  fuseOptions={{keys: ["id", "tag_en"], minMatchCharLength: 2}}
                  resultStringKeyName="tag_en"
                  placeholder="By ingredient"
                  showIcon={false}
                  onClear={() => setTagValue("")}
                  styling={inputStyle}
                />
              </div>
              <button style={{display:"none"}}></button>
              </form> 
              <div className='filters'>
                <button id='filter-button' onClick={() => {setFilterVisibility(!filterVisibility) }}>{filterVisibility ? "Less" : "More"}&nbsp;
                  {filterVisibility ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </button>
                {filterVisibility && <Filters />}
              </div>
              <button id='search-button' onClick={() => props.url(searchClick())}>Search <FontAwesomeIcon icon={faMagnifyingGlass} /></button>     
        </div>    
      </div>
    </>
  )
}

export default Search
import React, {useState, useEffect} from 'react'
import './Search.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
        <input type="checkbox" onClick={() => { markCheckbox1(!checkbox1Marked) }} />
        {checkbox1Marked ? <FontAwesomeIcon className='' icon={faSquareCheck} /> : <FontAwesomeIcon className='' icon={faSquare} />}
        &nbsp;3 ingredients or less
    </label>
    <label>
        <input type="checkbox" onClick={ () => {markCheckbox2(!checkbox2Marked) }} />
        {checkbox2Marked ? <FontAwesomeIcon className='' icon={faSquareCheck} /> : <FontAwesomeIcon className='' icon={faSquare} />}
        &nbsp;vegan
    </label>
</div>;

/*Fetch data for autocomplete search*/
let [autocompleteTitles, setAutocompleteTitle] = useState(""); /**pakeista cia */
let [autocompleteTags, setAutocompleteTag] = useState("");

  useEffect(() => {
    fetch("/getTitles")
      .then((res) => res.json())
      .then((autocompleteTitles) => setAutocompleteTitle(autocompleteTitles));
  }, []);

  useEffect(() => {
    fetch("/getTags")
      .then((resp) => resp.json())
      .then((autocompleteTags) => setAutocompleteTag(autocompleteTags));
  }, []);

  /*Make a URL for search upon clicking button */
  function searchClick() {

    let url = new URL("https://example.com/search");
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
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.title ? item.title : item.tag_en}</span>
      </>
    )
  }

  /*Style input fields */
  const inputStyle =
  {
    height: "40px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "var(--blue)",
    boxShadow: "none",
    hoverBackgroundColor: "var(--lightblue)",
    color: "var(--almostblack)",
    fontSize: "calc(8px + 0.7vw)",
    fontFamily: "var(--font2)",
    iconColor: "var(--almostblack)",
    lineColor: "var(--almostblack)",
    placeholderColor: "var(--darkgray)",
    //zIndex: 2, //only for one
  };

  const handleKeyDown = (e) => {
    // ENTER
    if (e.keyCode === 13) {
      props.url(searchClick());
    }
  };

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
              <h2>Find a cocktail</h2>
              <div id="input-autocomplete">
                <ReactSearchAutocomplete
                  id="input-title"
                  items={autocompleteTitles}
                  onSelect={(item) => setTitleValue(item.title)}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={{keys: ["cocktail_id", "title"], minMatchCharLength: 2}}
                  resultStringKeyName="title"
                  placeholder="By title"
                  showIcon={false}
                  styling={inputStyle}
                />
                <ReactSearchAutocomplete
                  items={autocompleteTags}
                  onSelect={(item) => setTagValue(item.tag_en)}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={{keys: ["tag_id", "tag_en"], minMatchCharLength: 2}}
                  resultStringKeyName="tag_en"
                  placeholder="By ingredient"
                  showIcon={false}
                  styling={inputStyle}
                />
              </div>
              <div className='filters'>
                <button id='filter-button' onClick={ () => {setFilterVisibility(!filterVisibility) }}>{filterVisibility ? "Less" : "More"}&nbsp;
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
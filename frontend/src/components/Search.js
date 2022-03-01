import React, {useState, useEffect} from 'react'
import './Search.css';
import Autocomplete from "./Autocomplete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search(props) {

const [filterVisibility, setFilterVisibility] = useState(false);
const [titleValue, setTitleValue] = useState("");
const [tagValue, setTagValue] = useState("");
const [checkbox1Marked, markCheckbox1] = useState(false);
const [checkbox2Marked, markCheckbox2] = useState(false);


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

let [autocompleteTitles, setAutocompleteTitle] = useState(null);
let [autocompleteTags, setAutocompleteTag] = useState(null);

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

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
              <h2>Find a cocktail</h2>
              <Autocomplete placeholder={"By title"} data={autocompleteTitles} onChange={titleValue => setTitleValue(titleValue)}/>
              <Autocomplete placeholder={"By ingredient"} data={autocompleteTags} onChange={tagValue => setTagValue(tagValue)}/>  
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
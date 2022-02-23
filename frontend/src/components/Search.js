import React, {useState, useEffect} from 'react'
import './Search.css';
import img from "../imgs/mint.png";
import Autocomplete from "./Autocomplete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

function Search() {

const [filterVisibility, setFilterVisibility] = useState(false);
const [checkbox1Marked, markCheckbox1] = useState(false);
const [checkbox2Marked, markCheckbox2] = useState(false);

const Filters = () =>

<div className='filter-container'>
    <label className="filter">
        <input type="checkbox" onClick={() => { markCheckbox1(!checkbox1Marked) }} />
        {checkbox1Marked ? <FontAwesomeIcon className='' icon={faSquareCheck} /> : <FontAwesomeIcon className='' icon={faSquare} />}
        &nbsp;3 ingredients or less
    </label>
    <label className="filter">
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

  return (
    <>
      <div className='color-container'>
        <div className='search-container'>
            <div className='search-title'>
                <h2>Find a cocktail</h2>
                <img src={img} id='search-img' alt='' />
            </div> 
            <div id="search-area">
              <p>By title</p>
              <Autocomplete data={autocompleteTitles} />
              <p>By ingredient</p>
              <Autocomplete data={autocompleteTags} />
              <div className='filters'>
                <button id='filter-button' onClick={ () => {setFilterVisibility(!filterVisibility) }}>Filter&nbsp;
                  {filterVisibility ? <FontAwesomeIcon className='' icon={faChevronUp} /> : <FontAwesomeIcon className='' icon={faChevronDown} />}
                </button>
                {filterVisibility && <Filters />}
              </div>
		        </div>       
        </div>    
      </div>
    </>
  )
}

export default Search
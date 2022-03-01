/**modified from
 * source:
 * https://github.com/w3collective/react-autocomplete-search
 */
import { useState } from "react";
import './Autocomplete.css'

const Autocomplete = ({placeholder, data, onChange}) => {

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');

    const inputChanged = (value) => {
      setValue(value);
      onChange(value);
    };

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        inputChanged(query);
        if (query.length > 1) {
          const filterSuggestions = data.filter(
            (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
          );
          setSuggestions(filterSuggestions);
          setSuggestionsActive(true);
        } else {
          setSuggestionsActive(false);
        }
      };

      const handleClick = (e) => {
        setSuggestions([]);
        inputChanged(e.target.innerText);
        setSuggestionsActive(false);
      };
      
      const handleKeyDown = (e) => {
        // UP ARROW
        if (e.keyCode === 38) {
          if (suggestionIndex === 0) {
            return;
          }
          setSuggestionIndex(suggestionIndex - 1);
        }
        // DOWN ARROW
        else if (e.keyCode === 40) {
          if (suggestionIndex - 1 === suggestions.length) {
            return;
          }
          setSuggestionIndex(suggestionIndex + 1);
        }
        // ENTER
        else if (e.keyCode === 13) {
          inputChanged(suggestions[suggestionIndex]);
          setSuggestionIndex(0);
          setSuggestionsActive(false);
        }
      };

      const Suggestions = () => {
        return (
        <div className='suggestions'> 
          <ul>
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  className={index === suggestionIndex ? 'active' : 'non-active'}
                  key={index}
                  onClick={handleClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>   
        );
      };
    
      return (
        <div className='autocomplete'>
          <input
            type='text'
            className='search'
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {suggestionsActive && <Suggestions />}
        </div>
      );
      
};

export default Autocomplete;
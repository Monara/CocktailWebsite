import React, {useState, useContext} from 'react';
import './SearchResult.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { LanguageContext } from '../App';

function SearchResult(props) {

    const [language] = useContext(LanguageContext);

    let data = props.data;
    var img = "images/cocktail-img/" + data.id + ".png";
    var ingredients = data.ingredients.replace(/\n|\r\n/g, "<br>"); /*newlines and carriage returns in database */
    var ingredients_lt = data.ingredients_lt.replace(/\n|\r\n/g, "<br>"); /*newlines and carriage returns in database */

    let [garnishVal] = useState(data.garnish != null);

  return (

    <>
    <Tabs>
        <TabList className='tab-list'>
            <Tab className='tab'>{ language === "english" ? "Ingredients" : "Ingredientai" }</Tab>
            <Tab className='tab'>{ language === "english" ? "Details" : "Detalės" }</Tab>
        </TabList>
        <TabPanel>
        <div className='search-result-container'>
            <img src={img} className='search-result-img' alt='' />
            <div className='text'>
            {props.random && <p><b>{ language === "english" ? "Random cocktail:" : "Atsitiktinis kokteilis:" }</b></p>}
                <h3>{ language === "english" ? data.title : data.title_lt }</h3>
                <p dangerouslySetInnerHTML= { language === "english" ? {__html: ingredients} : {__html: ingredients_lt}}/>
            </div>
        </div>
        </TabPanel>
        <TabPanel>
            <div className='search-result-container'>
                <div className='text'>
                <h3>{ language === "english" ? "Instructions" : "Gamyba"}</h3>
                    <p>{ language === "english" ? data.method : data.method_lt }</p>
                    {garnishVal && <p>{ language === "english" ? data.garnish : data.garnish_lt }</p>} 
                    { language === "english" ? <p><b>Glass:</b> {data.glass}</p> : <p><b>Taurė:</b> {data.glass_lt}</p> }
                    { language === "english" ? <p><b>Source:</b> {data.category}</p> : <p><b>Šaltinis:</b> {data.category_lt}</p> }
                </div>
            </div>    
        </TabPanel>
    </Tabs>
    </>
  )
}

export default SearchResult
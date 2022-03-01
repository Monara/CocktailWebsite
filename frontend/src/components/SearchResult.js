import React, {useState} from 'react';
import './SearchResult.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function SearchResult(props) {

   let data = props.data;
   var img = "images/cocktail-img/" + data.cocktail_id + ".png";
    var ingredients = data.ingredients.replace(/\n|\r\n/g, "<br>"); /*newlines and carriage returns in database */

    let [garnishVal] = useState(data.garnish != null);

  return (
    <>
    <Tabs>
        <TabList className='tab-list'>
            <Tab className='tab'>Ingredients</Tab>
            <Tab className='tab'>Details</Tab>
        </TabList>
        <TabPanel>
        <div className='search-result-container'>
            <img src={img} className='search-result-img' alt='' />
            <div className='text'>
            {props.random && <p><b>Random cocktail:</b></p>}
                <h3>{data.title}</h3>
                <p dangerouslySetInnerHTML={{__html: ingredients}} />
            </div>
        </div>
        </TabPanel>
        <TabPanel>
            <div className='search-result-container'>
                <div className='text'>
                    <h3>Instructions</h3>
                    <p>{data.method}</p>
                    {garnishVal && <p>{data.garnish}</p>} 
                    <p><b>Glass:</b> {data.glass}</p>
                    <p><b>Source:</b> {data.category}</p>
                </div>
            </div>    
        </TabPanel>
    </Tabs>
    </>
  )
}

export default SearchResult
import React, {useState, useContext} from 'react';
import './SearchResult.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {LangContext} from '../App';
import {text} from './Text';


const SearchResult = ({data, random}) => {

    const [lang] = useContext(LangContext);
    const [garnishVal] = useState(data.garnish != null);
    const img = 'images/cocktail-img/' + data.id + '.png';
    const ingredients = data.ingredients.replace(/\n|\r\n/g, '<br>'); /*newlines and carriage returns in database */
    const ingredients_lt = data.ingredients_lt.replace(/\n|\r\n/g, '<br>'); /*newlines and carriage returns in database */
    const i = (lang === 'eng' ? 0 : 1); /*index for translations in text object arrays*/

    return (
        <div>
            <Tabs>
                <TabList className='tab-list'>
                    <Tab className='tab'>{text.tab1[i]}</Tab>
                    <Tab className='tab'>{text.tab2[i]}</Tab>
                </TabList>
            
                <TabPanel>
                <div className='search-result-container'>
                    <img src={img} className='search-result-img' alt='' />
                    <div className='text'>
                    {random && <p><b>{text.rand[i]}</b></p>}
                        <h3>{lang === 'eng' ? data.title : data.title_lt}</h3>
                        <p dangerouslySetInnerHTML= {lang === 'eng' ? {__html: ingredients} : {__html: ingredients_lt}}/>
                    </div>
                </div>
                </TabPanel>

                <TabPanel>
                    <div className='search-result-container'>
                        <div className='text'>
                        <h3>{text.instr[i]}</h3>
                            <p>{lang === 'eng' ? data.method : data.method_lt}</p>
                            {garnishVal && <p>{lang === 'eng' ? data.garnish : data.garnish_lt}</p>} 
                            <p><b>{text.glass[i]}</b>{lang === 'eng' ? data.glass : data.glass_lt}</p>
                            <p><b>{text.src[i]}</b>{lang === 'eng' ? data.category : data.category_lt}</p>
                        </div>
                    </div>    
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default SearchResult;
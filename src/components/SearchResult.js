import React, { useState } from 'react';
import './SearchResult.css';
import img from "../images/cocktail-img/4.png";
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function SearchResult() {
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
            <div className='result-description'>
                <h3>Alexandra</h3>
                <p>30 ml cognac<br />
                    30 ml creme de cacao (light)<br />
                    30 ml cream</p>
            </div>
        </div>
        </TabPanel>
        <TabPanel>
            <div className='search-result-container'>
                <div className='left-col'>
                    <h3>How to make it</h3>
                    <p>Shake all ingredients in a shaker with ice. Strain into a glass.</p>
                    <p>Glass: cocktail</p>
                </div>
                <div className='right-col'>
                    <h3>Garnish</h3>
                    <p>Sprinkle cocoa powder on top.</p>
                    <p>Source: IBA</p>
                </div>
            </div>    
        </TabPanel>
    </Tabs>
    </>
  )
}

export default SearchResult
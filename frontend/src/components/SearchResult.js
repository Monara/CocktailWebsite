import React, { useEffect, useState } from 'react';
import './SearchResult.css';
import img from "../images/cocktail-img/73.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function SearchResult(props) {

   let data = props.data; 

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
            <div className='right-col'>
                <h3>{data.title}</h3>
                <p>{data.ingredients}</p>
            </div>
        </div>
        </TabPanel>
        <TabPanel>
            <div className='search-result-container'>
                <div className='left-col'>
                    <h3>How to make it</h3>
                    <p>{data.method}</p>
                    <p>Glass: {data.glass}</p>
                </div>
                <div>
                    <h3>Garnish</h3>
                    <p>{data.garnish}</p>
                    <p>Source: {data.category}</p>
                </div>
            </div>    
        </TabPanel>
    </Tabs>
    </>
  )
}

export default SearchResult
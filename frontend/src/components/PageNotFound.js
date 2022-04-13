import React from 'react';
import './PageNotFound.css';
import img from '../imgs/draw.svg';

const PageNotFound = ({text}) => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h1>{text}</h1>
        <img src={img} id='draw-img' alt='' />
    </div>
  );
}

export default PageNotFound;
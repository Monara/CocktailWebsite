import React from 'react'
import './PageNotFound.css'
import img from "../imgs/draw.svg";

function PageNotFound({text}) {
  return (
    <div className='not-found'>
        <h2>404</h2>
        <h2>{text}</h2>
        <img src={img} id='draw-img' alt="" />
    </div>
  )
}

export default PageNotFound;
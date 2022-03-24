import React, { useState } from 'react';
import './Heading.css';
import { Link } from 'react-router-dom'; 
import img from "../imgs/heading-img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { LanguageContext } from '../App';

function Heading() {

    const language = useContext(LanguageContext);
    const [menuVisibility, setMenuVisibility] = useState(false);
    const Dropdown = () =>  
    
    <div className="menu-dropdown">
        <ul>
            <Link to="/lt">
                { language === "english"? <li>LT</li> : <li>EN</li> }
            </Link>
            <Link to="/info">
                <li>Info</li>
            </Link>
        </ul>
    </div>;

    function menuClick() {
        setMenuVisibility(!menuVisibility);
    }

  return (
      <>
      <div>
      <div className='heading-container'>
        <div className='menu-container'>
            <button id='menu-button' onClick={menuClick} >
            {menuVisibility ? <FontAwesomeIcon className='menu-icon' icon={faClose} /> : <FontAwesomeIcon className='menu-icon' icon={faBars} />}
            </button>
            {menuVisibility && <Dropdown />}
            <div className='heading-title'>
                <div className='heading-text'>
                { language === "english"? <><h1>The Cocktail Party</h1><p>Classic cocktail recipes</p></> : <><h1>Kokteilių vakarėlis</h1><p>Klasikinių kokteilių receptai</p></>}
                </div>
                <img src={img} id='heading-img' alt="" />
            </div>        
        </div>   
      </div>
      <svg id='wave' viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0.56,1.47 C172.12,132.72 311.51,-59.70 507.90,21.22 L497.74,-38.97 L0.00,-0.48 Z"></path>
    </svg>
    </div> 
      </>
  )
}

export default Heading;
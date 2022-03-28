import React, { useState, useContext } from 'react';
import './Heading.css';
import { Link } from 'react-router-dom'; 
import img from "../imgs/heading-img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../App';

function Heading() {

    const [language, setLanguage] = useContext(LanguageContext);
    const [menuVisibility, setMenuVisibility] = useState(false);

    function menuClick() {
        setMenuVisibility(!menuVisibility);
    }

    const Dropdown = () =>  
    
    <div className="menu-dropdown">
        <ul>
            <Link to="" onClick={() => {language === "english"? setLanguage("lithuanian") : setLanguage("english")}}>
                { language === "english"? <li>LT</li> : <li>EN</li> }
            </Link>
            <Link to="/">
                { language === "english"? <li>Search</li> : <li>Paieška</li> }
            </Link>
            <Link to="/info">
                <li>Info</li>
            </Link>
        </ul>
    </div>;

  return (
      
    <div>
      <div className='heading-container'>
        <div className='menu-container'>
            <button id='menu-button' onClick={menuClick} >
            {menuVisibility ? <FontAwesomeIcon className='menu-icon' icon={faClose} /> : <FontAwesomeIcon className='menu-icon' icon={faBars} />}
            </button>
            {menuVisibility && <Dropdown />}
            <div className='heading-title'>
                <div className='heading-text'>
                { language === "english"? <><h1>The Cocktail Party</h1><p>Classic cocktail recipes</p></> : <><h1>Kokteiliu&#808; vakar<span id="dot">&#729;</span>elis</h1><p>Klasikinių kokteilių receptai</p></>}
                </div>
                <img src={img} id='heading-img' alt="" />
            </div>        
        </div>   
      </div>
      <svg id='wave' viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0.56,1.47 C172.12,132.72 311.51,-59.70 507.90,21.22 L497.74,-38.97 L0.00,-0.48 Z"></path>
      </svg>
    </div>
  )
}

export default Heading;
/**Frederika The Great font doesn't support most of Lithuanian letters, improvizing with diacritics */
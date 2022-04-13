import React, {useState, useContext} from 'react';
import './Heading.css';
import {Link} from 'react-router-dom'; 
import img from '../imgs/heading-img.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faClose} from '@fortawesome/free-solid-svg-icons';
import {LangContext} from '../App';
import {text} from './Text';

const Heading = () => {

    const [lang, setLang] = useContext(LangContext);
    const [menuVisibility, setMenuVisibility] = useState(false);

    const menuClick = () => {
        setMenuVisibility(!menuVisibility);
    }

    const i = (lang === 'eng' ? 0 : 1); /*index for translations in text object arrays*/

    const Dropdown = () =>  
        <div className='menu-dropdown'>
            <ul>
                <Link to='' onClick={() => {lang === 'eng'? setLang('lt') : setLang('eng'); menuClick()}}>
                    <li>{text.other_lang[i]}</li>
                </Link>
                <Link to='/' onClick={menuClick}>
                    <li>{text.search[i]}</li>
                </Link>
                <Link to='/info' onClick={menuClick}>
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
                {lang === 'eng'? <h1>The Cocktail Party</h1> : <h1>Kokteiliu<span id="ogonek">&#808;</span> vakar<span id="overdot">&#729;</span>elis</h1>}
                <p>{text.subtitle[i]}</p>
                </div>
                <img src={img} id='heading-img' alt='' />
            </div>        
        </div>   
      </div>
      <svg id='wave' viewBox='0 0 500 150' preserveAspectRatio='none'>
            <path d='M0.56,1.47 C172.12,132.72 311.51,-59.70 507.90,21.22 L497.74,-38.97 L0.00,-0.48 Z'></path>
      </svg>
    </div>
  );
}

export default Heading;
/**Frederika The Great font doesn't support most of Lithuanian letters, improvizing with diacritics */
import React, { useState } from 'react';
import './Heading.css';
import { Link } from 'react-router-dom'; 
import img from "../imgs/heading-img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function Heading() {

    const [menuVisibility, setMenuVisibility] = useState(false);
    const Dropdown = () =>  
    
    <div className="menu-dropdown">
        <ul>
            <li className='menu-item'>
                <Link to="/">LT</Link>
            </li>
            <li className='menu-item'>
                <Link to="/">Info</Link>
            </li>
        </ul>
    </div>;

    function menuClick() {
        setMenuVisibility(!menuVisibility);
    }

  return (
      <>
      <div className='heading-container'>
        <div className='menu-container'>
            <button id='menu-button' onClick={menuClick} >
            {menuVisibility ? <FontAwesomeIcon className='menu-icon' icon={faClose} /> : <FontAwesomeIcon className='menu-icon' icon={faBars} />}
            </button>
            {menuVisibility && <Dropdown />}
            <div className='heading-title'>
                <img src={img} id='heading-img' alt="" />
                <div className='heading-text'>
                    <h1>The Cocktail Party</h1>
                    <p>Classic cocktail recipes</p>
                </div>
            </div>        
        </div>    
      </div>
      </>
  )
}

export default Heading;
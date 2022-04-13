import './Footer.css';
import React from 'react';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='text-container'>
        <p className='small-par'>&#169; CocktailParty.lt 2022.</p> 
        <p className='small-par'><a href='mailto:thecocktailparty@pm.me?subject=New message for TheCocktailParty'>thecocktailparty@pm.me</a></p>
        </div>      
    </div>
  );
}

export default Footer;
import React from 'react';
import './InfoPage.css';
import Heading from './components/Heading';
import {EngText, LtText} from './components/Text';
import Footer from  './components/Footer';
import ScrollUpButton from "react-scroll-up-button";
import { scrollStyle } from './components/Styles';


function InfoPage() {
  return (
    <div className='Home'>      
      <Heading />
      <div className='content'>
        <LtText />
      </div>
      <ScrollUpButton 
          StopPosition={0}
          ShowAtPosition={300}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
          style={scrollStyle}
          ToggledStyle={{}}
        />
      <Footer />
    </div>
  )
}

export default InfoPage
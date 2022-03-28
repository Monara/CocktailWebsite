import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import InfoPage from './InfoPage';
import PageNotFound from  './components/PageNotFound';

export const LanguageContext = createContext();

function App() {

  const [language, setLanguage] = useState("english");

  return (
    
    <LanguageContext.Provider value={[language, setLanguage]}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} /> 
            <Route path="/info" exact element={<InfoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageContext.Provider>
    
  );
}

export default App;
 /**The actual context changes happen in Heading component, but the Provider needs to be above the useContext readers*/
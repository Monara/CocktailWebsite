import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PageNotFound from  './components/PageNotFound';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} /> 
          <Route path="/lt" exact element={<PageNotFound text="Puslapis kuriamas"/>} />
          <Route path="/info" exact element={<PageNotFound text="Page under construction" />} />
          <Route path="*" element={<PageNotFound text="Page not found"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
/*unique key to avoid warning*/
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from "react";
import Home from './Home';
import InfoPage from './InfoPage';
import PageNotFound from  './components/PageNotFound';

export const LanguageContext = createContext("lithuanian");

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} /> 
          <Route path="/lt" exact element={<PageNotFound text="Puslapis kuriamas"/>} />
          <Route path="/info" exact element={<InfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 /**<Route path="/" element={<PageNotFound text="Page not found"/>} /> */
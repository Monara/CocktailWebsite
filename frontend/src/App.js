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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 /**<Route path="/" element={<PageNotFound text="Page not found"/>} /> */
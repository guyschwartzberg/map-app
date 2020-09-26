import React from 'react';
import logo from './logo.svg';
import SearchBar from './Search-bar'
import useLocalStorage from './utils/localStorage'
import Test from './Test'
import Map from './Map'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

function App() {
  const [data, addToData] = useLocalStorage('data', []);

  return (
    <div className="container">
    <div className="main-content">
      <h1 > כמה ערים בישראל אתה מכיר? </h1> 
        <SearchBar addToData={addToData} data={data}> </SearchBar>
        <Map data={data}> </Map>
    </div>
    </div>
  );
}

export default App;

import React from 'react';
import SearchBar from './Search-bar'
import useLocalStorage from './utils/localStorage'
import { Layout } from 'antd'
import Map from './Map'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

function App() {
  const [data, addToData] = useLocalStorage('data', []);

  const { Content, Footer } = Layout;

  return (
    <Layout> 
      <Content>
    <div className="container">
    <div className="main-content">
      <h1 > כמה ערים בישראל אתה מכיר? </h1> 
        <SearchBar addToData={addToData} data={data}> </SearchBar>
        <Map data={data}> </Map>
    </div>
    </div>
    </Content>
    <Footer style={{ textAlign: 'center', marginTop: '20px'}}> Created by Guy Schwartzberg </Footer>
    </Layout>
  );
}

export default App;

// import { useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'


const App = () => {
  return (
    <div className="App">
     <Header/>

     <div className="App-header">
       <div>Search Bar</div>
       <div>Dropdown Filter</div>
     </div>
     <Footer/>
    </div>
  );
 
}

export default App;

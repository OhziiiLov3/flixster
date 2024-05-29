// import { useState } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import MovieList from './components/MovieList';


const App = () => {
  return (
    <div className="App">
     <Header/>

     <div className="App-header">
       <div>Search Bar</div>
       <div>Dropdown Filter</div>
     </div>
     
     <MovieList/>
     <Footer/>
    </div>
  );
 
}

export default App;

import React from 'react';
import './App.css';
import {useState, useEffect} from 'react'
import Movie from './Movie';
import Filter from './Filter';
import { motion, AnimatePresence } from 'framer-motion';


function App() {

  let [popular, setPopular] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [activeGenre, setActiveGenre] = useState(0);
  

  useEffect(() => {
    fetchPopular();
  }, []);

  let fetchPopular = async () =>{
    let data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=627f30cf94703e69f309da4305da97bd&language=en-US&page=1");
    let movies = await data.json();
    console.log(movies)
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  
  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
    <motion.div layout className="popular-movies">
      <AnimatePresence>  
       {filtered.map((movie) =>{
       return <Movie key={movie.id} movie={movie} />;
      })}
      </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;

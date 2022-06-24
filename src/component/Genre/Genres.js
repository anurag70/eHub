import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react';
import { Chip } from "@material-ui/core";
import "./Genres.css";

const Genres = ({ selectedGenres,
   setSelectedGenres,
   genres,
   setGenres,
   type,
   setPage,
}) => {
   const handleAdd = (genre) => {
    //1st add
      setSelectedGenres([...selectedGenres, genre]);
      //now remove from remaining
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

   const handleRemove = (genre) => {
     //1st remove
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
      );
      //now add
    setGenres([...genres, genre]);
    setPage(1);
  };

   const fetchGenres = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      
      setGenres(data.genres);
   };
   console.log(genres);
   useEffect(() => {
      fetchGenres();
      //here we are returning so that after refresh the chip component back to as it was
      return () => {
         //so make it empty
         setGenres({});
     };
     // eslint-disable-next-line
   }, [])
  return (
    <div className="gn">
      {selectedGenres.map((genre) => (
        <Chip 
          style={{ margin: "3px",fontSize:"1vw" }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip 
          style={{ margin: "3px",fontSize:"1vw"}}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
}

export default Genres;

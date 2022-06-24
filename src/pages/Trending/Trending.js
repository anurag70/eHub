import React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';
import SingleContent from '../../component/SingleContent/SingleContent';
import CustomPagination from '../../component/Pagination/CustomPagination';
import "./Trending.css";



const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {

  //adding page atlast as when we will be at page=2,it will again call the api key
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    //console.log(data.results)
    setContent(data.results);//results is the key in api
  };
//here we are adding page dependency,everytime the page is updated to a new one the whole code will run again
  useEffect(() => {
    fetchTrending();
    
  }, [page]);
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        
        
          {content && content.map((c) => (
            //console.log(c),
            
            //now create a newcontent(card)(singlecontent) to fill the content inside this
            <SingleContent key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))
        }
      </div>
      <CustomPagination setPage={setPage} />
      
    </div>
  );
};

export default Trending;

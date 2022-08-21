import { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../component/SingleContent/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";
import "./Movies.css";
import Genres from "../../component/Genre/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  //select genres
  const [genres, setGenres] = useState([]);
  //set selected genres
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  //send selected genres to useGenre hook as props
  const genreforURL = useGenre(selectedGenres);
  // console.log(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      //set the url for movies and series because then the api will search on basis of genres
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}
      &with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
    //use genreforurl as dependency so that when the genre is changed the url will change and pade will refresh
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

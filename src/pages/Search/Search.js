import { Button, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import "./Search.css";
//import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../component/Pagination/CustomPagination";
import SingleContent from "../../component/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  //searchtext is for text of searchbox
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  //for dark theme
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  console.log(searchText);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        //whatever we are typing on the search box it will paste in the url
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
    //whenever the type or page is changed it will call fetchsearch fn again
  }, [searchText, type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={onChange}
          />
          {/*<Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            
            <SearchIcon fontSize="large" />
  
          </Button>
  */}
        </div>

        {/* for movie and series */}
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            //whenever we click on search movies or series it will change state
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="search">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {/* when searchtext is not empty but on that name no content is present */}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;

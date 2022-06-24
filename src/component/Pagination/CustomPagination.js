import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";
import React from 'react'

//custom theme for pagination
const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({setPage,numOfPages = 10}) => {
   const handlePageChange = (page) => {
      //setPage coming from trending.js(pagination)
   setPage(page);
   window.scroll(0, 0);
   }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontSize:"40px",
        marginTop:"8px",
      }}>
      
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
      
    </div>
  )
}

export default CustomPagination

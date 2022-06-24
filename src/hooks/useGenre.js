//custom hook
//fn with soe logic which we will again and again


//selectedGenres has two valus name and id

//here we pass the selectedgenres which we get from the array when we select the diff. genres
const useGenres = (selectedGenres) => {
   if (selectedGenres.length < 1) return "";

   const GenreIds = selectedGenres.map((g) => g.id);
   //accumulator and current value
   //acc is the main value inside which we are going to add everything
   //at1st acc has the 1st value of the array
   //then we will add the current value
   return GenreIds.reduce((acc, curr) => acc + "," + curr);
};
export default useGenres;


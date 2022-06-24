import Header from "./component/Header/Header";

import "./App.css";
import SimpleBottomNavigation from "./component/MainNav";
import { Container } from "@material-ui/core";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import { Switch,BrowserRouter,Route } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
    
}

export default App;

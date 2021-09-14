import "./App.css";

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Favorites from "./components/Favorites";
import RecipeDetail from "./components/RecipeDetail";
import Nav from "./components/Nav";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import ShoppingList from "./components/ShoppingList";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route
          path={[
            "/home",
            "/recipes/:id",
            "/favorites",
            "/addRecipe",
            "/shoppingList",
          ]}
          component={Nav}
        />
        <Route path="/home" component={Home} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/addRecipe" component={AddRecipe} />
        <Route path="/shoppingList" component={ShoppingList} />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

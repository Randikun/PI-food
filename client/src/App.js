import './App.css';

import React from "react";
import { Route, BrowserRouter, Switch} from "react-router-dom";

import Favorites from "./components/Favorites";
import RecipeDetail from "./components/RecipeDetail";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddRecipe from "./components/AddRecipe";
import ShoppingList from "./components/ShoppingList";
import LandingPage from "./components/LandingPage";




function App() {
  return (
      <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path='/' component={Nav} />
          <Route path="/home" component={Home} />
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/favorites" component={Favorites} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/addRecipe' component={AddRecipe} />
          <Route path='/shoppingList' component={ShoppingList} />
        </Switch>
      </React.Fragment>
      </BrowserRouter>
      )
}

export default App;

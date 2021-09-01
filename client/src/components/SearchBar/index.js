import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import getRecipes from "../../actions/getRecipes";
import {AddRecipeFav} from "../../actions"

//si mi componente fuese funcional tendria
// function Buscador(props){
//  const [input, setInput] = useState({Title:"", description=""})
//   function HandleChange(e){
//        setInput((prev)=>{...prev} [e.target.title]:[e.target.value])
//}
// return <div></div>
//}


export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {                                             
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({title:""})
    this.props.getRecipes([this.state.title])
  }
  

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Search for your recipe </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          
          <button type="submit">SEARCH</button>
        </form>
        <ul>
         {
         this.props.recipes.map(recipe=> {
           return <li key={recipe.id}>
             <Link to={`/recipes/${recipe.id}`}><div>{recipe.Title}</div></Link>
             <button onClick={()=>this.props.AddRecipeFav(recipe)}>AGREGAR A FAVORITOS</button>
             </li> 
         })
         }
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
     getRecipes: (title)=>dispatch(getRecipes(title)),
     AddRecipeFav: (recipe)=>dispatch(AddRecipeFav(recipe))
  }
}


function mapStateToProps(state){
  return{
    recipes: state.recipesLoaded
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { removeRecipeFav } from "../../actions";

export function Favorites(props){
  
    return (
      <div>
        <h2>Recetas Favoritas</h2>
        <ul>
          
          {       
          props.favorites.map(fav=> {
            return <li key={fav.id}>
              
              <Link to={`/recipe/${fav.id}`}><div>{fav.Title}</div></Link>
              <button onClick={()=>props.removeRecipeFav(fav.id)}>X</button>
              </li>
          })}
        </ul>
      </div>
    );
  }

function mapStateToProps(state){
     return {
       favorites: state.favoriteRecipes
     }
}
function mapDispatchToProps(dispatch){
     return {
      removeRecipeFav: (id)=>dispatch(removeRecipeFav(id))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

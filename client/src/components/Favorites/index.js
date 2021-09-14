import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import s from './fav.module.css'

export function Favorites(props){
  const favorites = useSelector(state=>state.favoriteRecipes)
    return (
      <div className={`${s.favorites}`}>
          <div className={`${s.container}`}>
             <h2>Take a look at your favorite recipes!</h2>
            {favorites?
            <div className={`${s.cards}`}>         
            {       
            favorites.map(fav=> {
              return(<div key={fav.id}>
                
                
                <Card recipe={fav} id={fav.id} title={fav.title} image={fav.image} diets={fav.Diets}/>
                
                </div>)
            })}
          </div>
          :null
           }
          </div>
      </div>
     
    );
  }



export default Favorites;

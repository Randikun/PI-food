import React from 'react';
import { useSelector  } from 'react-redux';
import Ingredient from '../Ingredient'
import s from './ingredients.module.css'


export function Ingredients() {

  const ingredients = useSelector(state=>state.ingredients)

  return (
    <div className={`${s.ingredients}`}>
      
      {
     ingredients.map(ingredient => {
      return(
        <li className={`${s.li}`} key={ingredient.id}>
          <Ingredient ingredient={ingredient}/>
        </li>
      )   
   
      })}
    
    </div>
  )
};


  
  export default Ingredients;
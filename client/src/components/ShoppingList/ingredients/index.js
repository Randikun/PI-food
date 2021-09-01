import React from 'react';
import { connect } from 'react-redux';


export function Ingredients(props) {
  return (
    <div>
      
      {
     props.ingredients.map(Ingredient => (
      
        <li key={Ingredient.id}>
          <Ingredient ingredient={Ingredient}/>
        </li>
    
   
     ))}
    
    </div>
  )
};

function mapStateToProps(state) {
  return {
  ingredients: state.ingredients,
  };
  }
  
  export default connect(mapStateToProps)(Ingredients);
import React from 'react';
import { connect } from 'react-redux';
import { removeIngredient } from '../../../actions';

export function Ingredient({title, id}) {
  return (
    <div>
      {title}
    
     <button
     onClick={() => removeIngredient(id)} >
    Remove
   </button>
   </div>
  )
};


export default connect(null, {removeIngredient})(Ingredient);

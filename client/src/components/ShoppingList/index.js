import React from 'react';
import Ingredients from './ingredients';
import AddIngredient from './addIngredient'


export function ShoppingList() {
  return (
    <div>
    <Ingredients/>
    <AddIngredient/>
    </div>
  )   
};

export default ShoppingList;
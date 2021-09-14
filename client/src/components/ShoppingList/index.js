import React from 'react';
import Ingredients from './ingredients';
import AddIngredient from './addIngredient'
import s from './shop.module.css'


export function ShoppingList() {
  return (
    <div className={`${s.shop}`}>
      <div className={`${s.list}`}>
     <AddIngredient/> 
     <Ingredients/>
      </div>
    </div>
  )   
};

export default ShoppingList;
import React from "react";
import { useDispatch } from "react-redux";
import { removeIngredient } from "../../../actions";
import s from "./ingredient.module.css";
// import * as TiIcons from 'react-icons/ti'

export function Ingredient(props) {
  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(removeIngredient(props.ingredient.id));
  }
  return (
    <div className={`${s.ingredient}`}>
      <span>{props.ingredient.ingredient}</span>
      {/* <TiIcons.TiDeleteOutline  className={`${s.icon}`}  onClick={(e) => handleClick(e)}></TiIcons.TiDeleteOutline> */}
      <div className={`${s.iconCont}`}>
        <div className={`${s.x}`} onClick={(e) => handleClick(e)}>
          x
        </div>
      </div>
    </div>
  );
}

export default Ingredient;

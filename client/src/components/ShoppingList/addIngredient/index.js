import React from "react";
import { connect } from "react-redux";
import { addIngredient } from "../../../actions";
import * as ImIcons from "react-icons/im";
import s from "./addIngredient.module.css";

export function AddIngredient({ addIngredient }) {
  const [ingredient, setIngredient] = React.useState("");

  function handleChange(e) {
    setIngredient(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    addIngredient(ingredient);
    setIngredient("");
  }

  return (
    <div className={`${s.wrap}`}>
      <form className={`${s.form}`} onSubmit={(e) => handleClick(e)}>
        <input
          className={`${s.input}`}
          autoComplete="off"
          type="text"
          name="title"
          value={ingredient}
          placeholder="ingredients"
          onChange={(e) => handleChange(e)}
        />
        <ImIcons.ImPencil2
          className={`${s.icon}`}
          type="Submit"
          onClick={(e) => handleClick(e)}
        ></ImIcons.ImPencil2>
      </form>
    </div>
  );
}

export default connect(null, { addIngredient })(AddIngredient);

import React from "react";
import { addRecipeFav, removeRecipeFav, removeRecipe } from "../../actions";
import s from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Card(props) {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favoriteRecipes);

  // <Link  to={`/recipes/${props.id}`}>

  return (
    <div>
      <div className={`${s.container}`}>
        <img src={props.image} alt="not found" />
        <div className={`${s.details}`}>
          <Link to={`/recipes/${props.id}`}>
            <h2>{props.title}</h2>
          </Link>
          <div className={`${s.more}`}>
            <div className={`${s.diets}`}>
              {props.diets?.map((diet) => (
                <span className={`${s.diet}`} key={diet.name}>
                  {diet.name}
                </span>
              ))}
            </div>
            <div className={`${s.iconCont}`}>
              <div className={`${s.icons}`}>
                {favs.includes(props.recipe) ? (
                  <MdIcons.MdFavorite
                    onClick={() => dispatch(removeRecipeFav(props.id))}
                  ></MdIcons.MdFavorite>
                ) : (
                  <MdIcons.MdFavoriteBorder
                    onClick={() => dispatch(addRecipeFav(props.recipe))}
                  ></MdIcons.MdFavoriteBorder>
                )}
                <TiIcons.TiDelete
                  onClick={() => dispatch(removeRecipe(props.id))}
                ></TiIcons.TiDelete>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

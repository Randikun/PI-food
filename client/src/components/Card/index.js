import React, {useState} from "react";
import removeRecipe  from "../../actions/removeRecipe";
import s from "./card.module.css";
import { useDispatch} from "react-redux";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import { Link } from "react-router-dom";
import { saveFavState, removeFavState, loadFavState } from "../../localStorage";
import Swal from "sweetalert2";


export default function Card(props) {
  const dispatch = useDispatch()
  // const history = useHistory()
  var favorites = loadFavState();
  const [favs, setFavs] = useState("");

  function handleDelete(recipe) {
    Swal.fire({
      title: "Are you sure? ",
      text: "There's no turn back",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeRecipe(recipe.id))
        Swal.fire({
          title: "Deleted!",
          text: `it's gone.`,
          imageUrl: "https://i.gifer.com/7efs.gif",
          imageWidth: 250,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    });
  }

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
                {favorites.includes(JSON.stringify(props.recipe)) ? (
                  <MdIcons.MdFavorite
                    onClick={() => {
                      removeFavState(props.recipe);
                      favorites = loadFavState();
                      setFavs("eliminado de favs");
                      console.log(favs)
                    }}
                  ></MdIcons.MdFavorite>
                ) : (
                  <MdIcons.MdFavoriteBorder
                    onClick={() => {
                      saveFavState(props.recipe);
                      favorites = loadFavState();
                      setFavs("agregado a favs");
                      console.log(favs)
                    }}
                  ></MdIcons.MdFavoriteBorder>
                )}
                <TiIcons.TiDelete
                  onClick={() =>handleDelete(props.recipe)}
                ></TiIcons.TiDelete>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

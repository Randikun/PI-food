import React from "react";
import { loadFavState} from "../../localStorage";
import Card from "../Card";
import s from "./fav.module.css";

export function Favorites(props) {
  const favorites = loadFavState();
  favorites.shift()
    return (
    <div className={`${s.favorites}`}>
      <div className={`${s.container}`}>
        <h2>Take a look at your favorite recipes!</h2>
        {favorites ? (
          <div className={`${s.cards}`}>
            {favorites.map((fav) => {
            const parsedFav = JSON.parse(fav)

              return (
                <div key={parsedFav.id}>
                  <Card
                    recipe={parsedFav}
                    id={parsedFav.id}
                    title={parsedFav.title}
                    image={parsedFav.image}
                    diets={parsedFav.Diets}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Favorites;

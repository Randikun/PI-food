import { React } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./detail.module.css";
import getRecipeDetail from "../../actions/getRecipeDetail";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();

  const recipeDetail = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={`${s.container}`}>
      {recipeDetail ? (
        <div className={`${s.recipe}`}>
          <img
            className={`${s.img}`}
            src={recipeDetail.image}
            alt="not found"
          />

          <div className={`${s.detail}`}>
            <div className={`${s.header}`}>
              <h2>{recipeDetail.title}</h2>
              <div className={`${s.cajita}`}>
                <span className={`${s.score}`}>{recipeDetail.score}</span>
                <span className={`${s.flag}`}>Score</span>
                <span className={`${s.score}`}>{recipeDetail.healthiness}</span>
                <span className={`${s.flag}`}>Healthiness</span>
              </div>
            </div>
            {recipeDetail.Diets?.map((diet) => (
              <span key={diet.name} className={`${s.diet}`}> {diet.name}</span>
            ))}
            <span className={`${s.summary}`}>{recipeDetail.summary}</span>
            {recipeDetail.steps ? (
              <div>
                <span className={`${s.flag}`}>Step by step</span>
                <span>{recipeDetail.steps}</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
}

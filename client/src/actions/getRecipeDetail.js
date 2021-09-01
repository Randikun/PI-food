import { GET_RECIPE_DETAIL } from ".";

export default function getRecipeDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes/${id}`) //busca segun mi id
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_RECIPE_DETAIL, payload: json }); //despacha una accion que el reducer SI puede reconocer cuyo payload es la data from API
        });
    }

}
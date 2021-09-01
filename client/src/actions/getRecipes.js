import { GET_RECIPES } from ".";

export default function getRecipes(title){
    //aca va el llamado a la API
    //como es asincrono usamos thunk, entonces esta accion retorna una funcion que hace el llamado
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes?name=${title}`) //busca segun mi title
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_RECIPES, payload: json }); //despacha una accion que el reducer SI puede reconocer cuyo payload es la data from API
        });
    }
}
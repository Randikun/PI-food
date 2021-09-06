import { GET_RECIPES } from ".";
import axios from 'axios'

export default function getRecipes(title){
    return async function(dispatch){
        try{
        const response= await axios(`http://localhost:3001/recipes?name=${title}`) 
        return dispatch({ type: GET_RECIPES, payload: response.data });
        }catch(err){console.log(err)}
    }

}
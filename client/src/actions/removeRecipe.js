import { REMOVE_RECIPE } from ".";
import axios from 'axios'

export default function removeRecipe(id){
    return async function(dispatch){
        try{
        const response= await axios.delete(`http://localhost:3001/recipes/${id}`) 
        return dispatch({ type: REMOVE_RECIPE, payload: response.data });
        }catch(err){console.log(err)}
    }
}
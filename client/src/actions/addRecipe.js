import { ADD_RECIPE } from ".";
import axios from 'axios'

export default function addRecipe(payload){
    return async function(dispatch){
        try{
        const response= await axios.post(`http://localhost:3001/recipe`, payload) 
        return dispatch({ type: ADD_RECIPE, payload: response.data });
        }catch(err){console.log(err)}
    }
}
import { GET_TYPES } from ".";
import axios from 'axios'

export default function getTypes(){
    return async function(dispatch){
        try{
        const response= await axios(`http://localhost:3001/types`) 
        return dispatch({ type: GET_TYPES, payload: response.data });
        }catch(err){console.log(err)}
    }

}
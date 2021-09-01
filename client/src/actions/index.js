export const GET_RECIPES = "GET_RECIPES"
export const ADD_RECIPE_FAVORITES = "ADD_RECIPE_FAVORITES"
export const REMOVE_RECIPE_FAVORITES = "REMOVE_RECIPE_FAVORITES"
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"



export  function AddRecipeFav(recipe){
    return {
        type: ADD_RECIPE_FAVORITES,
        payload: recipe
    }
}

export  function RemoveRecipeFav(id){
    return {
        type: REMOVE_RECIPE_FAVORITES,
        payload:id
    }
}

export let ingredientId = 1;

export const addIngredient = function(arg){
    return{
        type: ADD_INGREDIENT,
        payload:{...arg,
            id: ingredientId++,
           
    }}
};


export const removeIngredient = function(id){
    return{
        type:REMOVE_INGREDIENT,
        payload:id
    }
};
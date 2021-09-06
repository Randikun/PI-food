import { GET_RECIPES, ADD_RECIPE_FAVORITES, REMOVE_RECIPE_FAVORITES, GET_RECIPE_DETAIL, REMOVE_INGREDIENT, ADD_INGREDIENT, FILTER_DIET, FILTER_CREATED, ORDER_BY_TITLE, ORDER_BY_SCORE, GET_TYPES, ADD_RECIPE} from "../actions";

const initialState = {
    recipesLoaded:[],
    allRecipes:[],
    favoriteRecipes:[],
    recipeDetail:"",
    ingregients:[],
    types:[]
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES: 
                return {
                  ...state,
                  recipesLoaded : action.payload,
                  allRecipes: action.payload
                };
        case GET_TYPES: 
                return {
                  ...state,
                  types: action.payload,
                };
        case ADD_RECIPE:
                return {
                    ...state
                }
        case GET_RECIPE_DETAIL:
                 return{
                     ...state,
                     recipeDetail: action.payload
                 };
        case FILTER_DIET:
                 const allRecipes = state.allRecipes
                 const filteredDiet = action.payload === 'All'? allRecipes : allRecipes.filter(el=>el.diets.map(diet=> diet===action.payload))
                 return{
                     ...state,
                     recipesLoaded: filteredDiet
                 };
        case FILTER_CREATED:
                 const allRecipes2 = state.allRecipes
                 const filteredCreated = action.payload === 'Created'? allRecipes2.filter(el=>el.created) : allRecipes2.filter(el=>!el.created)
                 return{
                     ...state,
                     recipesLoaded: action.payload === 'All' ? state.allRecipes : filteredCreated
                 };
        case ORDER_BY_TITLE:
                
                 let sortedRecipes = action.payload === 'Asc'? 
                 state.recipesLoaded.sort(function(a, b){
                     if (a.title > b.title)return 1
                     else if (a.title < b.title)return -1
                     return 0
                 }) : state.recipesLoaded.sort(function(a, b){
                    if (a.title > b.title)return -1
                    else if (a.title < b.title)return 1
                    return 0
                })
                 return{
                     ...state,
                     recipesLoaded: sortedRecipes
                 };
        case ORDER_BY_SCORE:
                let sortedRecipesScore = action.payload === 'Asc'? 
                state.recipesLoaded.sort(function(a, b){
                 if (a.score > b.score)return 1
                 else if (a.score < b.score)return -1
                 return 0
                 }) : state.recipesLoaded.sort(function(a, b){
                 if (a.score > b.score)return -1
                 else if (a.score < b.score)return 1
                 return 0
                })
                return{
                     ...state,
                     recipesLoaded: sortedRecipesScore
                }    

        case ADD_RECIPE_FAVORITES:
                 return{
                     ...state,
                     favoriteRecipes: [action.payload, ...state.favoriteRecipes]
                 };
        case REMOVE_RECIPE_FAVORITES:
                 return{
                     ...state,
                     favoriteRecipes: state.favoriteRecipes.filter(fr=>fr.id!==action.payload)
                 };
        case ADD_INGREDIENT:
            return{
                ...state,
                ingregients: [action.payload, ...state.ingregients]
            };
        case REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: state.ingregients.filter(i=>i.id!==action.payload)
            };
       
        default: return state;
}
}
import { GET_RECIPES, ADD_RECIPE_FAVORITES, REMOVE_RECIPE_FAVORITES, GET_RECIPE_DETAIL, REMOVE_INGREDIENT, ADD_INGREDIENT} from "../actions";

const initialState = {
    recipesLoaded:[],
    favoriteRecipes:[],
    recipeDetail:"",
    ingregients:[]
};

export default function Reducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES: 
                return {
                  ...state,
                  recipesLoaded : action.payload
                };
        case GET_RECIPE_DETAIL:
                 return{
                     ...state,
                     recipeDetail: action.payload
                 };
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

//para que suceda la accion debo pasarsela como prop al componente mediante un connect y luego en el evento del boton buscar
//ejecutar la accion
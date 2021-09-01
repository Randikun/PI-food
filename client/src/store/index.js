import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../reducer/index"
import thunk from "redux-thunk";

//para trabajar con la devtool creo un composeEnhacers porque create store como 2do parametro recibe solo 1 valor
// entonces si necesito el middleware && la devTool => gof=g(f(x))
const composeEnhancers =
  typeof window === "object" && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
//createstore recibe UN reducer, en caso de ser mas de uno debería hacer un combineReducers
const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))

export default store;
import { createStore, combineReducers,applyMiddleware, compose } from "redux";
import Bucket from "./Bucket";
import thunk from "redux-thunk";

const middlewares=[thunk];
const rootReducer = combineReducers({ Bucket });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;

import { createStore, combineReducers } from "redux";
import Bucket from "./Bucket";

const rootReducer = combineReducers({ Bucket });

const store = createStore(rootReducer);

export default store;

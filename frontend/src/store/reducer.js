import { combineReducers } from "redux";
import entitiesReducer from "./entities/entities";
import authReducer from "./auth";

export default combineReducers({
    entities: entitiesReducer,
    auth: authReducer
})
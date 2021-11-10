import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {patientListReducer, patientDetailsReducer} from './reducers/patientReducers'
import {userLoginReducer} from "./reducers/userReducers";

const reducer = combineReducers({
    patientList: patientListReducer,
    patientDetails: patientDetailsReducer,
    userLogin:userLoginReducer,
})
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
      },
}

const middleware = [thunk]

const stores = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default stores
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {patientListReducer, patientDetailsReducer} from './reducers/patientReducers'


const reducer = combineReducers({
    patientList: patientListReducer,
    patientDetails: patientDetailsReducer,
    userSignin: userSigninReducer,
})

const initialState = {
    // userSignin: {
    //     data: localStorage.getItem('user')
    //       ? JSON.parse(localStorage.getItem('user'))
    //       : null,
    //   },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

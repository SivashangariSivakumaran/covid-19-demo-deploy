import { combineReducers} from "redux";
import patientReducer from './patients'
import pcrReducer from './pcr';
import hospitalReducer from './hospitals';
import userReducer from './users';
import dashboardReducer from './dashboard';

export default combineReducers({
    patients: patientReducer,
    pcr: pcrReducer,
    hospital: hospitalReducer,
    user: userReducer,
    dashboard: dashboardReducer,
})

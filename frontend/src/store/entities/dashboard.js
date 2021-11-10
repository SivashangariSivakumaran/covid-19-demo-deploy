import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "dashboard",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },

    reducers: {
       
    }
});

export default slice.reducer;

export const {
    publicDashboardRequested,
    publicDashboardSuccess,
    publicDashboardFailed,
    healthMinistryDashboardRequested,
    healthMinistryDashboardSuccess,
    healthMinistryDashboardFailed,
    hospitalDashboardRequested,
    hospitalDashboardSuccess,
    hospitalDashboardFailed,
} =slice.actions;

const dashboardURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadPublicDashboard = () => (dispatch, getState) => {
//    const { lastFetch } = getState().entities.hospital;

//     const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
//     if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: dashboardURL + 'dashboard/publicdashboard',
            onStart: publicDashboardSuccess,
            onSuccess: publicDashboardSuccess,
            onError: publicDashboardFailed
        })
    );
};

export const loadHealthMinistryDashboard = () => (dispatch) => {
    // const { lastFetch } = getState().entities.hospital;
 
     // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
     // if (diffInMinutes < refreshTime) return;
     
     return dispatch(
         apiCallBegan({
             url: dashboardURL + 'dashboardRoutes',
             onStart: healthMinistryDashboardSuccess.type,
             onSuccess: healthMinistryDashboardSuccess.type,
             onError: healthMinistryDashboardFailed.type
         })
     );
 };

 export const loadHospitalDashboard = () => (dispatch) => {
    // const { lastFetch } = getState().entities.hospital;
 
     // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
     // if (diffInMinutes < refreshTime) return;
     
     return dispatch(
         apiCallBegan({
             url: dashboardURL + 'dashboardRoutes',
             onStart: hospitalDashboardSuccess.type,
             onSuccess: hospitalDashboardSuccess.type,
             onError: hospitalDashboardFailed.type
         })
     );
 };


export const getHospitalLoadingStatus = createSelector(
    state => state.entities.hospitalloading,
    loading => loading
);

export const getPublicDashboard = createSelector(
    state => state.entities.dashboard,
    dashboard => dashboard.list
);




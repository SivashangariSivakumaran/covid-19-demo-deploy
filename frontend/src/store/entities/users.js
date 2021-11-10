import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
        userAdded: false,
        isEmailSent: false,
        isPasswordReset: false,
    },

    reducers: {
        userCreateRequested(user, action) {
            user.loading = true;
            user.userAdded = false;
        },

        userCreateRequestFailed(user, action){
            user.loading = false;
        },

        userCreateRequestSucceeded(user, action){
            user.loading = false;
            user.userAdded = true
        },
        
        userRequested(user, action){
            user.loading = true;
        },


        userRequestFailed(user, action){
            user.loading = false;
            
        },

        userReceived(users, action){
            users.list = action.payload.data.users;
            users.loading = false;
            users.lastFetch = Date.now();
        },

        sendMAilSuccess(users, action){
            users.isEmailSent = true 
        },

        sendMailFailed(users, action){
            users.isEmailSent = false
        },

        resetPasswordSuccess(users, action){
            users.isPasswordReset = true
            console.log(action.payload.status)
        },

        resetPasswordFailed(users, action){
            users.isPasswordReset = false
            console.log(action.payload.status)
        }

        // userUpdated(user, action){
        //     console.log(action.payload.data.user)
        // },
    }
});

export default slice.reducer;

export const {
    userRequested,
    userRequestFailed,
    userReceived,
    userCreateRequested,
    userCreateRequestFailed,
    userCreateRequestSucceeded,
    sendMAilSuccess,
    sendMailFailed,
    resetPasswordSuccess,
    resetPasswordFailed
   // userUpdated,
} =slice.actions;

const userURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadUsers = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.user;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: userURL + 'users',
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
};

export const addUser = (user) => (dispatch) => {
    console.log(user)
    return dispatch(
        apiCallBegan({
            url: userURL + 'users/signup',
            method: "post",
            data: user,
            onStart: userCreateRequested,
            onSuccess: userCreateRequestSucceeded.type,
            onError: userCreateRequestFailed
        })
    );
}

export const forgotPassword = (user) => (dispatch) => {
    console.log(user)
    return dispatch(
        apiCallBegan({
            url: userURL + 'users/forgotpassword',
            method: "post",
            data: user,
            onSuccess: sendMAilSuccess,
            onError: sendMailFailed,
        })
    );
}

export const resetPassword = (user, token) => (dispatch) => {
    console.log(user)
    return dispatch(
        apiCallBegan({
            url: userURL + `users/resetpassword/${token}`,
            method: "patch",
            data: user,
            onSuccess: resetPasswordSuccess,
            onError : resetPasswordFailed
        })
    );
}

export const resetPasswordLoggedIn = (user, token) => (dispatch) => {
    console.log(user)
    return dispatch(
        apiCallBegan({
            url: userURL + 'users/updatepassword',
            method: "patch",
            data: user,
            onSuccess: resetPasswordSuccess,
            onError : resetPasswordFailed
        })
    );
}

export const getUserLoadingStatus = createSelector(
    state => state.entities.userloading,
    loading => loading
);

export const getUserAddedStatus = createSelector(
    state => state.entities.user,
    userAdded => userAdded
)

export const getAllUsers = createSelector(
    state => state.entities.user,
    user => user.list
);

export const getEmailSentState = createSelector(
    state => state.entities.user,
    isEmailSent =>isEmailSent
);

export const getPasswordResetState = createSelector(
    state => state.entities.user,
    isPasswordReset =>isPasswordReset
);
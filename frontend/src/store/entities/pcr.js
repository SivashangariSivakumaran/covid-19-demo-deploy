import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "pcr",
    initialState: {
        list: [],
        toConfirm: [],
        toConfirmLoading: false,
        toConfirmLastFetch: null,
        loading: false,
        pcrAdded: false,
        lastFetch: null
    },

    reducers: {
        pcrCreateRequested(pcr, action) {
            pcr.loading = true;
            pcr.pcrAdded = false;
        },

        pcrCreateRequestFailed(pcr, action){
            pcr.loading = false;
            pcr.pcrAdded = false
        },

        pcrCreateRequestSucceeded(pcr, action){
            pcr.loading = false;
            pcr.pcrAdded = true
        },

        
        pcrRequested(pcr, action){
            pcr.loading = true;
        },


        pcrRequestFailed(pcr, action){
            pcr.loading = false;
            
        },

        pcrReceived(pcr, action){
            pcr.list = action.payload.data.tests;
            pcr.loading = false;
            pcr.lastFetch = Date.now();
        },

        pcrStatusChange(pcr, action){
            const index = pcr.list.findIndex(p => p._id === action.payload.data.test._id);
           // console.log(index)
            pcr.list[index].result =  action.payload.data.test.result
        },

        
        toConfirmPcrRequested(pcr, action){
            pcr.toConfirmLoading = true;
        },


        toConfirmPcrRequestFailed(pcr, action){
            pcr.toConfirmLoading = false;
            
        },

        toConfirmPcrReceived(pcr, action){
            console.log('efgrgerger')
            pcr.toConfirm = action.payload.data.tests;
            pcr.toConfirmLoading = false;
            pcr.toConfirmLastFetch = Date.now();
        },

        pcrAprovalUpdated(pcr, action){
              const ids = action.payload.data.ids
              const list = pcr.toConfirm.filter( p=> !p._id.includes(ids));
              pcr.toConfirm = list;
        }
    }
});

export default slice.reducer;

export const {
    pcrRequested,
    pcrRequestFailed,
    pcrReceived,
    pcrCreateRequested,
    pcrCreateRequestFailed,
    pcrCreateRequestSucceeded,
    pcrAprovalUpdated,
    pcrStatusChange,
    toConfirmPcrRequested,
    toConfirmPcrReceived,
    toConfirmPcrRequestFailed,
} =slice.actions;

const pcrURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadPcrs = () => (dispatch, getState) => {
   const { lastFetch } = getState().entities.pcr;
   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
   if (diffInMinutes < refreshTime) return;
     
    return dispatch(
        apiCallBegan({
          //  url: pcrURL + 'pcr/toconfirm',
            url: pcrURL + 'pcr/',
            method: "get",
            onStart: pcrRequested.type,
            onSuccess: pcrReceived.type,
            onError: pcrRequestFailed.type,
        })
    );
};

export const loadToConfirmPcrs = () => (dispatch, getState) => {
    const { toConfirmLastFetch } = getState().entities.pcr;
    const diffInMinutes = moment().diff(moment(toConfirmLastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
      
     return dispatch(
         apiCallBegan({
             url: pcrURL + 'pcr/toconfirm',
             method: "get",
             onStart: toConfirmPcrRequested.type,
             onSuccess: toConfirmPcrReceived.type,
             onError: toConfirmPcrRequestFailed.type,
         })
     );
 };

export const addPcr = (pcr) => (dispatch) => {
    console.log(pcr)
    return dispatch(
        apiCallBegan({
            url: pcrURL + 'pcr',
            method: "post",
            data: pcr,
            onStart: pcrCreateRequested,
            onSuccess: pcrCreateRequestSucceeded.type,
            onError: pcrCreateRequestFailed
        })
    );
}

export const getPcrLoadingStatus = createSelector(
    state => state.entities.pcr.loading,
    loading => loading
);

export const getPcrAddedStatus = createSelector(
    state => state.entities.pcr,
    pcr => pcr.pcrAdded
)

export const getAllPcrs = createSelector(
    state => state.entities.pcr,
    pcr => pcr.list
);

export const getToConfirmPcrLoadingStatus = createSelector(
    state => state.entities.pcr.toConfirmLoading,
    toConfirmLoading => toConfirmLoading
);


export const getToConfirmPcrs = createSelector(
    state => state.entities.pcr,
    pcr => pcr.toConfirm
);

export const changeStatus = (id, status) => (dispatch) =>{
    console.log(id, status)
    return dispatch(
        apiCallBegan({
            url: pcrURL + `pcr/${id}/changestatus`,
            method: "patch",
            data: {status: status},
            onSuccess: pcrStatusChange.type,
        })
    )
}

export const updatePcrAproval = (ids) => (dispatch) =>{
    console.log(ids)
    return dispatch(
        apiCallBegan({
            url: pcrURL + "pcr/confirm",
            method: "post",
            data: ids,
            onSuccess: pcrAprovalUpdated.type,
        })
    )
}


import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "patients",
    initialState: {
        list: [],
        admittedPatients: [],
        waiting: [],
        waitingLoading: false,
        waitingLAstFetch : null,
        admittedPatientsLoading: false,
        admittedPatientsLastFetch: null,
        loading: false,
        lastFetch: null,
        patientAdded : false,
        medicalHistory : false,
    },
    reducers: {

        patientsRegisterRequested(patients, action) {
            delete patients.registerSuccessful;
            patients.registering = true;
        },

        patientsRegisterRequestFailed(patients, action) {
            patients.registering = false;
        },

        patientsRegisterRequestSucceeded(patients, action) {
            delete patients.registering;
            patients.registerSuccessful = true;
            patients.list.push(action.payload.data);
            patients.patientAdded = true
        },

        patientsRequested(patients, action){
            patients.loading = true;
        },


        patientsRequestFailed(patients, action){
            patients.loading = false;
            
        },

    // payload: [message: , data: ]
        patientsReceived(patients, action){
            patients.list = action.payload.data.patients;
            patients.loading = false;
            patients.lastFetch = Date.now();
           // console.log('srherhtrhjtrjtrjr')
        },

        admittedPatientsRequested(patients, action){
            patients.admittedPatientsLoading= true;
        },


        admittedPatientsRequestFailed(patients, action){
            patients.admittedPatientsLoading = false;
            
        },

    // payload: [message: , data: ]
        admittedPatientsReceived(patients, action){
            patients.admittedPatients = action.payload.data.patients;
            patients.admittedPatientsLoading = false;
            patients.admittedPatientsLastFetch = Date.now();
           // console.log('srherhtrhjtrjtrjr')
        },

        waitingPatientsRequested(patients, action){
            patients.waitingLoading= true;
        },


        waitingPatientsRequestFailed(patients, action){
            patients.waitingLoading = false;
            
        },

    // payload: [message: , data: ]
        waitingPatientsReceived(patients, action){
            patients.waiting = action.payload.data.medicalHistory;
            patients.waitingLoading = false;
            patients.waitingLAstFetch= Date.now();
           // console.log('srherhtrhjtrjtrjr')
        },

        patientSymptomsUpdated(patients, action){
            console.log(action.payload.data)
            const { patient, _id } = action.payload.data.medicalHistory;
            const patientIndex = patients.list.findIndex(p => p._id === patient );
            const histories = patients.list[patientIndex].medicalHistory
            const historyIndex = histories.findIndex(p => p._id === _id)
            histories[historyIndex].symptoms = action.payload.data.medicalHistory.symptoms
        },

        patientDrugsUpdated(patients, action){
            console.log(action.payload.data)
            const { patient, _id } = action.payload.data.medicalHistory;
             const patientIndex = patients.list.findIndex(p => p._id === patient );
             const histories = patients.list[patientIndex].medicalHistory
             const historyIndex = histories.findIndex(p => p._id === _id)
             histories[historyIndex].drugDetails = action.payload.data.medicalHistory.drugDetails
        },

        patientTransferUpdated(patients, action){
            console.log(action.payload.data.medicalHistory)
          //  const variantIndex =variants.findIndex(v => v.name === variantName);
          //  variants[variantIndex].countInStock = newCount;
        },

        patientUpdated(patients, action){
            const patientId = action.payload.data.patient._id;
            console.log( action.payload.data.patient)
            const index = patients.list.findIndex(c => c._id === patientId );
            console.log(index)
           /// patients.list[index] = action.payload.data.patient;
        },

        patientAdmitRequest(patients, action){
           // patients.loading = true;
        },


        patientAdmitFailed(patients, action){
            console.log(action.payload.data)
            patients.medicalHistory = false;
            
        },

    // payload: [message: , data: ]
        patientAdmitSuccess(patients, action){
            patients.medicalHistory = true;
            console.log(action.payload.data)
            const { patient, _id } = action.payload.data.test;
            const patientIndex = patients.list.findIndex(p => p._id === patient );
            const histories = patients.list[patientIndex].medicalHistory
            histories.push(action.payload.data.test)
            patients.admittedPatients.push(patients.list[patientIndex])
         ///   const historyIndex = histories.findIndex(p => p._id === _id)
         //   histories[historyIndex] = action.payload.data.medicalHistory
           // patients.admittedPatients.push(action.payload.data.)
           // patients.medicalHistory = true
            //patients.list = action.payload.data.patients;
        },

        selectedPatientTransferUpdated(patients, actions){
            
        },

        patientDischarged(patients, action){
            console.log(action.payload.data.medicalHistory)
            const { patient, _id } = action.payload.data.medicalHistory;
            const patientIndex = patients.list.findIndex(p => p._id === patient );
            const histories = patients.list[patientIndex].medicalHistory
            const historyIndex = histories.findIndex(p => p._id === _id)
            histories[historyIndex] = action.payload.data.medicalHistory
        },

        patientChangeWard(patients, action){
            console.log(action.payload.data.medicalHistory)
            const { patient, _id } = action.payload.data.medicalHistory;
         //   const patientIndex = patients.list.findIndex(p => p._id === patient );
            const addmittedIndex = patients.admittedPatients.findIndex(p => p._id === patient );
          //  const histories1 = patients.list[patientIndex].medicalHistory
            const histories2 = patients.admittedPatients[addmittedIndex].medicalHistory
          //  const historyIndex1 = histories1.findIndex(p => p._id === _id)
            const historyIndex2 = histories2.findIndex(p => p._id === _id)
          //  histories1[historyIndex1].ward = action.payload.data.medicalHistory.ward
            histories2[historyIndex2] = action.payload.data.medicalHistory
        }

    },
});

export default slice.reducer;


export const { 
    patientsRequested, 
    patientsReceived, 
    patientsRequestFailed,
    patientsRegisterRequested,
    patientsRegisterRequestFailed,
    patientsRegisterRequestSucceeded,
    patientUpdated,
    patientSymptomsUpdated,
    patientDrugsUpdated,
    patientTransferUpdated,
    selectedPatientTransferUpdated,
    patientAdmitRequest,
    patientAdmitSuccess,
    patientAdmitFailed,
    patientDischarged,
    admittedPatientsReceived,
    admittedPatientsRequestFailed,
    admittedPatientsRequested,
    waitingPatientsReceived,
    waitingPatientsRequestFailed,
    waitingPatientsRequested,
    patientChangeWard
 } = slice.actions;
                            

const patientURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

//Action Invokers
export const loadPatients = () => (dispatch, getState) => {
   const { lastFetch } = getState().entities.patients;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;

    return dispatch(
        apiCallBegan({
            url: patientURL + 'patients/',
            onStart: patientsRequested.type,
            onSuccess: patientsReceived.type,
            onError: patientsRequestFailed.type
        })
    );
};

export const loadPatient = (patientid) => (dispatch, getState) => {
    const { lastFetch } = getState().entities.patients;
 
     const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
     if (diffInMinutes < refreshTime) return;
 
     return dispatch(
         apiCallBegan({
             url: patientURL + `patients/${patientid}`,
             onStart: patientsRequested.type,
             onSuccess: patientsReceived.type,
             onError: patientsRequestFailed.type
         })
     );
 };

 export const loadAdmittedPatients = () => (dispatch, getState) => {
    const { admittedPatientsLastFetch } = getState().entities.patients;
 
     const diffInMinutes = moment().diff(moment(admittedPatientsLastFetch), "minutes");
     if (diffInMinutes < refreshTime) return;
 
     return dispatch(
         apiCallBegan({
             url: patientURL + 'patients/hospital/admitted',
             onStart: admittedPatientsRequested.type,
             onSuccess: admittedPatientsReceived.type,
             onError: admittedPatientsRequestFailed.type
         })
     );
 };

 export const loadWaitingPatients = () => (dispatch, getState) => {
    const { waitingLAstFetch } = getState().entities.patients;
 
     const diffInMinutes = moment().diff(moment(waitingLAstFetch), "minutes");
     if (diffInMinutes < refreshTime) return;
 
     return dispatch(
         apiCallBegan({
             url: patientURL + 'med/changehospital/pending',
             onStart: waitingPatientsRequested,
             onSuccess: waitingPatientsReceived,
             onError: waitingPatientsRequestFailed
         })
     );
 };

 export const getAllWaitingPatients = createSelector(
     state => state.entities.patients,
     patients => patients
 )

export const getAllPatients= createSelector(
    state => state.entities.patients,
    patients => patients,
   // console.log(patients)
);

export const getPatientsLoadingStatus = createSelector(
    state => state.entities.patients.loading,
    loading => loading
);

export const getAllAdmittedPatients= createSelector(
    state => state.entities.patients.admittedPatients,
    patients => patients,
   // console.log(patients)
);

export const getAdmittedPatientsLoadingStatus = createSelector(
    state => state.entities.patients.admittedPatientsLoading,
    loading => loading
);

export const getPatientAdmitState = createSelector(
    state => state.entities.patients,
    medicalHistory => medicalHistory
);

export const getPatientById = patientId =>
    createSelector(
        state => state.entities.patients.list,
        patients => {
            const index = patients.findIndex(p => p._id === patientId);
            if(index !== -1) return patients[index];
            return {};
        },

);



// export const getPatientByNIC = (nic) => (dispatch) => {
//      return dispatch(
//          apiCallBegan({
//              url: patientURL + `patients/search/${nic}`,
//              onStart: patientRequested.type,
//              onSuccess: patientsReceived.type,
//              onError: patientsRequestFailed.type
//          })
//      );
//  };

export const registerPatients = (patient) => (dispatch) => {
   // console.log(patient, 'efeferfrgre' )
    return dispatch(
       // console.log(patient)
        apiCallBegan({
            url: patientURL + 'patients/',
            method: "post",
            data: patient,
            onStart: patientsRegisterRequested,
            onSuccess: patientsRegisterRequestSucceeded.type,
            onError: patientsRegisterRequestFailed
        })
    );
}

export const updatePatient= (patient, id) => (dispatch) => {
    console.log(patient, id)
    return dispatch(
        apiCallBegan({
            url: patientURL + `patients/${id}`,
            method: "patch",
            data: patient,
            onSuccess: patientUpdated.type,
        })
    );

}

export const updateSymptomsInDB = (symptoms, medicalHistoryId) => (dispatch) => {
      //  console.log(symptoms)
        return dispatch(
            apiCallBegan({
                url: patientURL + `med/${medicalHistoryId}/addsymptoms`,
                method: "patch",
                data: symptoms,
                onSuccess: patientSymptomsUpdated,
            })
        );

}

export const updateDrugsInDB = (drugs, medicalHistoryId) => (dispatch) => {
   // console.log(drugs)
    return dispatch(
        apiCallBegan({
            url: patientURL + `med/${medicalHistoryId}/adddrugs`,
            method: "patch",
            data: drugs,
            onSuccess: patientDrugsUpdated,
        })
    );

}

export const updateTransferPatient = (hospital, patientId) => (dispatch) => {
    console.log(patientId)
    return dispatch(
        apiCallBegan({
            url: patientURL + `med/${patientId}/changehospitalrequest`,
            method: "post",
            data: hospital,
            onSuccess: patientTransferUpdated.type,
        })
    );
}

export const updateSelectedTransferPatient = (value) => (dispatch) => {
    console.log(value)
    return dispatch(
        apiCallBegan({
            url: patientURL + 'patientTransferSelected',
            method: "post",
            data: value,
            onSuccess: selectedPatientTransferUpdated.type,
        })
    );
}


export const admitPatient = (patient) => (dispatch) => {
    console.log(patient)
    return dispatch(
        apiCallBegan({
            url: patientURL + 'med',
            method: "post",
            data : patient,
            onStart : patientAdmitRequest,
            onSuccess : patientAdmitSuccess,
            onError: patientAdmitFailed
        })
    )
}

export const dischargePatient = (patientId) => (dispatch) => {
    console.log(patientId)
    return dispatch(
        apiCallBegan({
            url: patientURL + `patients/${patientId}/discharge`,
            method: "get",
            onSuccess : patientDischarged,
        })
    )
}

export const changePatientWard = (ward, patientId) => (dispatch) => {
    console.log(patientId)
    return dispatch(
        apiCallBegan({
            url: patientURL + `med/${patientId}/changeward`,
            method: "post",
            data: ward,
            onSuccess : patientChangeWard,
        })
    )
}

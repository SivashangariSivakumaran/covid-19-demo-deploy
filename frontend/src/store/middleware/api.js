import axios from "axios";
import * as actions from "../apiActions";
import configData from '../../config.json';
import { toastAction } from '../toastActions';


const api = ({ dispatch }) => next => async action => {
  axios.defaults.withCredentials = true;
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, data, config, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
   // console.log(action.payload)
    const response = await axios.request({
      baseURL: configData.API_URL,
      url,
      method,
      data,
      config,
    });


    dispatch(actions.apiCallSuccess(response.data));

    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    //console.log(response.data)
  } catch (error) {
      const response = error.response;
      const message = response ? response.data.message : error.message;

      dispatch(actions.apiCallFailed({ message }));
      dispatch(toastAction({ message, type: 'error' }));
 
      if (onError) dispatch({ type: onError, payload: message });
  }
};

export default api;

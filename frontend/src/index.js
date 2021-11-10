import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux'
// import stores from './stores'
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { saveState } from './store/localStorage';

const store = configureStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth, 
    entities: {
      patients: store.getState().entities.patients,
      pcr: store.getState().entities.pcr,
      hospital: store.getState().entities.hospital,
      dashboard: store.getState().entities.dashboard
    }
  });
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

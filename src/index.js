import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// redux imports
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { fetchAllCustomers } from './actions/customerActions';

// import global css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// import global js
import 'jquery/src/jquery';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
store.dispatch(fetchAllCustomers());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

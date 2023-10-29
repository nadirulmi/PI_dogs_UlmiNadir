import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "../src/redux/store/store"
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <BrowserRouter>
         <App />
    </BrowserRouter>
  </Provider>
)


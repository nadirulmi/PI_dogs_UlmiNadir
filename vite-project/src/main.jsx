import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "../src/redux/store/store"
import { Provider } from 'react-redux'
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3001"
//url deploy
axios.defaults.baseURL = "https://pi-dogs-back-five.vercel.app"


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <BrowserRouter>
         <App />
    </BrowserRouter>
  </Provider>
)


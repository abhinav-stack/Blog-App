import React from 'react'
import  ReactDOM  from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from "./App"
import{ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"



ReactDOM.render(
        <BrowserRouter>
        <ToastContainer autoClose={3000}/>
        <App/>
        </BrowserRouter>
        ,document.getElementById('root'));

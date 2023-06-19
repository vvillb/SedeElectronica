import React from 'react'
import ReactDOM from 'react-dom/client'
import './plugins/common/index.css'
// import i18n from "./i18n";
import { Provider } from 'react-redux';
import {store} from '../store/store'
import {  RouterProvider } from 'react-router-dom';
import  router from './router/AppRouter';






ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
</>
   

)

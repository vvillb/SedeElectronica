import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './plugins/common/index.css'
import i18n from "./i18n";
import { Provider } from 'react-redux';
import {store} from '../store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)

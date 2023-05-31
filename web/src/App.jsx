import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './router/AppRouter'
import 'devextreme/dist/css/dx.common.css';

function App() {
  return (
    
    <>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </>
  )
}
export default App

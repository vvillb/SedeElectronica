import React from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import AppRouter from './router/AppRouter'
import 'devextreme/dist/css/dx.common.css';

function App() {
  const location=useLocation();
console.log('location:',location)
  return (
    
    <>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </>
  )
}
export default App

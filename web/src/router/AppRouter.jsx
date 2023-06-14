import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Catalogo from '../pages/AtencionEInformacion/Catalogo'
import Quejas from '../pages/AtencionEInformacion/Quejas'
import Tablon from '../pages/AtencionEInformacion/Tablon'
import MisDocumentos from '../pages/CarpetaCiudadana/MisDocumentos'
import MisExpedientes from '../pages/CarpetaCiudadana/MisExpedientes'
import MisNotificaciones from '../pages/CarpetaCiudadana/MisNotificaciones'
import MisSolicitudes from '../pages/CarpetaCiudadana/MisSolicitudes'
import LoginPage from '../pages/LoginPage'
import ServicesPage from '../pages/ServicesPage'
import Verificacion from '../pages/AtencionEInformacion/Verificacion'
import AtencionPage from '../pages/AtencionPage'
import DetalleNotificacion from '../pages/subpages/DetalleNotificacion'


function AppRouter() {
  return (
        <Routes>
            <Route path='/atencion' id='atencion' element={<AtencionPage/>}/> 
            <Route path='*' element={<LoginPage/>}/> 
            <Route path='/CarpetaCiudadana' id='CarpetaCiudadana' element={<ServicesPage/>}/> 
            <Route path='/AtencionEInformacion/Catalogo' id='Catalogo' element={<Catalogo/>}/>
            <Route path='/AtencionEInformacion/Quejas' id='Quejas' element={<Quejas/>}/>
            <Route path='/AtencionEInformacion/Tablon' id='Tablon' element={<Tablon/>}/>
            <Route path='/AtencionEInformacion/Verificacion' id='Verificacion' element={<Verificacion/>}/>
            <Route path='/CarpetaCiudadana/MisDocumentos' id='MisDocumentos' element={<MisDocumentos/>}/>
            <Route path='/CarpetaCiudadana/MisExpedientes' id='MisExpedientes' element={<MisExpedientes/>}/>
            <Route path='/CarpetaCiudadana/MisNotificaciones' id='MisNotificaciones' element={<MisNotificaciones/>}/>
            <Route path='/CarpetaCiudadana/MisSolicitudes' id='MisSolicitudes' element={<MisSolicitudes/>}/>
            <Route path="/MisNotificaciones/:id" id=':id' element={<DetalleNotificacion/>}/>
        </Routes>
  )
}

export default AppRouter
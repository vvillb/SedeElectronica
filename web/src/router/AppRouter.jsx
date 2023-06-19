import React from 'react'
import {Routes, Route, Link, createBrowserRouter} from 'react-router-dom'
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

 const router = createBrowserRouter([
  {
    path: "*",
    element: <LoginPage />,
  },
  {
    path: "/atencion",
    id: "atencion",
    element: <AtencionPage />,
    handle: {
      crumb: () => <Link to="/atencion">Atención</Link>,
    },
  },
  {
    path: "/CarpetaCiudadana",
    id: "CarpetaCiudadana",
    element: <ServicesPage />,
    handle: {
      crumb: () => <Link to="/CarpetaCiudadana">Carpeta Ciudadana</Link>,
    },
  },
  {
    path: "/AtencionEInformacion/Catalogo",
    id: "Catalogo",
    element: <Catalogo />,
    handle: {
      crumb: () => <Link to="/AtencionEInformacion/Catalogo">Catálogo</Link>,
    },
  },
  {
    path: "/AtencionEInformacion/Quejas",
    id: "Quejas",
    element: <Quejas />,
    handle: {
      crumb: () => <Link to="/AtencionEInformacion/Quejas">Quejas</Link>,
    },
  },
  {
    path: "/AtencionEInformacion/Tablon",
    id: "Tablon",
    element: <Tablon />,
    handle: {
      crumb: () => <Link to="/AtencionEInformacion/Tablon">Tablón</Link>,
    },
  },
  {
    path: "/AtencionEInformacion/Verificacion",
    id: "Verificacion",
    element: <Verificacion />,
    handle: {
      crumb: () => (
        <Link to="/AtencionEInformacion/Verificacion">Verificación</Link>
      ),
    },
  },
  {
    path: "/CarpetaCiudadana/MisDocumentos",
    id: "MisDocumentos",
    element: <MisDocumentos/>,
    handle: {
      crumb: () => (
        <Link to="/CarpetaCiudadana/MisDocumentos">Mis Documentos</Link>
      ),
    },
  },
  {
    path: "/CarpetaCiudadana/MisExpedientes",
    id: "MisExpedientes",
    element: <MisExpedientes />,
    handle: {
      crumb: () => (
        <Link to="/CarpetaCiudadana/MisExpedientes">Mis Expedientes</Link>
      ),
    },
  },
  {
    path: "/CarpetaCiudadana/MisNotificaciones",
    id: "MisNotificaciones",
    element: <MisNotificaciones />,
    handle: {
      crumb: () => (
        <Link to="/CarpetaCiudadana/MisNotificaciones">Mis Notificaciones</Link>
      ),
    },
  },
  {
    path: "/CarpetaCiudadana/MisSolicitudes",
    id: "MisSolicitudes",
    element: <MisSolicitudes />,
    handle: {
      crumb: () => (
        <Link to="/CarpetaCiudadana/MisSolicitudes">Mis Solicitudes</Link>
      ),
    },
  },
  {
    path: "/MisNotificaciones/:id",
    id: ":id",
    element: <DetalleNotificacion/>,
    handle: {
      crumb: () => <Link to="/MisNotificaciones/:id">:id</Link>,
    },
  },
]);






export default router
import React from 'react'
import Layout from '@client-layout';
import { useParams } from 'react-router-dom';

const DetalleNotificacion = () => {
    let idNotificacion=useParams();
    console.log(idNotificacion.id)
  return (
    <Layout>
      detalle notificacion 
    </Layout>
  )
}

export default DetalleNotificacion

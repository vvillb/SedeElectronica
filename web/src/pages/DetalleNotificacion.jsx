import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificacionesService from '../services/NotificacionesServices/NotificacionesService';

const DetalleNotificacion = () => {
    const dispatch = useDispatch();

    let idNotificacion=useParams();
    console.log(idNotificacion.id)



    useEffect(()=>{
      // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
 
}, [dispatch,idNotificacion]);


const [bitacora,setBitacora]=useState('')
const[acciones,setAcciones]=useState('');
// const[descargarAdj,setDescargarAdj]=useState('');
const[acuse,setAcuse]=useState('');


useEffect(() => {
    const fetchNotificacionData = async () => {
        console.log('useParams()',idNotificacion.id)
        const id=idNotificacion?.id;
        try {
          const notificacionesService = new NotificacionesService();
        //   const notificacionResponse = await notificacionesService.getNotificacion(id);
          const bitacoraResponse = await notificacionesService.getBitacoraNotificaciones(id);
          const accionesResponse = await notificacionesService.getAccionesAMostrar(id);
        //   const descargarAdjResponse = await notificacionesService.descargarAdjunto(idNotificacion);
          const acuseResponse = await notificacionesService.getAcuseLectura(id);
  
          // Set the data obtained from the responses to the component state
          setBitacora(bitacoraResponse.data);
          setAcciones(accionesResponse.data);
        //   setDescargarAdj(descargarAdjResponse.data);
          setAcuse(acuseResponse.data);
        } catch (error) {
          console.error('Error fetching notification data', error);
        }
      };
  
      fetchNotificacionData();
    }, [idNotificacion]);



  return (
    <Layout>
      detalle notificacion 
      <h3>Notificación º</h3>
      <h3>Bitácora: </h3>
      <h3>Acciones:</h3>
      <h3>Descargar Adjunto</h3>
      <h3>Acuse de lectura:</h3>
    </Layout>
  )
}

export default DetalleNotificacion

import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificacionesService from '../services/NotificacionesServices/NotificacionesService';
import { DataGrid } from 'devextreme-react';

const DetalleNotificacion = () => {
    const dispatch = useDispatch();

    let idNotificacion=useParams();



    useEffect(()=>{
      // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
 
}, [dispatch,idNotificacion]);


const [bitacora,setBitacora]=useState('')
const[acciones,setAcciones]=useState('');
// const[descargarAdj,setDescargarAdj]=useState('');
const[acuse,setAcuse]=useState('');
const[infoNotificacion,setInfoNotificacion]=useState('');


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
          const infoNotificacionResponse=await notificacionesService.getNotificacion(id);
  
          // Set the data obtained from the responses to the component state
        
          setAcciones(accionesResponse.data);
        //   setDescargarAdj(descargarAdjResponse.data);
          setAcuse(acuseResponse.data);
          setAcciones(accionesResponse.data);
          setInfoNotificacion(infoNotificacionResponse.data)
          console.log('acuse',acuse)
          console.log('bitacora',bitacoraResponse.data)
          setBitacora(bitacoraResponse.data)
          console.log('acciones',acciones)
          console.log('info',infoNotificacion)
        } catch (error) {
          console.error('Error fetching notification data', error);
        }
      };
  
      fetchNotificacionData();
    }, [idNotificacion]);

      console.log('prueba bitacora',bitacora)




    const columns=['id','accion','fecha','estado_Resultante']
  return (
    <Layout>
      <h1>Notificación º {idNotificacion.id}</h1>
      <h3>Bitácora: </h3>
        <DataGrid
        dataSource={bitacora}
        columns={columns}
        showBorders={true}
      />
      <h3>Acciones:</h3>
      <h3>Descargar Adjunto</h3>
      <h3>Acuse de lectura:</h3>
    </Layout>
  )
}

export default DetalleNotificacion

import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificacionesService from '../services/NotificacionesServices/NotificacionesService';
import { DataGrid } from 'devextreme-react';
import { Button as DevButton} from 'devextreme-react';

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
const[contenidoPDF,setContenidoPDF]=useState('');
const[nombrePdfAcuse,setNombrePdfAcuse]=useState('');


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
          setContenidoPDF(acuse.contenido);
          setNombrePdfAcuse(acuse.nombre)
          setBitacora(bitacoraResponse.data)
        } catch (error) {
          console.error('Error fetching notification data', error);
        }
      };
  
      fetchNotificacionData();
    }, [idNotificacion]);

      function handleDownload() {
        const linkSource = `data:application/pdf;base64,${contenidoPDF}`;
        const downloadLink = document.createElement('a');
        const fileName = `${nombrePdfAcuse}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;      
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }

      // function handleDownloadAdjunto() {
      //   const linkSource = `data:application/pdf;base64,${contenidoPDFAdjunto}`;
      //   const downloadLink = document.createElement('a');
      //   const fileName = 'acuse.pdf';
      //   downloadLink.href = linkSource;
      //   downloadLink.download = fileName;
      
      //   document.body.appendChild(downloadLink);
      //   downloadLink.click();
      //   document.body.removeChild(downloadLink);
      // }

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
      {/* <h3>Acciones:</h3> */}
      <DevButton onClick={handleDownload}>Descargar acuse de lectura</DevButton>
      {/* <DevButton onClick={handleDownloadAdjunto}>Descargar Adjunto</DevButton> */}

    </Layout>
  )
}

export default DetalleNotificacion

import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@client-layout';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificacionesService from '../../services/NotificacionesServices/NotificacionesService';
import { DataGrid } from 'devextreme-react';
import { Button as DevButton } from 'devextreme-react';

const DetalleNotificacion = () => {
  const dispatch = useDispatch();
  let idNotificacion = useParams();

/////////////////////////////////
useEffect(() => {
  // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
}, [dispatch]);
////////////////////////////////////

  const [bitacora, setBitacora] = useState('');
  const [acciones, setAcciones] = useState('');
  const [acuse, setAcuse] = useState(null);
  const [infoNotificacion, setInfoNotificacion] = useState('');
  const [contenidoPDFAcuse, setContenidoPDFAcuse] = useState('');
  const [nombrePdfAcuse, setNombrePdfAcuse] = useState('');
  const [idAdj, setIdAdj] = useState('');
  const [contenidoPDFAdjunto, setContenidoPDFAdjunto] = useState('');
  const [nombrePDFAdjunto, setNombrePDFAdjunto] = useState('');
  const [descargarAdj, setDescargarAdj] = useState('');
  const [acuseExiste,setAcuseExiste]=useState(false)


const fetchNotificacionData=useCallback(async () => {
  try{
    const id = idNotificacion?.id;
    const notificacionesService = new NotificacionesService();
    const bitacoraResponse = await notificacionesService.getBitacoraNotificaciones(id);
    const accionesResponse = await notificacionesService.getAccionesAMostrar(id);
    const infoNotificacionResponse = await notificacionesService.getNotificacion(id);
    // console.log('bitacoraResponse.data',bitacoraResponse.data);
    // console.log('accionesResponse.data',accionesResponse.data);
    // console.log('(infoNotificacionResponse.data',infoNotificacionResponse.data);
    // console.log('infoNotificacion?.adjuntos?.length > 0 ? infoNotificacion?.adjuntos[0].id : null',infoNotificacion?.adjuntos?.length > 0 ? infoNotificacion?.adjuntos[0].id : null);
    setBitacora(bitacoraResponse.data);
    setAcciones(accionesResponse.data);
    setInfoNotificacion(infoNotificacionResponse.data);
    setIdAdj(infoNotificacion?.adjuntos?.length > 0 ? infoNotificacion?.adjuntos[0].id : null);
  }catch (error) {
    console.error('Error fetching notification data', error);
  }
  
}, []);


useEffect(()=>{
  checkAcuse();
},[infoNotificacion])
function checkAcuse(){
  if(infoNotificacion.fecha_Lectura){
    setAcuseExiste(true);
    console.log('check acuse triggered',acuseExiste)

  }
}
//fetch acuse si la fecha de lectura existe
  useEffect(() => {
    fetchNotificacionData()
        
      if(infoNotificacion.fecha_Lectura)
      {fetchAcuse()
           console.log('after fetch acuse',acuse)
      }else{
        return
      }
      
  }, [acuseExiste]);



  const fetchAcuse=useCallback(async () => {
    try{
      const id = idNotificacion?.id;
      const notificacionesService = new NotificacionesService();
      const acuseResponse = await notificacionesService.getAcuseLectura(id);
    
      setAcuse(acuseResponse.data);
     
    } catch (error) {
      console.error('Error fetching acuse', error);
    }
  }, []);



  useEffect(() => {
    setIdAdj(infoNotificacion?.adjuntos?.length > 0 ? infoNotificacion?.adjuntos[0].id : null);
    setContenidoPDFAcuse(acuse?acuse.contenido:null);
    setNombrePdfAcuse(acuse?acuse.nombre:null);

    
  }, [ acuse,infoNotificacion]);

  async function handleClickAdjunto() {
    try {
      const notificacionesService = new NotificacionesService();
      const descargarAdjResponse = await notificacionesService.descargarAdjunto(idAdj);
      const adjuntoData = descargarAdjResponse.data;
      setDescargarAdj(adjuntoData);
      setNombrePDFAdjunto(adjuntoData.nombre);
      setContenidoPDFAdjunto(adjuntoData.contenido);
      handleDownloadAdjunto();
    } catch (error) {
      console.error('Error fetching adjunto', error);
    }
  }

  

  function handleDownloadAdjunto() {
    
    const linkSource = `data:application/pdf;base64,${contenidoPDFAdjunto}`;
    const downloadLink = document.createElement('a');
    const fileName = `${nombrePDFAdjunto}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  function handleDownloadAcuse() {
    const linkSource = `data:application/pdf;base64,${contenidoPDFAcuse}`;
    const downloadLink = document.createElement('a');
    const fileName = `${nombrePdfAcuse}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const columns = ['id', 'accion', 'fecha', 'estado_Resultante'];
  // console.log('acuse',acuse)
  // console.log('idAdj',idAdj)
  return (
    <Layout>
      <h1>Notificación {idNotificacion.id}</h1>
      <h3>Bitácora:</h3>
      <DataGrid dataSource={bitacora} columns={columns} showBorders={true} />
      {acuse &&<DevButton onClick={handleDownloadAcuse}>Descargar acuse de lectura</DevButton>}
      {idAdj && <DevButton onClick={handleClickAdjunto}>Descargar Adjunto</DevButton>}
    </Layout>
  );
};

export default DetalleNotificacion;

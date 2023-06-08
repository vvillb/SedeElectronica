import React, { useEffect, useState } from 'react';
import Layout from '@client-layout';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificacionesService from '../services/NotificacionesServices/NotificacionesService';
import { DataGrid } from 'devextreme-react';
import { Button as DevButton } from 'devextreme-react';

const DetalleNotificacion = () => {
  const dispatch = useDispatch();
  let idNotificacion = useParams();

  useEffect(() => {
    // Add a new breadcrumb element
    const label = 'Nueva página';
    dispatch(addBreadcrumbs({ label }));
  }, [dispatch, idNotificacion]);

  const [bitacora, setBitacora] = useState('');
  const [acciones, setAcciones] = useState('');
  const [acuse, setAcuse] = useState(null);
  const [infoNotificacion, setInfoNotificacion] = useState('');
  const [contenidoPDF, setContenidoPDF] = useState('');
  const [nombrePdfAcuse, setNombrePdfAcuse] = useState('');
  const [idAdj, setIdAdj] = useState('');
  const [contenidoPDFAdjunto, setContenidoPDFAdjunto] = useState('');
  const [nombrePDFAdjunto, setNombrePDFAdjunto] = useState('');
  const [descargarAdj, setDescargarAdj] = useState('');

  useEffect(() => {
    const fetchNotificacionData = async () => {
      const id = idNotificacion?.id;
      try {
        const notificacionesService = new NotificacionesService();
        const bitacoraResponse = await notificacionesService.getBitacoraNotificaciones(id);
        const accionesResponse = await notificacionesService.getAccionesAMostrar(id);
        const acuseResponse = await notificacionesService.getAcuseLectura(id);
        const infoNotificacionResponse = await notificacionesService.getNotificacion(id);

        setBitacora(bitacoraResponse.data);
        setAcciones(accionesResponse.data);
        setAcuse(acuseResponse.data);
        setInfoNotificacion(infoNotificacionResponse.data);
      } catch (error) {
        console.error('Error fetching notification data', error);
      }
    };

    fetchNotificacionData();
  }, [idNotificacion]);

  useEffect(() => {
    if (acuse) {
      setIdAdj(infoNotificacion?.adjuntos?.length > 0 ? infoNotificacion?.adjuntos[0].id : null);
      setContenidoPDF(acuse.contenido);
      setNombrePdfAcuse(acuse.nombre);
    }
  }, [acuse, infoNotificacion]);

  async function handleClickAdjunto() {
    try {
      const notificacionesService = new NotificacionesService();
      const descargarAdjResponse = await notificacionesService.descargarAdjunto(idAdj);
      setDescargarAdj(descargarAdjResponse.data);
      setNombrePDFAdjunto(descargarAdjResponse.data.nombre);
      setContenidoPDFAdjunto(descargarAdjResponse.data.contenido);
      handleDownloadAdjunto();
    } catch (error) {
      console.error('Error fetching notification data', error);
    }
  }

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

  const columns = ['id', 'accion', 'fecha', 'estado_Resultante'];

  return (
    <Layout>
      <h1>Notificación {idNotificacion.id}</h1>
      <h3>Bitácora:</h3>
      <DataGrid dataSource={bitacora} columns={columns} showBorders={true} />
      <DevButton onClick={handleDownload}>Descargar acuse de lectura</DevButton>
      {idAdj && <DevButton onClick={handleClickAdjunto}>Descargar Adjunto</DevButton>}
    </Layout>
  );
};

export default DetalleNotificacion;

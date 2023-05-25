import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificationsTabPanel from '../../components/Menu/MenuItem/NotificationsTabPanel';
import NotificacionesService from '../../services/NotificacionesServices/NotificacionesService';
import { Button as DevButton } from 'devextreme-react';



function MisNotificaciones() {

  const dispatch = useDispatch();

  ///for fetching notificaciones/////
const [inputValue, setInputValue] = useState('');
  const service = new NotificacionesService(); // Instantiate the service

  const [notificaciones, setNotificaciones] = useState([{datos:{campos:'campos'}}]);

const idContribuyente=19561;

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const notificacionesService = new NotificacionesService();
        const {data }= await notificacionesService.obtenerNotificaciones(idContribuyente);
        setNotificaciones(data);
        
      } catch (error) {
        console.error('Error al obtener las notificaciones', error);
      }
     
     
    };

    fetchNotificaciones();
  }, []);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };


useEffect(() => {
  // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
 
}, [dispatch,notificaciones]);
 
return (
  <Layout>
    <>
       <div>
        <h1>Lista de Libros</h1>
        {notificaciones ? (
          <div>
            {notificaciones?.datos?.campos.map((campo, nombre) => (
              <div key={campo.nombre}>
                <b>{campo.nombre}:</b>
              </div>
            ))}
            {notificaciones?.datos?.filas.map((fila, index) => (
              <div key={index}>
                 {fila.fila.map((valor, idx) => {
                  const campo = notificaciones.datos.campos[idx];
                  if (campo.tipo === "DateTimeOffset" || campo.tipo === "DateTime") {
                    return <div key={idx}>{formatDate(valor)}</div>;
                  }
                  return <div key={idx}>{valor}</div>;
                })}
              </div>
            ))}
          </div>
        ) : (
          <div>no content</div>
        )}
        {/* <button onClick={() => handleDetalleClick()}>Ver Detalle</button> */}
      </div> 
      <div>
        <h1>Mis notificaciones</h1>
        <NotificationsTabPanel />
      </div>
    </>
  </Layout>
)
        }

export default MisNotificaciones;
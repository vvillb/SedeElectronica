import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificationsTabPanel from '../../components/Menu/MenuItem/NotificationsTabPanel';
import NotificacionesService from '../../services/NotificacionesServices/NotificacionesService';
import { DataGrid, Button as DevButton } from 'devextreme-react';
import { Column } from 'devextreme-react/data-grid';



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

// Get the field names dynamically from the backend data
const fieldNames = notificaciones?.datos?.campos?.map((campo) => campo.nombre);

// Transform the data into the array of objects
const transformedData = notificaciones?.datos?.filas.map((fila) => {
  const rowData = {};

  fila.fila.forEach((valor, index) => {
    const fieldName = fieldNames[index];
    const campo = notificaciones?.datos?.campos[index];

    if (campo.tipo === "DateTimeOffset" || campo.tipo === "DateTime") {
      rowData[fieldName] = formatDate(valor);
    } else {
      rowData[fieldName] = valor;
    }
  });

  return rowData;
});
 
return (
  <Layout>
    <>
    <DataGrid
      dataSource={transformedData}
      defaultColumns={fieldNames}
      showBorders={true}
    
    />
       <div>
        <h1>Lista de Libros</h1>
        {notificaciones ? (
          <DataGrid
              dataSource={notificaciones?.datos?.filas[0].fila}
              showBorders={true}
              columnAutoWidth={true}
              >
            {notificaciones?.datos?.campos.map((campo, nombre) => (
               <Column  key={campo.nombre} dataField={campo.nombre} caption={campo.nombre} />
              
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
          </DataGrid>
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
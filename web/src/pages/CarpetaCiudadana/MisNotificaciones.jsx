import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificationsTabPanel from '../../components/Menu/MenuItem/NotificationsTabPanel';
import NotificacionesService from '../../services/NotificacionesServices/NotificacionesService';
import { DataGrid, Button as DevButton, List, TabPanel } from 'devextreme-react';
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

const ItemTemplate = (data) => {
  return (
    <div className='dx-fieldset'>
      <table>
        <tbody>
          {Object.entries(data).map(([fieldName, fieldValue]) => (
            <tr key={fieldName} className="field-label">
              <th>{fieldName}:</th>
              <td>{fieldValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

 
return (
  <Layout>
    <>
    <div>
       <List
          dataSource={transformedData}
          searchExpr={transformedData}
          searchEnabled={true}
          searchMode='contains'
          itemRender={ItemTemplate}
    
    />
    </div>
   

    {/* <DataGrid
      dataSource={transformedData}
      defaultColumns={fieldNames}
      showBorders={true}
    
    /> */}
       
   
    </>
  </Layout>
)
        }

export default MisNotificaciones;
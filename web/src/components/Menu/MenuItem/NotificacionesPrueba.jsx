import React, { useEffect, useState } from 'react'
import Notificationes from './Notificaciones';
import { useDispatch } from 'react-redux';
import NotificacionesService from '../../../services/NotificacionesServices/NotificacionesService';
import { List } from 'devextreme-react';

const NotificacionesPrueba = () => {
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
  const fieldNames = notificaciones?.datos?.campos?.map((campo) => campo.nombre);
  
  const notifications = notificaciones?.datos?.filas.map((fila) => {
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

  const ItemTemplate = (notificaciones) => {
    return (
      <div className='dx-fieldset'>
        <div className="field-label"> 
          {notificaciones?.datos?.campos?.nombre}
        </div>
      </div>
    );
  };
   
  return (
    <div>
        <React.Fragment>
      <div className="list-container">
        <List
          dataSource={notifications}
          height={400}
          itemRender={ItemTemplate}
          searchExpr={['codigoExpediente', 'descripcionExpediente', 'fechaEnvio', 'estado']}
          searchEnabled={true}
          searchMode='contains'
        />
      </div>
      
    </React.Fragment>
    </div>
  )
}

export default NotificacionesPrueba

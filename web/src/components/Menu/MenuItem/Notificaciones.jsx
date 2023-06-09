import React, { useState } from 'react';
import SelectBox from 'devextreme-react/select-box';
import List from 'devextreme-react/list';

const searchModes = ['contains', 'startsWith', 'equals'];

const Notificationes = ({ notifications }) => {
   
  const ItemTemplate = (data) => {
    return (
      <div className='dx-fieldset'>
        <div className="field-label"> 
          <b>Código de Expediente:</b> {data.codigoExpediente}<br/>
          <b>Descripción del Expediente:</b> {data.descripcionExpediente}<br/>
          <b>Fecha de Envío:</b> {data.fechaEnvio}<br/>
          <b>Estado:</b> {data.estado}
        </div>
      </div>
    );
  };

  return (
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
  );
};

export default Notificationes;

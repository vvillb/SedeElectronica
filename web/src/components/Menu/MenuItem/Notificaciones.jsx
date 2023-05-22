import React, { useState } from 'react';
import SelectBox from 'devextreme-react/select-box';
import List from 'devextreme-react/list';

const Notificationes = ({ notifications }) => {
  const [searchMode, setSearchMode] = useState('contains');
  const [searchText, setSearchText] = useState('');

  const handleSearchModeChange = (e) => {
    setSearchMode(e.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.value);
  };
  

  const filteredNotifications = notifications.filter((notification) => {
    const { codigoExpediente, descripcionExpediente, fechaEnvio, estado } = notification;

    switch (searchMode) {
      case 'contains':
        return (
          codigoExpediente.includes(searchText) ||
          descripcionExpediente.includes(searchText) ||
          fechaEnvio.includes(searchText) ||
          estado.includes(searchText)
        );
      case 'startsWith':
        return (
          codigoExpediente.startsWith(searchText) ||
          descripcionExpediente.startsWith(searchText) ||
          fechaEnvio.startsWith(searchText) ||
          estado.startsWith(searchText)
        );
      case 'equals':
        return (
          codigoExpediente === searchText ||
          descripcionExpediente === searchText ||
          fechaEnvio === searchText ||
          estado === searchText
        );
      default:
        return true;
    }
  });

  const ItemTemplate = ({ data }) => (
    <div>
      <div><b>Código Expediente:</b> {data?.codigoExpediente}</div>
      <div><b>Descripción Expediente:</b> {data?.descripcionExpediente}</div>
      <div><b>Fecha de Envío:</b> {data?.fechaEnvio}</div>
      <div><b>Estado:</b> {data?.estado}</div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="list-container">
        <List
          dataSource={filteredNotifications}
          height={400}
          itemRender={ItemTemplate}
          searchExpr={['codigoExpediente', 'descripcionExpediente', 'fechaEnvio', 'estado']}
          searchEnabled={true}
          searchMode={searchMode}
        />
      </div>
      <div className="options">
        <div className="caption">Options</div>
        <div className="option">
          <span>Search mode:</span>
          <SelectBox
            items={['contains', 'startsWith', 'equals']}
            value={searchMode}
            onValueChanged={handleSearchModeChange}
          />
        </div>
        <div className="option">
          <span>Search text:</span>
          <input type="text" value={searchText} onChange={handleSearchTextChange} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notificationes;

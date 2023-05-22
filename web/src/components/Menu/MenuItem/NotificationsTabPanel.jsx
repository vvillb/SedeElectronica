import React from 'react'
import Notificaciones from './Notificaciones'
import Comunicaciones from './Comunicaciones'
import { TabPanel } from 'devextreme-react';
import NotificacionesPrueba from './NotificacionesPrueba';

class NotificationsTabPanel extends React.Component    {
  render() {
    const tabComponents={
        Notificaciones:NotificacionesPrueba,
        Comunicaciones:Comunicaciones,
    };

    return (
      <div>
        
        <TabPanel
        dataSource={Object.keys(tabComponents)}
        itemComponent={({ data }) => {
          const Component = tabComponents[data];
          return <Component />;
        }}/>
        
      </div>
    )
  }
}

export default NotificationsTabPanel;

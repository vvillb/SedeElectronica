import React from 'react'
import Notificationes from './Notificaciones';

const NotificacionesPrueba = () => {
    const notifications = [
        {
          codigoExpediente: 'EXP001',
          descripcionExpediente: 'Notificación 1',
          fechaEnvio: '2022-05-01',
          estado: 'Pendiente',
        },
        {
          codigoExpediente: 'EXP002',
          descripcionExpediente: 'Notificación 2',
          fechaEnvio: '2022-05-03',
          estado: 'Aceptada',
        },
        {
          codigoExpediente: 'EXP003',
          descripcionExpediente: 'Notificación 3',
          fechaEnvio: '2022-05-05',
          estado: 'Rechazada',
        },
      ];
  return (
    <div>
       <Notificationes notifications={notifications} />
    </div>
  )
}

export default NotificacionesPrueba

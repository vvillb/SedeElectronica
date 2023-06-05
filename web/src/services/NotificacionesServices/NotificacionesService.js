import axiosService from "../axiosService";



class NotificacionesService {
    
    obtenerNotificaciones () {
        
        return axiosService.axiosInstance.get( `/Notificaciones/GetNotificaciones/`)
        
    }
    getNotificacion(idNotificacion) {
        return axiosService.axiosInstance.get(`/Notificaciones/GetNotificacion/${idNotificacion}`);
      }
    
      getBitacoraNotificaciones(idNotificacion) {
        return axiosService.axiosInstance.get(`/Notificaciones/GetBitacoraNotificaciones/${idNotificacion}`);
      }
    
      getAccionesAMostrar(idNotificacion) {
        return axiosService.axiosInstance.get(`/Notificaciones/GetAccionesAMostrar/${idNotificacion}`);
      }
    
    //   descargarAdjunto(idNotificacion) {
    //     return axiosService.axiosInstance.get(`/Notificaciones/DescargarAdjunto/${idNotificacion}`);
    //   }
    
      getAcuseLectura(idNotificacion) {
        return axiosService.axiosInstance.get(`/Notificaciones/GetAcuseLectura/${idNotificacion}`);
      }
    }

export default NotificacionesService;
import axiosService from "../axiosService";



class NotificacionesService {
    
    async obtenerNotificaciones () {
        return await axiosService.axiosInstance.get( `/Notificaciones/GetNotificaciones/`)
    }
    async getNotificacion(idNotificacion) {
        return await axiosService.axiosInstance.get(`/Notificaciones/GetNotificacion/${idNotificacion}`);
      }
    
      async getBitacoraNotificaciones(idNotificacion) {
        return await axiosService.axiosInstance.get(`/Notificaciones/GetBitacoraNotificaciones/${idNotificacion}`);
      }
    
      async getAccionesAMostrar(idNotificacion) {
        return await axiosService.axiosInstance.get(`/Notificaciones/GetAccionesAMostrar/${idNotificacion}`);
      }
    
      async descargarAdjunto(idNotificacion) {
        return await axiosService.axiosInstance.get(`/Notificaciones/DescargarAdjunto/${idNotificacion}`);
      }
    
      async getAcuseLectura(idNotificacion) {
        return await axiosService.axiosInstance.get(`/Notificaciones/GetAcuseLectura/${idNotificacion}`);
      }
    }

export default NotificacionesService;
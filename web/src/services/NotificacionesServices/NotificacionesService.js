import axiosService from "../axiosService";



class NotificacionesService {
    
    obtenerNotificaciones () {
        
        return axiosService.axiosInstance.get( `/Notificaciones/GetNotificaciones/`)
        
    }
}

export default NotificacionesService;
import axiosService from "../axiosService";



class NotificacionesService {
    
    obtenerNotificaciones (idContribuyente) {
        
        return axiosService.axiosInstance.get( `/Notificaciones/GetNotificaciones/${idContribuyente}`)
        
    }
}

export default NotificacionesService;
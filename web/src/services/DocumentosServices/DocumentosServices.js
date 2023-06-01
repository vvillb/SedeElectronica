



import axiosService from "../axiosService";



class DocumentosService {
    
    checkDocumento (idDocumento) {
        
        return axiosService.axiosInstance.get( `/Documentos/CotejoDocumento/${idDocumento}`)
        
    }
}

export default DocumentosService;


// Y después desde los diferentes puntos de la aplicación:


// import axiosService from './axiosService'

// // Utilizar el atributo de instancia
// const response = await axiosService.axiosInstance.get('/data');

// // Para establecer el token
// axiosService.setToken('TOKEN_AQUI')

// // Para eliminar el token
// axiosService.removeToken()


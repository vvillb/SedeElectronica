



import axiosService from "../axiosService";



class DocumentosService {
    
    checkDocumento (idDocumento) {
        
        return axiosService.axiosInstance.get( `/Documentos/CotejoDocumento/${idDocumento}`)
        
    }
}

export default DocumentosService;
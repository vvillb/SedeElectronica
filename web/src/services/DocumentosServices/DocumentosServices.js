

// const API_URL = 'https://localhost:7041';

import axiosService from "../axiosService";



class DocumentosService {
    
    checkDocumento (idDocumento) {
        
        console.log('url documento:' ,`/Documentos/CotejoDocumento/${idDocumento}`)
        return axiosService.axiosInstance.get( `/Documentos/CotejoDocumento/${idDocumento}`)
        
    }
}

export default DocumentosService;
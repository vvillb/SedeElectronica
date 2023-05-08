

// const API_URL = 'https://localhost:7041';

import axiosService from "../axiosService";

class DocumentosService {
    checkDocumento (idDocumento) {
        return axiosService.get( `/Documentos/CotejoDocumento/${idDocumento}`)
    }
}

export default DocumentosService;
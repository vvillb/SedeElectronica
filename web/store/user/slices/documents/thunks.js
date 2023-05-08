
import axiosService from '../../../../src/services/axiosService';
import { setDocument } from './documentSlice';




export const getDocument = (objetoBusqueda) => {
    return async( dispatch, getState ) => {
        
        console.log(axiosService)
      
 
        try{ const { data } = await axiosService.axiosInstance.get(`/Documentos/CotejoDocumento/${objetoBusqueda}`);  
          dispatch(setDocument(data));

         

        } catch (error) {
          console.log(error);
        }
      }
    }

import { documentApi  } from '../../apis/DocumentApi';
import { setDocument } from './documentSlice';




export const getDocument = (objetoBusqueda) => {
    return async( dispatch, getState ) => {
        
        console.log("test thunk")
      
 
        try{ const { data } = await documentApi.get(`/Documentos/CotejoDocumento/${objetoBusqueda}`);  
          dispatch(setDocument(data));

         

        } catch (error) {
          console.log(error);
        }
      }
    }

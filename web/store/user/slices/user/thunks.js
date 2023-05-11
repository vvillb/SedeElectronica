import axiosService from '../../../../src/services/axiosService';
import { setLoginUser } from './userSlice';



export const getLoginUser = (certificadoFirma, mensaje) => {
    return async( dispatch, getState ) => {
        
       
      
 
        try{ const { data } = await axiosService.axiosInstance.post('/Login', {
            certificadoFirma,
            mensaje
          });  
          dispatch(setLoginUser(data));

         

        } catch (error) {
          console.log(error);
        }
      }
    }

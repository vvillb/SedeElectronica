import { userApi } from '../../apis/userApi';
import { setLoginUser } from './userSlice';



export const getLoginUser = (certificadoFirma, mensaje) => {
    return async( dispatch, getState ) => {
        
        console.log("test thunk",certificadoFirma,mensaje)
      
 
        try{ const { data } = await userApi.post('/Login', {
            certificadoFirma,
            mensaje
          });  
          dispatch(setLoginUser(data));

         

        } catch (error) {
          console.log(error);
        }
      }
    }

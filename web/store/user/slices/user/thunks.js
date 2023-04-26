import { userApi } from '../../apis/userApi';
import { setLoginUser } from './userSlice';



export const getLoginUser = (certificadoFirma, mensaje) => {
    return async( dispatch, getState ) => {
        
        console.log("test thunk",certificadoFirma,mensaje)
      
        // TODO: realizar petición http
        // const resp = await fetch(`https://pokeapi.co/api/v2/user?limit=10&offset=${ page * 10 }`);
        // const data = await resp.json();
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
//         const { data } = await userApi.post('/Login', {
//             certificadoFirma,
//             mensaje
//           });  
//           console.log("respuesta", data)

//         dispatch( setLoginUser({ data }) );
//     }
// }
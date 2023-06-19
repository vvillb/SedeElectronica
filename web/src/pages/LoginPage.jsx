import React, { useEffect} from 'react'
import Layout from '@client-layout';
import futufirma from '../utils/futufirma'
import { useDispatch , useSelector} from 'react-redux';
import { getLoginUser, setLogoutUser } from '../../store/user/slices/user/userSlice';



import { Button  as DevButton, LoadIndicator } from 'devextreme-react';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';

function LoginPage() {
  
  // const {user} = useSelector(state => state.user);
  const {  autenticado,user,isLoading} = useSelector((state) => state.user)

  const dispatch = useDispatch();



/////////////////////////////////
  useEffect(() => {
    // Clean up the navigation if it's a root page
    dispatch(clearBreadcrumbs());
    // Add a new breadcrumb element
    const label = 'Nueva página';
    dispatch(addBreadcrumbs({ label }));
  }, [dispatch]);
////////////////////////////////////

  function futufirmaVersionRecibida(mensaje) {
    console.log('futufirmaVersionRecibida: ', mensaje)

  }

  const futufirmaAutenticacionRecibida=(datos)=> {
   
    dispatch( getLoginUser({ certificadoFirma: datos.certificadoFirma, firma: datos.firma }) )
    
}

  function noInstalado() {
    console.log('No instalado -> Open')
    window.open('/Futufirma/FutuFirma.java-1.0.40.msi');
  }

  const autenticar = (datos) => { 
    futufirma.onRespuesta = futufirmaAutenticacionRecibida;
    futufirma.autenticar();    
    dispatch(getLoginUser(datos.certificadoFirma, datos.firma))
    
   
  }
  const logout = () => {
    dispatch(setLogoutUser());
    console.log("usuario auteticado:", autenticado)
  };

  // eslint-disable-next-line no-unused-vars
  const version = () => {
    futufirma.onRespuesta = futufirmaVersionRecibida;
    futufirma.version()
  }
  
  futufirma.onAplicacionNoInstalada = noInstalado;

  futufirma.debug = true;
  futufirma.emisoresReconocidos = ["FUTUVER SUBCA 001","FUTUVER SUBCA 001-18","AC Componentes Informáticos","AC FNMT Usuarios","AC DNIE 004","AC DNIE 005","AC DNIE 006"];
 /*  version() */
 
  return (

   
    <Layout>
      <>
        <div>
        
        
        {isLoading?(
            <LoadIndicator id="large-indicator" height={60} width={60} />
          ):(
            <div>
            
            <div>
            <div>
                {autenticado?`Hola, ${user.nombre}!`:"Para acceder con futufirma debes autenticarte"}
            </div>
              {autenticado?(
                <DevButton className='mt-4 px-6 flex flex-end' type='default'  onClick={logout}>
                Logout
                </DevButton> 
              ):(
                <DevButton className='mt-4 px-6 flex flex-end' type='default'  onClick={ autenticar}>
                Autenticarse
                </DevButton> 
              )}
              </div>
              </div>
          )}
       
          </div>
          
         
        
        
   
</>
    </Layout>    
  )
}

export default LoginPage;

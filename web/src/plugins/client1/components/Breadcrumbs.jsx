import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { clearBreadcrumbs } from '../../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import futufirma from '../../../utils/futufirma';
import { getLoginUser, setLogoutUser } from '../../../../store/user/slices/user/userSlice';
import { Button  as DevButton } from 'devextreme-react';



function Breadcrumbs() {
 
const {  autenticado, user } = useSelector((state) => state.user)
const dispatch = useDispatch();


//FUTUFIRMA///////////////////////////////////
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
////////////////////////////////////////////////////
const condicion=false;


  useEffect(() => {
    const handlePopState = () => {
      if (breadcrumbs.length > 0) {
        dispatch(clearBreadcrumbs());
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const breadcrumbs = useSelector((state) => state.breadcrumbs);

  return (
   <>
    <div className="flex items-center bg-gray-800 py-2 px-4">
   
      <Link to="/" className="text-gray-300 hover:text-gray-500">Ir a la página anterior</Link>

      
      <h1>ggk</h1>
      <nav className="w-full pl-32">
        <ol>
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <Link to={item.path} className="text-gray-300 hover:text-gray-500">
                {item.path}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="text-gray-300 mx-2"></span>}
            </span>
          ))}
        </ol>
      </nav>
        <div className=' flex  items-center'>
      <div >
       <span className="text-gray-300">
           {autenticado?`Hola, ${user?.nombre}!`:"Para acceder con futufirma debes autenticarte"}  
                 </span>
      </div>
      <div className='flex items-center'>
     {autenticado ? (
       <div>
        
         <DevButton className='px-6 flex flex-end' type='default'  onClick={logout} >
          logout
         </DevButton>
       </div>
     ) : (
       <div>
         <DevButton className='px-6 flex flex-end' type='default' icon='user' onClick={autenticar}>
           login
         </DevButton>
       </div>
     )}
   </div>
         </div> 
      </div>
       
         </>    

  )
}

export default Breadcrumbs;

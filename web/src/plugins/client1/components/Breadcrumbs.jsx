import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { clearBreadcrumbs } from '../../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import futufirma from '../../../utils/futufirma';
import { getLoginUser } from '../../../../store/user/slices/user/thunks';
import { setLogoutUser } from '../../../../store/user/slices/user/userSlice';
import { Button  as DevButton } from 'devextreme-react';



function Breadcrumbs() {
 
const {  autenticado,user } = useSelector((state) => state.user)
const dispatch = useDispatch();


//FUTUFIRMA///////////////////////////////////
function futufirmaVersionRecibida(mensaje) {
  console.log('futufirmaVersionRecibida: ', mensaje)

}

const futufirmaAutenticacionRecibida=(datos)=> {
 
  dispatch( getLoginUser(datos.certificadoFirma, datos.firma) )
  
 
}

function noInstalado() {
  console.log('No instalado -> Open')
  window.open('/Futufirma/FutuFirma.java-1.0.40.msi');
}

const autenticar = () => { 
  futufirma.onRespuesta = futufirmaAutenticacionRecibida;
  futufirma.autenticar();
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
////////////////////////////////////////////////////



  // const history = unstable_HistoryRouter();

  useEffect(() => {
    const handlePopState = () => {
      dispatch(clearBreadcrumbs());
      console.log('prueba')
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const breadcrumbs = useSelector((state) => state.breadcrumbs);

  return (
    <div className="flex items-center bg-gray-800 py-2 px-4">
     <div>
      <Link to="/" className="text-gray-300 hover:text-gray-500">Ir a la página anterior</Link>

      
      
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
      </div>
      <div>
        <span>
          {autenticado?`Hola, ${user.nombre}!`:"Para acceder con futufirma debes autenticarte"}
        </span>
       
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
    
  )
}

export default Breadcrumbs;

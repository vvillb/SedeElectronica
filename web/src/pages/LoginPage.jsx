import React, { useEffect } from 'react'
import Layout from '@client-layout';
import futufirma from '../utils/futufirma'
import { useDispatch , useSelector} from 'react-redux';
import { getLoginUser, setLogoutUser } from '../../store/user/slices/user/userSlice';



import { Button  as DevButton } from 'devextreme-react';
// import RegisterForm from '../plugins/common/registerForm';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';

function LoginPage() {
  
  // const {user} = useSelector(state => state.user);
  const {  autenticado,user } = useSelector((state) => state.user)

  const dispatch = useDispatch();


  useEffect(() => {
    // Clean up the navigation if it's a root page
    dispatch(clearBreadcrumbs());
    // Add a new breadcrumb element
    const label = 'Nueva página';
    dispatch(addBreadcrumbs({ label }));
  }, [dispatch]);

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
        <span>
          {autenticado?`Hola, ${user.nombre}!`:"Para acceder con futufirma debes autenticarte"}
        </span>
        <div>
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
        {/* <div className="relative py-3 sm:w-96 mx-auto text-center">
          
          <RegisterForm/>
          <span className="text-2xl font-light ">Login to your account</span>
          <div className="mt-4 text-left dx-card">
            <div className="h-2 dx-theme-accent-as-background-color rounded-t-md"></div>
            <div className="px-8 py-6 dx-theme-border-color-as-background-color">
              <label className="block"> Usuario </label>
              {/* <input type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/> 
              <TextBox placeholder='Email' className="dx-field"/>
              <label className="block mt-3"> Contraseña </label>
              <TextBox type="password" placeholder="Password" className="dx-field"/>
                <div className="flex justify-between items-baseline">
                    {/*<button type="submit" className="mt-4 bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-slate-600 ">Login</button> 
                 {/*<DevButton text="Login" className='mt-4 px-6' type='default' />
                  <a href="#" className="text-sm hover:underline">Contraseña olvidada?</a>
                </div>
            </div>
        
      </div> */}
</>
    </Layout>    
  )
}

export default LoginPage;

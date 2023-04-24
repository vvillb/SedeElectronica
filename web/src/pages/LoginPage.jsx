import React from 'react'
import Layout from '@client-layout';
import futufirma from '../utils/futufirma'


import { Button  as DevButton, TextBox } from 'devextreme-react';

function LoginPage() {

  function futufirmaVersionRecibida(mensaje) {
    console.log('futufirmaVersionRecibida: ', mensaje)

  }

  function futufirmaAutenticacionRecibida(datos) {
    console.log('futufirmaAutenticacionRecibida: ', datos)
}

  function noInstalado() {
    console.log('No instalado -> Open')
    window.open('/Futufirma/FutuFirma.java-1.0.40.msi');
  }

  const autenticar = () => { 
    futufirma.onRespuesta = futufirmaAutenticacionRecibida;
    futufirma.autenticar();
  }

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
        <DevButton className='mt-4 px-6 flex flex-end' type='default' onClick={autenticar}>
            Autenticarse
          </DevButton>
        <div className="relative py-3 sm:w-96 mx-auto text-center">
           
          <span className="text-2xl font-light ">Login to your account</span>
          <div className="mt-4 text-left dx-card">
            <div className="h-2 dx-theme-accent-as-background-color rounded-t-md"></div>
            <div className="px-8 py-6 dx-theme-border-color-as-background-color">
              <label className="block"> Usuario </label>
              {/* <input type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/> */}
              <TextBox placeholder='Email' className="dx-field"/>
              <label className="block mt-3"> Contraseña </label>
              <TextBox type="password" placeholder="Password" className="dx-field"/>
                <div className="flex justify-between items-baseline">
                    {/*<button type="submit" className="mt-4 bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-slate-600 ">Login</button> */}
                 <DevButton text="Login" className='mt-4 px-6' type='default' />
                  <a href="#" className="text-sm hover:underline">Contraseña olvidada?</a>
                </div>
            </div>
      
        </div>
      </div>

    </Layout>    
  )
}

export default LoginPage;

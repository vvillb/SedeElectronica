import React from 'react'
import Layout from '@client-layout';
import {useTranslation} from 'react-i18next'
import { useState } from 'react';
import DocumentosService from '../../services/DocumentosServices/DocumentosServices';

function Verificacion() {
  const{t}=useTranslation('common');

  const [consulta, setConsulta] = useState('')
  const [respuesta, setRespuesta] = useState('')

  const service = new DocumentosService()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data,error} = await service.checkDocumento(consulta)
      //if error mostrar mensaje de error 

      //else:
      if (data.contenidoPDF){
        setRespuesta(data.contenidoPDF)
        // TODO: en este punto se podría quitar la variable reactiva "respuesta" y llamar al método de descarga
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="consulta">Documento:</label>
        <input type="text" id="consulta" value={consulta} onChange={event => setConsulta(event.target.value)} />
        <button type="submit">Consultar documento</button>
      </div>
      <div>
        <label htmlFor="texto">Respuesta:</label>   
        {respuesta}
      </div>
      
    </form>
    </Layout>
  );
}

export default Verificacion;

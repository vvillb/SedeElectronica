import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import {useTranslation} from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextBox } from 'devextreme-react';
import { addBreadcrumbs, clearBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import DocumentosService from '../../services/DocumentosServices/DocumentosServices';
import { HttpStatusCode } from 'axios';
import { startLoadingUsers } from '../../../store/user/slices/user/userSlice';


//C14CAA93-D308-42AB-ABB2-FEE62205B419

function DocumentsCheck() {
  const [inputValue, setInputValue] = useState('');
  const{t}=useTranslation('common');
  const dispatch = useDispatch();
  const service = new DocumentosService(); // Instantiate the service


/////////////////////////////////
useEffect(() => {
  // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
}, [dispatch]);
////////////////////////////////////

   // Handle search button click
   const handleButtonClick = async () => {
    try {
      const { data } = await service.checkDocumento(inputValue);
     
      
      if (data.contenidoPDF) {
  
       // Call handleDownload function to download the PDF
        const linkSource = `application/pdf;base64,${data.contenidoPDF}`;
        const downloadLink = document.createElement('a');
        const fileName = 'documento.pdf';
        downloadLink.href = `data:${linkSource}`;
        document.body.appendChild(downloadLink);
        downloadLink.download = fileName;
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);
      } else {
        // Document not found
        setMessage('El documento buscado no pudo ser encontrado.');
      }
    } catch (error) {
     
      
        setMessage('Error. Documento no encontrado');
       
      
    }
  };
  const [message, setMessage] = useState('');

 const  contenidoPDF   = useSelector((state) => state.document.contenidoPDF) 

//a continuacion de la respuesta del servidor  (si no hay eror)
  
   function handleDownload(contenidoPDF) {
    const linkSource = `application/pdf;base64,${contenidoPDF}`;
    const downloadLink = document.createElement("a");
    const fileName = "documento.pdf";
    downloadLink.href = `data:${linkSource}`;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  useEffect(() => {
    // Check if contenidoPDF is available
    if (contenidoPDF) {
      // Call handleDownload function to download the PDF
      handleDownload();
    }
  }, [contenidoPDF]);


 
  return (
  <Layout>
    <div>
        <h1>Consulta de documentos</h1>
        <h1>{t('documents.nombre')}</h1>
        <h2>{t('common.test')}</h2>
        <h3>{t('documents.client',{ns:'client'})}</h3>
    </div>
    <div id="container">
      
    <div className="dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-label">Buscar documentos</div>
            <div className="dx-field-value">
              <TextBox value={inputValue} onValueChanged={(e) => setInputValue(e.value) } defaultValue="" />
            </div>
          </div>
          </div>
          <div> <Button type="default"  useSubmitBehavior={true} onClick={handleButtonClick}>Buscar</Button></div>
           </div>
           {message && <div className="error-message">{message}</div>}
            
  </Layout>
  )
}

export default DocumentsCheck;

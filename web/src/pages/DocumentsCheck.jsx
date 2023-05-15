import React, { useEffect, useState } from 'react'
import Layout from '@client-layout';
import {useTranslation} from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { getDocument } from '../../store/user/slices/documents/thunks';
import { SimpleItem } from 'devextreme-react/form';
import { Form } from 'devextreme-react/data-grid';
import { Button, TextBox } from 'devextreme-react';
import { setContenidoPDF } from '../../store/user/slices/documents/documentSlice';
import { hidePopup, showPopup } from '../../store/user/slices/popUps/popupSlice';

//C14CAA93-D308-42AB-ABB2-FEE62205B419

function DocumentsCheck() {
  const [inputValue, setInputValue] = useState('');
  const{t}=useTranslation('common');
  const dispatch = useDispatch();



  //limpiar la navegación si es una página de raíz:
   dispatch(clearBreadcrumbs());
  //introducir un elemento
  const label='Nueva página';
  dispatch(addBreadcrumbs({label}))

  // Handle search button click
  const handleButtonClick =  async () => {
    try {
      const { data } = await dispatch(getDocument(inputValue));
      if (data.contenidoPDF) {
        // Document found
      } else {
        // Document not found
        dispatch(showPopup('El documento buscado no pudo ser encontrado.'));
      }
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 401) {
        // Unauthorized (401) error
        dispatch(showPopup('Debes iniciar sesión para buscar documentos.'));
      } else {
        // Other errors
        dispatch(showPopup('Ocurrió un error en la búsqueda de documentos.'));
      }
    }
  };



 const  contenidoPDF   = useSelector((state) => state.document.contenidoPDF) 


  
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

  const popupVisible=useSelector((state)=>state.popup.visible)
  const popupMessage =useSelector((state)=>state.popup.message)
 
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
   <br/>
    {contenidoPDF && (
    <div>
      <Button type="default" useSubmitBehavior={true}  onClick={() => handleDownload(contenidoPDF)}>
        Descargar
      </Button>
    </div>
     )}
    {/* <Form formData={searchTerm} readOnly={false}>
          <SimpleItem
            dataField="searchTerm"
            editorType="dxTextBox"
            editorOptions={{
              onValueChanged: (e) => setSearchTerm(e.value),
            }}
            label={{
              text: 'Buscar',
            }}
          />
          <Button
            text="Buscar documento"
            onClick={handleSearch}
          />
        </Form> */}
            </div>
            {popupVisible && (
        <div className="popup-container">
          <div className="popup-message">{popupMessage}</div>
          <Button
            type="default"
            text="Cerrar"
            onClick={() => dispatch(hidePopup())}
          />
        </div>
     )}
  </Layout>
  )
}

export default DocumentsCheck;

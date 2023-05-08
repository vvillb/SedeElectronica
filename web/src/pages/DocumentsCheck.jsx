import React, { useState } from 'react'
import Layout from '@client-layout';
import {useTranslation} from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { getDocument } from '../../store/user/slices/documents/thunks';
import { SimpleItem } from 'devextreme-react/form';
import { Form } from 'devextreme-react/data-grid';
import { Button, TextBox } from 'devextreme-react';
import { setContenidoPDF } from '../../store/user/slices/documents/documentSlice';



function DocumentsCheck() {
  const [inputValue, setInputValue] = useState('');
  const{t}=useTranslation('common');
  const dispatch = useDispatch();
  // const [searchTerm, setSearchTerm] = useState('');

  //limpiar la navegación si es una página de raíz:
   dispatch(clearBreadcrumbs());
  //introducir un elemento
  const label='Nueva página';
  dispatch(addBreadcrumbs({label}))

  // Handle search button click
  const handleButtonClick = () => {
     dispatch(getDocument(inputValue));
   };

  // const handleButtonClick = () => {
  //   dispatch(getDocument('C14CAA93-D308-42AB-ABB2-FEE62205B419'));
  // };


    const { contenidoPDF  } = useSelector((state) => state.document.contenidoPDF) 
 console.log(contenidoPDF)

 
  return (
  <Layout>
    <div>
        <h1>Consulta de documentos</h1>
        <h1>{t('documents.nombre')}</h1>
        <h2>{t('common.test')}</h2>
        <h3>{t('documents.client',{ns:'client'})}</h3>
        <div>`0 ${document.contenidoPDF} 0`</div>
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
    <Button type="default"  useSubmitBehavior={true} onClick={handleButtonClick}>buscar</Button>
 


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
  </Layout>
  )
}

export default DocumentsCheck;

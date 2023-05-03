import React from 'react'
import Layout from '@client-layout';
import { addBreadcrumbs } from '../../../store/breadcrumbs/slices/breadcrumbSlice';
import { useDispatch } from 'react-redux';


function MisDocumentos() {

  const dispatch = useDispatch();


    //introducir un elemento
    const label='Nueva página';
    dispatch(addBreadcrumbs({label}))
  

    return (
      <Layout>
          <div>
           <h1>Mis documentos</h1>
          </div>
      </Layout>
    )
  }
  
  export default MisDocumentos;
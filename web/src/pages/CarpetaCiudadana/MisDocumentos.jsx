import React, { useEffect } from 'react'
import Layout from '@client-layout';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { useDispatch } from 'react-redux';


function MisDocumentos() {


  const dispatch = useDispatch();


    //introducir un elemento
    const label='Nueva página';

    useEffect(() => {
    dispatch(addBreadcrumbs({label}))
    console.log('añadir miga')
  }, [dispatch]);

    return (
      <Layout>
          <div>
           <h1>Mis documentos</h1>
          </div>
      </Layout>
    )
  }
  
  export default MisDocumentos;
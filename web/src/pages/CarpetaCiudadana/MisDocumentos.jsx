import React, { useEffect } from 'react'
import Layout from '@client-layout';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { useDispatch } from 'react-redux';


function MisDocumentos() { 

  const dispatch = useDispatch();


/////////////////////////////////
useEffect(() => {
  // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
}, [dispatch]);
////////////////////////////////////

    return (
      <Layout>
          <div>
           <h1>Mis documentos</h1>
          </div>
      </Layout>
    )
  }
  
  export default MisDocumentos;
import React from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';

function Catalogo() {
  const dispatch = useDispatch();

 
  //introducir un elemento
  const label='Nueva página';
  
  dispatch(addBreadcrumbs({label}))

    return (
      <Layout>
          <div>
         <h1>Catálogo de servicios</h1>
        </div>
      </Layout>
    )
  }
  
  export default Catalogo;
  
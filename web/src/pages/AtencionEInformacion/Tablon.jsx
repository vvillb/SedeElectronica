import React from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/breadcrumbs/slices/breadcrumbSlice';

function Tablon() {
  const dispatch = useDispatch();

 
  //introducir un elemento
  const label='Nueva página';
  
  dispatch(addBreadcrumbs({label}))

    return (
      <Layout>
          <div>
         <h1>Tablón de anuncios</h1>
        </div>
      </Layout>
    )
  }
  
  export default Tablon;
  
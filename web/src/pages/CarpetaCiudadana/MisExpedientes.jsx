import React from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';


function MisExpedientes() {
  const dispatch = useDispatch();

 
  //introducir un elemento
  const label='Nueva página';
  
  dispatch(addBreadcrumbs({label}))

    return (
      <Layout>
          <div>
           <h1>Mis expedientes</h1>
          </div>
      </Layout>
    )
  }
  
  export default MisExpedientes
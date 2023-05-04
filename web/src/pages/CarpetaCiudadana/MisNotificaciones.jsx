import React from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';


function MisNotificaciones() {

  const dispatch = useDispatch();

 
  //introducir un elemento
  const label='Nueva página';
  
  dispatch(addBreadcrumbs({label}))
    return (
      <Layout>
          <div>
           <h1>Mis notificaciones</h1>
          </div>
      </Layout>
    )
  }
  
  export default MisNotificaciones
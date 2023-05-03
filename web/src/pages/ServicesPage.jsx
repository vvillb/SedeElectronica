import React from 'react'
import Layout from '@client-layout';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/breadcrumbs/slices/breadcrumbSlice';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import pushBreadcrumb from '../../store/breadcrumbs';
// import useRouter from 'react-router-dom'

function ServicesPage() {
  

  const dispatch = useDispatch();

    //limpiar la navegación si es una página de raíz:
    dispatch(clearBreadcrumbs());
    //introducir un elemento
    const label='Nueva página';
    dispatch(addBreadcrumbs({label}))

  return (
    <Layout>
      <div>
      <h1>Servicios</h1>
    </div>
    </Layout>
    
  )
}

export default ServicesPage;

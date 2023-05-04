import React from 'react';
import Layout from '@client-layout';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { useDispatch } from 'react-redux';

function Quejas() {
    const dispatch = useDispatch();
  
   
    //introducir un elemento
    const label='Nueva página';
    
    dispatch(addBreadcrumbs({label}))
  
    return (
        <Layout>
            <h1>Quejas y sugerencias</h1>
        </Layout>
     );
}

export default Quejas;

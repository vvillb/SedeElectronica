import React, { useEffect } from 'react';
import Layout from '@client-layout';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { useDispatch } from 'react-redux';

function Quejas() {
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
            <h1>Quejas y sugerencias</h1>
        </Layout>
     );
}

export default Quejas;

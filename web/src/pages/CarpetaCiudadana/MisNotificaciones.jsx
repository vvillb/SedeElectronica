import React, { useEffect } from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs } from '../../../store/user/slices/breadcrumbs/breadcrumbSlice';
import NotificationsTabPanel from '../../components/Menu/MenuItem/NotificationsTabPanel';



function MisNotificaciones() {

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
           <h1>Mis notificaciones</h1>
           <NotificationsTabPanel/>
          </div>
      </Layout>
    )
  }
  
  export default MisNotificaciones
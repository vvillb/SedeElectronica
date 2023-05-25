import React, { useEffect } from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/user/slices/breadcrumbs/breadcrumbSlice';
import { Menu } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';
import { Item } from 'devextreme-react/accordion';
import products from '@client-AtencionMenuData'



function AtencionPage(props) {
  const navigate = useNavigate();
    
    const updateRoute = (path) => {
        navigate(path)
    }

    const handleClick=(evento)=>{
        if (evento?.itemData?.path)
        updateRoute(evento.itemData.path)
    }
  const dispatch = useDispatch();


/////////////////////////////////
useEffect(() => {
  // Clean up the navigation if it's a root page
  dispatch(clearBreadcrumbs());
  // Add a new breadcrumb element
  const label = 'Nueva página';
  dispatch(addBreadcrumbs({ label }));
}, [dispatch]);
////////////////////////////////////



  return (
  <Layout>
    <div>
      <h1>Atención e información</h1>
    </div>
    <div id="container">
                <Menu
                    onItemClick={handleClick}
                    adaptivityEnabled={true}
                    // eslint-disable-next-line react/prop-types
                    orientation={props.orientation || 'vertical'}
                    >
                    {products.map((item) => (
                        <Item key={item.id} text={item.name} path={item.path} icon={item.icon}>
                        {item.subItems && item.subItems.map((subItem) => (
                        <Item key={subItem.id} text={subItem.name} path={subItem.path} icon={subItem.icon} />
                        ))}
                        </Item>
                    ))}
                   
                </Menu>
            </div>
  </Layout>
    
  )
}

export default AtencionPage;

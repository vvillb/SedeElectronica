import React from 'react'
import Layout from '@client-layout';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/breadcrumbs/slices/breadcrumbSlice';
import { Menu } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';
import { Item } from 'devextreme-react/accordion';

const products=
  [{
    id: '1_1',
    name: 'Catálogo de trámites',
    icon: 'columnchooser',
    path:'/AtencionEInformacion/Catalogo'
  }, {
    id: '1_2',
    name: 'Tablón de anuncios',
    icon: 'key',
    path:'/AtencionEInformacion/Tablon'
  },{
    id: '1_3',
    name: 'Quejas y sugerencias',
    icon: 'group',
    path:'/AtencionEInformacion/Quejas'
  },{
    id: '1_4',
    name: 'Verificación de documentos',
    icon: 'key',
    path:'/AtencionEInformacion/Verificacion'
  },]

function IndexPage(props) {
  const navigate = useNavigate();
    
    const updateRoute = (path) => {
        navigate(path)
    }

    const handleClick=(evento)=>{
        if (evento?.itemData?.path)
        updateRoute(evento.itemData.path)
    }
  const dispatch = useDispatch();

  //limpiar la navegación si es una página de raíz:
  dispatch(clearBreadcrumbs());
  //introducir un elemento
  const label='Nueva página';
  
  dispatch(addBreadcrumbs({label}))
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

export default IndexPage;

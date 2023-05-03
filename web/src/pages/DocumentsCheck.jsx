import React from 'react'
import Layout from '@client-layout';
import {useTranslation} from 'react-i18next'
import { useDispatch } from 'react-redux';
import { addBreadcrumbs, clearBreadcrumbs } from '../../store/breadcrumbs/slices/breadcrumbSlice';
import { Menu } from 'devextreme-react';
import { Item } from 'devextreme-react/action-sheet';
import { useNavigate } from 'react-router-dom';

const products= [{
  id: '2_1',
  name: 'Mis documentos ',
  icon: 'columnchooser',
  path:'/CarpetaCiudadana/MisDocumentos'
}, {
  id: '2_2',
  name: 'Mis solicitudes',
  icon: 'key',
  path:'/CarpetaCiudadana/MisSolicitudes'
},{
  id: '2_3',
  name: 'Mis expedientes',
  icon: 'group',
  path:'/CarpetaCiudadana/MisExpedientes'
},{
  id: '2_4',
  name: 'Mis notificaciones',
  icon: 'key',
  path:'/CarpetaCiudadana/MisNotificaciones'
},

]

function DocumentsCheck(props) {
  const{t}=useTranslation('common');
  const dispatch = useDispatch();

  //limpiar la navegación si es una página de raíz:
  dispatch(clearBreadcrumbs());
  //introducir un elemento
  const label='Nueva página';
  dispatch(addBreadcrumbs({label}))

  const navigate = useNavigate();
    
  const updateRoute = (path) => {
      navigate(path)
  }

  const handleClick=(evento)=>{
      if (evento?.itemData?.path)
      updateRoute(evento.itemData.path)
  }
  return (
  <Layout>
    <div>
        <h1>Consulta de documentos</h1>
        <h1>{t('documents.nombre')}</h1>
        <h2>{t('common.test')}</h2>
        <h3>{t('documents.client',{ns:'client'})}</h3>
    </div>
    <div id="container">
                <Menu
                    onItemClick={handleClick}
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

export default DocumentsCheck;

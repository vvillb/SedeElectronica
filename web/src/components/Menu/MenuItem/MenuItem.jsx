import React from 'react'
import { useNavigate } from 'react-router-dom';
import products from '@client-menuData'
import { Menu } from 'devextreme-react';
import { Item } from 'devextreme-react/accordion';


function MenuItem(props) {

    const navigate = useNavigate();
    
    const updateRoute = (path) => {
        navigate(path)
    }
    const handleClick=(evento)=>{
        if (evento?.itemData?.path)
        updateRoute(evento.itemData.path)
    }
    return (
            <div id="container">
                <Menu
                showFirstSubmenuMode='onHover'
                    onItemClick={handleClick}
                    adaptivityEnabled={true}
                    // eslint-disable-next-line react/prop-types
                    orientation={props.orientation || 'horizontal'}
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
    );
}
export default MenuItem

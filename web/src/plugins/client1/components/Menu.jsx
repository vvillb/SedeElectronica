import React from 'react'
import MenuItem from '../../../components/Menu/MenuItem/MenuItem';


function Menu(props) {
  return (
    <div className='sm:flex sm:justify-center'>
    <MenuItem orientation={props.orientation} />
    </div>
  )
}
export default Menu
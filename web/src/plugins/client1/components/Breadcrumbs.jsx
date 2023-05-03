import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Breadcrumbs() {
  const breadcrumbs = useSelector((state) => state.breadcrumbs);
  return (

<nav className="w-full pl-32 py-2 dx-theme-as-background-color">
  <ol>
  {breadcrumbs.map((item, index) => (
    // <li key={index}>
    //   <Link to={item.path}>{item.label}</Link>
    // </li>
    <span key={index}>
      {item.path}
    
    </span>
        ))}
    </ol>
  </nav>

    
  )
}

export default Breadcrumbs
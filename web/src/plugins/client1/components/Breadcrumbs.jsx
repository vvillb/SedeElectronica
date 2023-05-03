import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { clearBreadcrumbs } from '../../../../store/breadcrumbs/slices/breadcrumbSlice';


function Breadcrumbs() {
  const dispatch = useDispatch();
  // const history = unstable_HistoryRouter();


  useEffect(() => {
    const handlePopState = () => {
      dispatch(clearBreadcrumbs());
      console.log('prueba')
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);

  const breadcrumbs = useSelector((state) => state.breadcrumbs);
  return (
    <>
    <div>
    {/* Botón navegación de React Router */}
    <Link to="/">Ir a la página anterior</Link>

    {/* Botón personalizado
    <button onClick={() => history.goBack()}>Atrás</button>*/}
  </div> 


<nav className="w-full pl-32 py-2 dx-theme-as-background-color">
  <ol>
  {breadcrumbs.map((item, index) => (

    <span key={index}>
      <Link to={item.path}>
      {item.path}</Link>
    
    </span>
        ))}
    </ol>
  </nav>
  </>
    
  )
}

export default Breadcrumbs
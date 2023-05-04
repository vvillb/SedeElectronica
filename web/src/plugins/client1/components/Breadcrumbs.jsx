import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { clearBreadcrumbs } from '../../../../store/user/slices/breadcrumbs/breadcrumbSlice';

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
  }, []);

  const breadcrumbs = useSelector((state) => state.breadcrumbs);

  return (
    <div className="flex items-center bg-gray-800 py-2 px-4">
      {/* Botón navegación de React Router */}
      <Link to="/" className="text-gray-300 hover:text-gray-500">Ir a la página anterior</Link>

      {/* Botón personalizado
      <button onClick={() => history.goBack()}>Atrás</button>*/}
      
      <nav className="w-full pl-32">
        <ol>
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <Link to={item.path} className="text-gray-300 hover:text-gray-500">
                {item.path}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="text-gray-300 mx-2"></span>}
            </span>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs;

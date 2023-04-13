import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import '../common/index.css'
import '../common/App.css'
import './Style3.css'
import 'devextreme/dist/css/dx.material.blue.dark.css';

function Layout({children}) {
    


  return (
    <div id="page">   
      <div className="flex flex-col min-h-screen">

      <header>
        <Header/>
      </header>

      <nav>
        <Menu/>
      </nav>

      <div>
        <Breadcrumbs/>
      </div>

      <main className="flex-grow dx-theme-background-color py-4 px-10 min-h-[300px]">
        {children}
      </main>

      <footer className="pt-4">
        <Footer/>
      </footer>
      </div>
    </div>
);
}


export default Layout;



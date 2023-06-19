import React from 'react'
import { useLocation } from 'react-router-dom';

function Header() {

 

  const style = {
    backgroundImage: "url('/imgs/background.jpg')"
  }

  return (
    <header>
      <div className="relative">

          <div className="absolute inset-0" style={style}></div>

           <div className="w-full">
            
              <div className="relative z-1 h-32 mx-auto px-5 max-w-7xl flex items-center justify-end">

              </div>
          </div> 
      </div>
    </header>
  )
}

export default Header
import React from 'react';
import Header from '../../Composants/Header';
import Sidebar from '../../Composants/Sidebar';
import ListeProjets from '../../Composants/ListeProjets'
import { useState, } from 'react'




const Projets = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    
      <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <ListeProjets />
    </div>
    
  );
}

export default Projets;

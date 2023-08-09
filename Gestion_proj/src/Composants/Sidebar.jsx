

import React from 'react'
import logoanptic from '../assets/logoanptic.png'
import 
{ BsGrid1X2Fill, BsFillCollectionFill, BsFillGrid3X3GapFill, BsPeopleFill, 
    BsPersonCircle, BsUnlockFill, BsFillGearFill}
 from 'react-icons/bs'



function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            <img src={logoanptic} alt="Logo" className="logo" /> GEPA 
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Tableau de bord 
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillCollectionFill className='icon'/> Projets
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Utilisateurs
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPersonCircle className='icon'/> Compte
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsUnlockFill className='icon'/> Se deconnecter
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Parametres
                </a>
            </li>
        </ul>

    </aside>

    
    
  )
}

export default Sidebar
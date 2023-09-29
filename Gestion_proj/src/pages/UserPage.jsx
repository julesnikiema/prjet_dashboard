import Header from '../Composants/Header'
import Usersidebar from '../Composants/Usersidebar'
import Home from './Home'
import { useState } from 'react'

function UserPage() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Usersidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home />
      </div>
    );
  }


export default UserPage

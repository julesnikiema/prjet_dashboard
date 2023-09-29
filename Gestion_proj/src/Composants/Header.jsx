import PropTypes from 'prop-types'; // Importez PropTypes depuis 'prop-types'
import { useState } from 'react'; // Importez useState depuis 'react'
import UtilisateurConnected from '../pages/utilisateurs/UtilisateurConnected'; // Importez le composant UtilisateurConnected
import HeaderDeroulant from './HeaderDeroulant';
import { useNavigate } from 'react-router-dom';
import {BsFillBellFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

function Header({ OpenSidebar, projectAdded, setProjectAdded }){

  const currentUser = UtilisateurConnected();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate(); // Utilisez useNavigate pour gérer la redirection
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };
  
  const handleLogout = () => {
    setMenuVisible(false); // Masquer le menu déroulant
    navigate('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion
  };

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right' onClick={() => setProjectAdded(false)}>
  <BsFillBellFill className={`icon ${projectAdded ? 'blink' : ''}`} />
</div>
        <div className="header-right">
        <div className="compte-icon" onClick={handleMenuClick}>
          <BsPersonCircle className="icon" />
        </div>
        {menuVisible && (
          <HeaderDeroulant onLogout={handleLogout} />
        )}
        <h5>{currentUser ? currentUser.email : 'Utilisateur non connecté'}</h5>
      </div>
    </header>
  )
}
// Validez la prop OpenSidebar en utilisant PropTypes
Header.propTypes = {
  OpenSidebar: PropTypes.func, // Remplacez 'func' par le type approprié si nécessaire
  projectAdded: PropTypes.bool,
  setProjectAdded: PropTypes.func,
};
export default Header
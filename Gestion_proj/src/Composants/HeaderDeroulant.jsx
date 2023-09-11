import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function HeaderDeroulant({ onLogout }) {




  return (
    <div className="menu-deroulant">
      <ul>
        <li>
          <Link to="/compte">Compte</Link>
        </li>
        <li>
          <button onClick={onLogout}>Se déconnecter</button>
        </li>
      </ul>
    </div>
  );
}

HeaderDeroulant.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default HeaderDeroulant; // Assurez-vous que vous avez cet export par défaut

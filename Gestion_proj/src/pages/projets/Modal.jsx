import PropTypes from 'prop-types'; // Importez PropTypes

function Modal({ open, modalLabel, children, custom_modal, onClose }) {
    const handleClose = (e) => {
      if (e.target.className === 'modalContainer') {
        onClose();
      }
      return null;
    };
  
    if (open) {
      return (
        <div className='modalContainer' onClick={handleClose}>
          <div className={`modal ${custom_modal}`}>
            <div className='modal__head'>
              <h2>{modalLabel}</h2> {/* Correction ici */}
              <span className='modal__close' onClick={onClose}>x</span>
            </div>
            {children}
          </div>
        </div>
      );
    }
    return null;
  }
  // Définissez les propTypes pour valider les props
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  modalLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  custom_modal: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
  export default Modal;
  
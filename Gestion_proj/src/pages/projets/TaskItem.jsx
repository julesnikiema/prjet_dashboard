import Modal from "./Modal"
import PropTypes from 'prop-types'; // Importez PropTypes


function TaskItem({onClose, open, title, description}) {

  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  )
}
// Définissez les propTypes pour valider les props
TaskItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TaskItem
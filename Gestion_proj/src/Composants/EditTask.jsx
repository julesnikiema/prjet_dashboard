// EditTask.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

function EditTask({ task, onUpdate }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const taskRef = doc(db, 'tasks', task.id); // Utilisez task.id au lieu de taskId
      await updateDoc(taskRef, editedTask);
      onUpdate(editedTask);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche : ', error);
    }
  };

  return (
    <div>
      <h2>Modifier la tâche</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Client :</label>
          <input
            type="text"
            name="client"
            value={editedTask.client || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nom du projet :</label>
          <input
            type="text"
            name="nomProjet"
            value={editedTask.nomProjet || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
  <label>Description :</label>
  <textarea
    name="description"
    value={editedTask.description || ''}
    onChange={handleInputChange}
    rows={4} // Vous pouvez ajuster le nombre de lignes
    cols={50} // Vous pouvez ajuster la largeur en colonnes
  />
</div>
        <div className="form-group">
          <label>Service attribué :</label>
          <select
            name="serviceAttribue"
            value={editedTask.serviceAttribue || ''}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un service</option>
            <option value="CAT">CAT</option>
            <option value="DCM">DCM</option>
            <option value="DEI">DEI</option>
            <option value="DEST">DEST</option>
            <option value="DFPTIC">DFPTIC</option>
            <option value="DFC">DFC</option>
            <option value="DIG">DIG</option>
            <option value="DSA">DSA</option>
            <option value="DRH">DRH</option>
            <option value="PRM">PRM</option>
            <option value="SCMRP">SCMRP</option>
          </select>
        </div>
        <div className="form-group">
          <label>État :</label>
          <select
            name="serviceAttribue"
            value={editedTask.serviceAttribue || ''}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un etat </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="DESACTIVED">DESACTIVE</option>
              <option value="TERMINE">TERMINE</option>

              


    </select>
        </div>
        <div className="button-container">
          <button type="submit">Mettre à jour</button>
        </div>
      </form>
    </div>
  );
}

EditTask.propTypes = {
  task: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default EditTask;

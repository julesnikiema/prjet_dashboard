import { useState , useEffect } from 'react'
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Header from '../../Composants/Header'
import Sidebar from '../../Composants/Sidebar'




  function   TaskManager(){
    const [task, setTask] = useState({
      client: '',
      nomProjet: '',
      description: '',
      serviceAttribue: '',
      etat: 'A', // État initial "A"
    });

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTask({ ...task, [name]: value });
    };
  
    const handleUpdateEtat = (nouvelEtat) => {
      setTask({ ...task, etat: nouvelEtat });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, 'tasks'), {
          ...task,
          dateEnregistrement: serverTimestamp(),
        });
        console.log('Tâche ajoutée avec l\'ID : ', docRef.id);
        // Réinitialisez les champs du formulaire si nécessaire.
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche : ', error);
      }
    };
  
    return (
    <div className='grid-container' >
      <Header  />
      <Sidebar />
      <div className="task-manager">
      
  

      <div className="form-container">
        <h2>Ajouter une tâche</h2>
        <form onSubmit={handleSubmit}>
        
      

  <div className="form-group">

  <label>Client :</label>
      <input
      type="text"
      name="client"
      placeholder="Client"
      value={task.client}
      onChange={handleChange}
    />

    <label>Nom du projet :</label>
    <input
      type="text"
      name="nomProjet"
      placeholder="Nom du projet"
      value={task.nomProjet}
      
    />
  </div>
  <div className="form-group">
    <label>Description :</label>
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={task.description}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label>Service attribué :</label>
    <select
      name="serviceAttribue"
      value={task.serviceAttribue}
      onChange={handleChange}
    >
      <option value="">Sélectionnez un service</option>
      <option value="Service A">DSA </option>
      <option value="Service B">DIG</option>
      {/* Ajoutez d'autres options selon vos besoins */}
    </select>
  </div>
  <div className="form-group">
    <label>État :</label>
    <input
      type="text"
      name="etat"
      placeholder="État"
      value={task.etat}
      onChange={handleChange}
    />
  </div>
  <div className="button-container">
    <button type="submit">Ajouter la tâche</button>
  </div>
</form>
        <div>
          <h2>Mettre à jour l'état</h2>
          <button onClick={() => handleUpdateEtat('A')}>A</button>
          <button onClick={() => handleUpdateEtat('B')}>B</button>
          <button onClick={() => handleUpdateEtat('C')}>C</button>
          {/* Ajoutez d'autres boutons pour d'autres états au besoin */}
        </div>
      </div>
      </div>
      </div>

    );
  }
  
  export default  TaskManager;
  





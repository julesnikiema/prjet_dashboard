// Imports de bibliothèques externes
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Imports de composants
import Header from '../../Composants/Header';
import Sidebar from '../../Composants/Sidebar';

// Imports de styles
import 'react-toastify/dist/ReactToastify.css';

function TaskManager() {
  const navigate = useNavigate();
  const [projectAdded, setProjectAdded] = useState(false);
  const [task, setTask] = useState({
    client: '',
    nomProjet: '',
    description: '',
    serviceAttribue: '',
    etat: 'A',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('PROJET AJOUTE AVEC SUCESS...');

    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        dateEnregistrement: serverTimestamp(),
      });
      setProjectAdded(true);
      navigate('/tasks');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche : ', error);
      toast.error('Erreur lors de l\'ajout du projet.');
    }
  };
  
    return (
      <div className='grid-container'>
      <Header />
      <Sidebar />
      <div className="task-manager">
       
          <form className='container' onSubmit={handleSubmit}>
  
                    <input
                    type="text"
                    name="client"
                    placeholder="Client"
                    value={task.client}
                    onChange={handleChange}
                  />


                <input
                  type="text"
                  name="nomProjet"
                  placeholder="Nom du projet"
                  value={task.nomProjet}
                  onChange={handleChange} // Ajoutez cet événement onChange
                />
             

                    <select name="serviceAttribue" value={task.serviceAttribue} onChange={handleChange}>
                      <option value="">Sélectionnez un service</option>
                      <option value="CAT">CAT </option>
                      <option value="DCM">DCM</option>
                      <option value="DEI">DEI </option>
                      <option value="DEST">DEST</option>
                      <option value="DFPTIC"> DFPTIC </option>
                      <option value="DFC">DFC </option>
                      <option value="DIG">DIG</option>
                      <option value="DSA">DSA </option>
                      <option value="DRH">DRH</option>
                      <option value="PRM">DIG</option>
                      <option value="SCMRP">SCMRP </option>
                    
                    </select>
                                    
                    
                      <select
                        name="EtatDuProjet"
                        value={task.etat}
                        onChange={handleChange}
                      >
                      <option value="">Sélectionnez un etat </option>
                        <option value="A">A</option>
                      </select>
                      
                            <textarea
                              name="description"
                              placeholder="Description"
                              value={task.description}
                              onChange={handleChange}
                              rows={4} // Vous pouvez ajuster le nombre de lignes en fonction de vos besoins
                              cols={50} // Vous pouvez ajuster le nombre de colonnes en fonction de vos besoins
                              maxLength={500} // Limitez le nombre maximal de caractères à 500
                            />
                    <div className="button-container">
                      <button type="submit">Ajouter la tâche</button>
                    </div>
          </form>
          <ToastContainer position="top-right" autoClose={30000} />
           </div>
           

        </div>
    );
  }
  
  export default  TaskManager;
  

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
import {BsFillPersonPlusFill} from 'react-icons/bs' 
import {GrServices, GrStatusInfo} from 'react-icons/gr'
import {MdDescription} from 'react-icons/md'  
import {BiRename} from 'react-icons/bi' 

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
       
      <form className='task-form' onSubmit={handleSubmit}>
  
  <div className="form-section">
    <div className="icon-container">
   < BsFillPersonPlusFill />
        </div>
    <input
      type="text"
      name="client"
      placeholder="Client"
      value={task.client}
      onChange={handleChange}
    />
  </div>

  <div className="form-section">
    <div className="icon-container">
    <BiRename/>    </div>
    <input
      type="text"
      name="nomProjet"
      placeholder="Nom du projet"
      value={task.nomProjet}
      onChange={handleChange}
    />
  </div>

  <div className="form-section">
    <div className="icon-container">
    <GrServices/>   
     </div>
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
                      <option value="SCMRP">SCMRP </option>    </select>
  </div>
  
  <div className="form-section">
    <div className="icon-container">
< GrStatusInfo/> 
   </div>
    <select name="EtatDuProjet" value={task.etat} onChange={handleChange}>
      <option value="">Sélectionnez un etat</option>
    </select>
  </div>

  <div className="form-section">
    <div className="icon-container">
    <MdDescription/>    </div>
    <textarea
      name="description"
      placeholder="Description"
      value={task.description}
      onChange={handleChange}
      rows={4}
    />
  </div>

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
  

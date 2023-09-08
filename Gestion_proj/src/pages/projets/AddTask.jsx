import {db} from '../../firebase'
import { collection , addDoc , Timestamp } from 'firebase/firestore'
import {useState} from 'react'
import Modal from './Modal'; 



function AddTask() {
    const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer le modal


  /*function to add new task to firestore*/

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, 'tasks'), {
            title: title,
            description: description,
            terminé: false,
            créé: Timestamp.now()
        });
        setShowModal(true); // Afficher le modal après avoir ajouté la tâche
    } catch (err) {
        alert(err);
    }
};

const closeModal = () => {
    setShowModal(false); // Fonction pour masquer le modal
    setTitle(''); // Réinitialiser les champs du formulaire
    setDescription('');
  };

  return (

    <div className='grid-container' >
{/* <Header/>
<Sidebar />     */}
    {/* Utilisation du modal */}
  
    <form onSubmit={handleSubmit} className='modal__form' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
      <Modal
        open={showModal}
        modalLabel='Projet Ajoute'
        onClose={closeModal}
      >
      <p>Votre  a été ajoutée avec succès!</p>
      </Modal>
      
      </div>
  )
}

export default AddTask
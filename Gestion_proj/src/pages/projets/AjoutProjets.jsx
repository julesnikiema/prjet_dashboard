import React from 'react';
import Modal from "./Modal"
import Header from '../../Composants/Header';
import Sidebar from '../../Composants/Sidebar';

import { useState, } from 'react'
import {db} from '../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'




const Projets = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const onClose = () => {
    // Implémentez le code à exécuter lors de la fermeture de la modal
    // Par exemple, vous pourriez réinitialiser les valeurs des champs title et description
  };
   /* function to add new task to firestore */
   const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    
      <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
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
    </Modal>
    </div>
    
  );
}

export default Projets;

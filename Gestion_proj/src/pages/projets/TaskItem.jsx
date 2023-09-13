// TaskItem.js
import  { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, } from 'firebase/firestore';
import EditTask from '../../Composants/EditTask';
import Header from '../../Composants/Header';
import Sidebar from '../../Composants/Sidebar';

function TaskItem() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskCollection = collection(db, 'tasks');
        const querySnapshot = await getDocs(taskCollection);

        const taskData = [];
        querySnapshot.forEach((doc) => {
          const taskItemData = doc.data();
          const taskItem = {
            id: doc.id,
            ...taskItemData,
            dateEnregistrement: taskItemData.dateEnregistrement
              ? taskItemData.dateEnregistrement.toDate()
              : null,
          };
          taskData.push(taskItem);
        });

        setTasks(taskData);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches : ', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditClick = (taskToEdit) => {
    setEditingTask(taskToEdit);
  };

  const handleUpdate = (updatedTask) => {
    setEditingTask(null);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (

<div className='grid-container'>
  <Header />
  <Sidebar />


    <div>
      <h2>Liste des Projets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Nom du projet</th>
            <th>Description</th>
            <th>Service attribué</th>
            <th>État</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.client}</td>
              <td>{task.nomProjet}</td>
              <td>{task.description}</td>
              <td>{task.serviceAttribue}</td>
              <td>{task.etat}</td>
              <td>{task.dateEnregistrement?.toString()}</td>
              <td>
                <button onClick={() => handleEditClick(task)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingTask && (
        <EditTask task={editingTask} onUpdate={handleUpdate} />
      )}
    </div>
    </div>
  );
}

export default TaskItem;

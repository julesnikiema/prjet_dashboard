// TaskItem.js
import  { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, } from 'firebase/firestore';
import EditTask from '../../Composants/EditTask';


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
    <div>
      <h2>Liste des tâches</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>Tâche {task.id}</h3>
          <p>Client: {task.client}</p>
          <p>Nom du projet: {task.nomProjet}</p>
          <p>Description: {task.description}</p>
          <p>Service attribué: {task.serviceAttribue}</p>
          <p>État: {task.etat}</p>
          <p>Date de création: {task.dateEnregistrement?.toString()}</p>
          <button onClick={() => handleEditClick(task)}>Modifier</button>
        </div>
      ))}
      {editingTask && (
        <EditTask task={editingTask} onUpdate={handleUpdate} />
      )}
    </div>
  );
}

export default TaskItem;

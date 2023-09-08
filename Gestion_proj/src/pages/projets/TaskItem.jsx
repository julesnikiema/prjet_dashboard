import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function TaskItem() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Function to fetch tasks from Firestore
    const fetchTasks = async () => {
      const taskCollection = collection(db, 'tasks');
      const querySnapshot = await getDocs(taskCollection);

      const taskData = [];
      querySnapshot.forEach((doc) => {
        // Extract the document data and check if dateEnregistrement exists
        const taskItemData = doc.data();
        const taskItem = {
          id: doc.id,
          client: taskItemData.client || '',
          nomProjet: taskItemData.nomProjet || '',
          description: taskItemData.description || '',
          serviceAttribue: taskItemData.serviceAttribue || '',
          etat: taskItemData.etat || '',
          dateEnregistrement: taskItemData.dateEnregistrement
            ? taskItemData.dateEnregistrement.toDate()
            : null,
        };
        taskData.push(taskItem);
      });

      setTasks(taskData);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Liste des tâches</h2>
      <form>
        {tasks.map((task) => (
          <fieldset key={task.id}>
            <legend>Tâche {task.id}</legend>
            <label>
              Client:
              <input
                type="text"
                value={task.client}
                readOnly
              />
            </label>
            <label>
              Nom du projet:
              <input
                type="text"
                value={task.nomProjet}
                readOnly
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={task.description}
                readOnly
              />
            </label>
            <label>
              Service attribué:
              <input
                type="text"
                value={task.serviceAttribue}
                readOnly
              />
            </label>
            <label>
              État:
              <input
                type="text"
                value={task.etat}
                readOnly
              />
            </label>
            <label>
              Date de création:
              <input
                type="text"
                value={task.dateEnregistrement ? task.dateEnregistrement.toString() : ''}
                readOnly
              />
            </label>
          </fieldset>
        ))}
      </form>
    </div>
  );
}

export default TaskItem;

// DeleteTask.js

// eslint-disable-next-line react/prop-types
function DeleteTask({ taskId, onConfirmDelete, onCancelDelete }) {
  const handleConfirm = () => {
    onConfirmDelete(taskId);
  };

  const handleCancel = () => {
    onCancelDelete();
  };

  return (
    <div>
      <p>Voulez-vous vraiment supprimer cette tâche ?</p>
      <button onClick={handleConfirm}>Oui</button>
      <button onClick={handleCancel}>Non</button>
    </div>
  );
}

export default DeleteTask;

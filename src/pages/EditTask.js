// src/pages/EditTask.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const EditTask = () => {
  // Pega o ID da URL
  const { id } = useParams(); 
  const taskId = parseInt(id); // Converte o ID para número
  
  const { tasks, editTask } = useTasks();
  const navigate = useNavigate();
  
  // Encontra a tarefa a ser editada
  const taskToEdit = tasks.find(task => task.id === taskId);

  // Estado local para o novo título
  const [newTitle, setNewTitle] = useState(taskToEdit ? taskToEdit.title : '');

  // Redireciona se a tarefa não for encontrada (erro de ID)
  useEffect(() => {
    if (!taskToEdit) {
      navigate('/');
    }
  }, [taskToEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim() && taskToEdit) {
      editTask(taskId, newTitle.trim());
      navigate('/'); // Volta para a Home após editar
    }
  };
  
  if (!taskToEdit) {
      return <div>Carregando ou Tarefa não encontrada...</div>;
  }

  return (
    <div>
      <h2>✏️ Editar Tarefa: {taskToEdit.title}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Novo título da tarefa"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'orange', color: 'white', border: 'none', cursor: 'pointer' }}>
          Atualizar Tarefa
        </button>
      </form>
    </div>
  );
};

export default EditTask;

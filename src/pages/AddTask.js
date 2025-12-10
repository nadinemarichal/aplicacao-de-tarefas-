// src/pages/AddTask.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
      navigate('/'); // Volta para a Home após adicionar
    }
  };

  return (
    <div>
      <h2>➕ Adicionar Nova Tarefa</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Salvar Tarefa
        </button>
      </form>
    </div>
  );
};

export default AddTask;

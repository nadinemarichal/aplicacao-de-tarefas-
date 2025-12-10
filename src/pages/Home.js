// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const Home = () => {
  const { tasks, removeTask, toggleTask } = useTasks();

  return (
    <div>
      <h2>📋 Minhas Tarefas ({tasks.length})</h2>
      
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada. Adicione uma para começar!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                padding: '10px', 
                borderBottom: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#aaa' : '#000'
              }}
            >
              <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', flexGrow: 1 }}>
                {task.title}
              </span>
              
              <div>
                <Link to={`/edit-task/${task.id}`}>
                  <button style={{ marginRight: '10px', background: 'blue', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Editar
                  </button>
                </Link>
                <button 
                  onClick={() => removeTask(task.id)}
                  style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

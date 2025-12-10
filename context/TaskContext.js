// src/context/TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Contexto
export const TaskContext = createContext();

// Hook personalizado para facilitar o consumo do contexto
export const useTasks = () => useContext(TaskContext);

// 2. Provedor do Contexto
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // --- EFEITO 1: Carregar tarefas do localStorage na montagem ---
  useEffect(() => {
    // 
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []); // Array de dependências vazio: executa apenas uma vez na montagem

  // --- EFEITO 2: Salvar tarefas no localStorage sempre que 'tasks' mudar ---
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // Depende de 'tasks': executa após cada alteração de tarefas

  // --- Funções CRUD ---

  const addTask = (title) => {
    const newTask = {
      id: Date.now(), // ID simples e único
      title,
      completed: false,
    };
    // Adiciona a nova tarefa ao array
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (taskId) => {
    // Filtra para remover a tarefa com o ID correspondente
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    // Mapeia para inverter o status 'completed' da tarefa
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (taskId, newTitle) => {
    // Mapeia para atualizar o título da tarefa
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  // 3. Retorna o Provedor com o valor do estado e as funções
  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

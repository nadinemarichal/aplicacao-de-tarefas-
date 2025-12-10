// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import { TaskProvider } from './context/TaskContext';

// Layout Básico de Navegação
const Header = () => (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/add-task">Adicionar Tarefa</Link>
    </nav>
);

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <Header />
        <div style={{ padding: '20px' }}>
            <Routes>
                {/* Rota Home para visualização das tarefas */}
                <Route exact path="/" element={<Home />} />
                {/* Rota para adicionar nova tarefa */}
                <Route path="/add-task" element={<AddTask />} />
                {/* Rota para editar tarefa específica (usando parâmetro de ID) */}
                <Route path="/edit-task/:id" element={<EditTask />} />
            </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
};

export default App;

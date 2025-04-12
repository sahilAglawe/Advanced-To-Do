import React from 'react';
import { TaskProvider } from './context/TaskContext';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import SearchTasks from './components/SearchTasks';
import FilterTasks from './components/FilterTasks';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <header>
          <h1>To-Do List</h1>
        </header>
        <div className="controls">
          <SearchTasks />
          <FilterTasks />
        </div>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
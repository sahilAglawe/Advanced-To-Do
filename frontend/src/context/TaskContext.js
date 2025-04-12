import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [filter, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let url = '/api/tasks';
      
      if (searchTerm) {
        url = `/api/tasks/search?q=${searchTerm}`;
      } else if (filter !== 'all') {
        url = `/api/tasks?category=${filter}`;
      }
      
      const res = await axios.get(url);
      setTasks(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await axios.post('/api/tasks', task);
      setTasks([res.data.data, ...tasks]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? res.data.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => task._id === id ? res.data.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filter,
        searchTerm,
        setFilter,
        setSearchTerm,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
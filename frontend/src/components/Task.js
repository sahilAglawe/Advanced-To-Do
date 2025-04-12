import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

const Task = ({ task }) => {
  const { updateTask, deleteTask, toggleComplete } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd'),
    category: task.category
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <select
            name="category"
            value={editedTask.category}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>
            {task.title}{' '}
            <span className={`category ${task.category}`}>{task.category}</span>
          </h3>
          <p>{task.description}</p>
          <p>Due: {format(new Date(task.dueDate), 'MM/dd/yyyy')}</p>
          <div className="task-actions">
            <button
              onClick={() => toggleComplete(task._id, task.completed)}
              className={task.completed ? 'complete' : 'incomplete'}
            >
              {task.completed ? 'Completed' : 'Incomplete'}
            </button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
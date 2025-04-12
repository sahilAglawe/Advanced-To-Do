import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import Task from './Task';

const TaskList = () => {
  const { tasks, loading } = useContext(TaskContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks found</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
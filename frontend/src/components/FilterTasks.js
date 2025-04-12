import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const FilterTasks = () => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="filter">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default FilterTasks;
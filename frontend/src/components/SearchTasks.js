import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

const SearchTasks = () => {
  const { setSearchTerm, fetchTasks } = useContext(TaskContext);
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
    fetchTasks(); // Trigger the search
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchTasks;
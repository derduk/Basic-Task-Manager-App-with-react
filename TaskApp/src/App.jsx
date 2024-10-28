import React, { useState } from "react";
import sunIcon from "./assets/lightmode.svg";
import moonIcon from "./assets/darkmode.svg";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addTask = () => {
    if (title.trim() && description.trim()) {
      setTasks([...tasks, { title, description, completed: false }]);
      setTitle("");
      setDescription("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "Completed") return task.completed && matchesSearch;
    if (filter === "Pending") return !task.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header>
        <h1>Task Manager</h1>
        <button onClick={toggleDarkMode}>
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt={darkMode ? "Light Mode" : "Dark Mode"}
          />
        </button>
      </header>
      <div className="task-input">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => (
  <ul className="task-list">
    {tasks.map((task, index) => (
      <li key={index} className={task.completed ? "completed" : ""}>
        <div className="task-content">
          <span>{task.title}</span>
          <span>{task.description}</span>
        </div>
        <div className="task-buttons">
          <button
            className="complete-button"
            onClick={() => toggleTaskCompletion(index)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button className="delete-button" onClick={() => deleteTask(index)}>
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default App;

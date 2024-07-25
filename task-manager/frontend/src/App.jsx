// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error creating task:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

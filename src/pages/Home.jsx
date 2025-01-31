import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
    deleted: [],
  });

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask('');
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToMove);
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];

      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete Task
  const deleteTask = (currentCategory, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToDelete);
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        deleted: [...prevTasks.deleted, taskToDelete],
      };
    });
  };

  return (
    <div className="home">
      {/* Task Input Form */}
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>

      {/* Task Sections in Same Row */}
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-to-ongoing" onClick={() => moveTask('todo', 'ongoing', t)}>
                  Ongoing
                </button>
                <button className="move-to-completed" onClick={() => moveTask('todo', 'completed', t)}>
                  Completed
                </button>
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask('todo', t)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-to-todo" onClick={() => moveTask('ongoing', 'todo', t)}>
                  To-Do
                </button>
                <button className="move-to-completed" onClick={() => moveTask('ongoing', 'completed', t)}>
                  Completed
                </button>
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask('ongoing', t)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <button className="move-to-todo" onClick={() => moveTask('completed', 'todo', t)}>
                  To-Do
                </button>
                <button className="move-to-ongoing" onClick={() => moveTask('completed', 'ongoing', t)}>
                  Ongoing
                </button>
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask('completed', t)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Deleted Tasks Section */}
        <div className="task-section deleted-section">
          <h2>Deleted</h2>
          <ul>
            {tasks.deleted.map((t, index) => (
              <li key={index}>
                {t}
                {/* No Delete Button for Deleted Tasks */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

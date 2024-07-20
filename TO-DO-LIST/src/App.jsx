import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const handleAddTitle = () => {
    if (taskTitle) {
      setShowDescription(true);
    }
  };

  const getNextId = () => {
    if (tasks.length === 0) return 1;
    const maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
  };

  const handleAddTask = () => {
    if (taskDescription.trim() === "") {
      alert("Please enter a description or skip it.");
      return;
    }
    if (taskTitle) {
      const newTask = {
        id: getNextId(), 
        title: taskTitle,
        description: taskDescription,
      };
      setTasks([...tasks, newTask]);
      resetTaskInputs();
    }
  };

  const handleSkipDescription = () => {
    if (taskTitle) {
      const newTask = {
        id: getNextId(), 
        title: taskTitle,
        description: "",
      };
      setTasks([...tasks, newTask]);
      resetTaskInputs();
    }
  };

  const resetTaskInputs = () => {
    setTaskTitle("");
    setTaskDescription("");
    setShowDescription(false);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskTitle(taskToEdit.title);
    setTaskDescription(taskToEdit.description);
    handleDeleteTask(index);
    setShowDescription(true);
  };

  return (
    <div>
      <div className="container col-lg-6 col-md-8 col-sm-10 col-10 ">
        <h1>TO DO LIST</h1>
        <div className="get-info mb-3">
          {!showDescription ? (
            <div className="get-task-title">
              <input
                type="text"
                placeholder="Enter a Task"
                className="task-title form-control"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <button id="add-title" className="btn btn-primary mt-2" onClick={handleAddTitle}>
                Add Title
              </button>
            </div>
          ) : (
            <div className="get-task-des">
              <input
                type="text"
                placeholder="Enter a Description"
                className="task-description form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleAddTask}>
                Add
              </button>
              <button
                className="btn btn-secondary mt-2 mx-2"
                onClick={handleSkipDescription}
              >
                Skip
              </button>
            </div>
          )}
        </div>
        <div className="accordion" id="taskAccordion">
          {tasks.map((task, index) => (
            <div className="accordion-item" key={task.id}>
              <h2 className="accordion-header" id={`heading${task.id}`}>
                <div className="accordion-button-container">
                  
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${task.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${task.id}`}
                  >
                    <span className="task-id">{task.id}</span>
                    {task.title}
                  </button>
                  <button
                    className="btn btn-danger btn-sm delete-btn"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </h2>
              <div
                id={`collapse${task.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${task.id}`}
                data-bs-parent="#taskAccordion"
              >
                <div className="accordion-body">{task.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

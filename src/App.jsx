
import { useState } from "react";
import "./App.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const priorities = {
  High: "#e98b83",
  Medium: "#e8bd69",
  Low: "#91b99b"
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [priority, setPriority] = useState("Medium");

  // Add Task
  function addTask() {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      day: selectedDay,
      text: task.trim(),
      priority,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  // Complete Task
  function toggleTask(id) {
    setTasks(
      tasks.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  // Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));
  }

  // Weekly Progress
  const completedCount = tasks.filter(
    item => item.completed
  ).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  // Current Week Dates
  const today = new Date();
  const monday = new Date(today);
  const offset = (today.getDay() + 6) % 7;

  monday.setDate(today.getDate() - offset);

  function getDate(index) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  return (
    <div className="planner">

      {/* Navbar */}
      <header className="topbar">
        <div className="brand">
          <span>Daydream</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <p className="eyebrow">
            A LITTLE PROGRESS EVERY DAY
          </p>

          <h1>Weekly Planner</h1>

          <p className="subtitle">
            Plan your week, one little task at a time.
          </p>
        </div>

        {/* Weekly Progress */}
        <div className="progress-card">
          <div className="progress-top">
            <span>Weekly progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>
      </section>

      {/* Add Task Section */}
      <section className="add-section">
        <div className="add-heading">
          <h3>Add a new task</h3>
        </div>

        <div className="task-form">
          <input
            type="text"
            placeholder="What would you like to accomplish?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>

          <button onClick={addTask}>
            Add Task
          </button>
        </div>
      </section>

      {/* Date Section */}
      <div className="date-section">
        <h2>
          {getDate(0)} — {getDate(6)}
        </h2>
      </div>

      {/* Weekly Planner */}
      <section className="week-grid">
        {days.map((day, index) => {
          const dayTasks = tasks.filter(
            item => item.day === day
          );

          const done = dayTasks.filter(
            item => item.completed
          ).length;

          const percentage = dayTasks.length
            ? (done / dayTasks.length) * 100
            : 0;

          const isToday =
            today.getDay() === (index + 1) % 7;

          return (
            <div
              className={`day-card day-${index}`}
              key={day}
            >

              {/* Day Header */}
              <div className="day-header">
                <div>
                  <h3>{day}</h3>
                  <span>{getDate(index)}</span>
                </div>

                {isToday && (
                  <span className="today-tag">
                    TODAY
                  </span>
                )}
              </div>

              {/* Tasks */}
              <div className="day-body">
                {dayTasks.length === 0 ? (
                  <p className="empty-day">
                    Nothing planned yet
                  </p>
                ) : (
                  dayTasks.map(item => (
                    <div
                      className="task-row"
                      key={item.id}
                    >
                      <input
                        className="task-checkbox"
                        type="checkbox"
                        checked={item.completed}
                        onChange={() =>
                          toggleTask(item.id)
                        }
                      />

                      <span
                        className="priority-dot"
                        style={{
                          backgroundColor:
                            priorities[item.priority]
                        }}
                      />

                      <span
                        className={`task-text ${
                          item.completed ? "done" : ""
                        }`}
                      >
                        {item.text}
                      </span>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(item.id)}
                        title="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Daily Progress */}
              <div className="day-footer">
                <div className="day-progress">
                  <div
                    style={{
                      width: `${percentage}%`
                    }}
                  />
                </div>

                <span>
                  {done}/{dayTasks.length}
                </span>
              </div>

            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-center">
          ONE DAY AT A TIME
        </span>

        <span className="footer-brand">
          Daydream
        </span>
      </footer>

    </div>
  );
}

export default App;

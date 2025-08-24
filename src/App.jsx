import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  editTodo,
  setFilter,
  clearCompleted,
} from "./app/features/todoSlice";
import { useState, useEffect } from "react";

import "./app.css";
import SunIcon from '/images/sun.svg';
import MoonIcon from '/images/moon.svg';

export default function App() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dark, setDark] = useState(false);

  const { todos, filter } = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setCompleted(todo.completed);
    setId(todo.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(editTodo({ id, title, completed }));
    } else {
      dispatch(addTodo({ id: Math.random(), title, completed }));
    }

    setId(null);
    setTitle("");
    setCompleted(false);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <h1>TODO</h1>
        <span
  className="theme-toggle"
  onClick={() => setDark(!dark)}
  style={{ cursor: "pointer" }}
>
  {dark ? (
    <img
      src={SunIcon}
      alt="sun"
      style={{ width: "24px", height: "24px", transition: "all 0.3s ease" }}
    />
  ) : (
    <img
      src={MoonIcon}
      alt="moon"
      style={{ width: "24px", height: "24px", transition: "all 0.3s ease" }}
    />
  )}
</span>

      </header>

      <main className="todo-container">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Create a new todo..."
          />
        </form>

        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    dispatch(
                      editTodo({
                        ...todo,
                        completed: !todo.completed,
                      })
                    )
                  }
                />
                <span className="checkmark"></span>
              </label>

              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
                onDoubleClick={() => handleEdit(todo)}
              >
                {todo.title}
              </span>

              <button
                className="delete-btn"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <footer className="todo-footer">
          <span>{activeCount} items left</span>
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => dispatch(setFilter("all"))}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => dispatch(setFilter("active"))}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => dispatch(setFilter("completed"))}
            >
              Completed
            </button>
          </div>
          <button
            className="clear-btn"
            onClick={() => dispatch(clearCompleted())}
          >
            Clear Completed
          </button>
        </footer>
      </main>
    </div>
  );
}

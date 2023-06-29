import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useRef } from "react";

export default function AddTask({
  newTask,
  setNewTask,
  addInput,
  displaySelectPriority,
  setDisplaySelectPriority,
  handleAddItem,
  onCloseAddTask,
  children,
}) {
  const addTaskEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (addTaskEl.current && !addTaskEl.current.contains(e.target)) {
          onCloseAddTask();
        }
      }

      document.addEventListener("click", callback);

      return function () {
        document.removeEventListener("click", callback);
      };
    },
    [onCloseAddTask]
  );

  useEffect(
    function () {
      function callback(e) {
        if (displaySelectPriority && e.code === "Escape") {
          onCloseAddTask();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [displaySelectPriority, onCloseAddTask]
  );

  function handleInputClick() {
    setDisplaySelectPriority(true);
  }

  return (
    <div className="add-task" ref={addTaskEl}>
      <form className="add-task-form" onSubmit={handleAddItem}>
        <button>
          <IonIcon icon={add} className="add-icon" />
        </button>
        <input
          type="text"
          placeholder="Add New Task..."
          value={newTask}
          ref={addInput}
          onChange={(e) => setNewTask(e.target.value)}
          onClick={handleInputClick}
        />
      </form>
      {displaySelectPriority ? children : ""}
    </div>
  );
}

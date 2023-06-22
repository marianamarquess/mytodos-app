import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

export default function AddTask({
  newTask,
  setNewTask,
  addInput,
  displaySelectPriority,
  setDisplaySelectPriority,
  handleAddItem,
  children,
}) {
  function handleInputClick() {
    setDisplaySelectPriority(true);
  }

  return (
    <>
      <form className="add-task" onSubmit={handleAddItem}>
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
    </>
  );
}

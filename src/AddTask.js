import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

export default function AddTask({ newTask, setNewTask, handleAddItem }) {
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
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>
    </>
  );
}

import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";

export default function Task({ onToggleCheck, taskObj, isEdit, onDelete }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        id={`task${taskObj.id}`}
        value={taskObj.isChecked}
        onChange={() => onToggleCheck(taskObj.id)}
      />
      <label
        style={
          taskObj.isChecked
            ? { textDecoration: "line-through", color: "#71717a" }
            : {}
        }
        htmlFor={`task${taskObj.id}`}
      >
        {taskObj.task}
      </label>

      {isEdit ? (
        <IonIcon
          icon={close}
          className="close-icon"
          onClick={() => onDelete(taskObj)}
        ></IonIcon>
      ) : (
        ""
      )}
    </div>
  );
}

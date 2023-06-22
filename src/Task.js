import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import PriorityTag from "./PriorityTag";

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

      <div className="priority-delete-container">
        <PriorityTag
          priority={taskObj.priority}
          styleProperty={
            taskObj.isChecked
              ? {
                  opacity: 1,
                  backgroundColor: "var(--color-grey)",
                  color: "var(--color-dark-grey)",
                }
              : { opacity: 1 }
          }
        />

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
    </div>
  );
}

import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import PriorityTag from "./PriorityTag";

export default function Task({ onToggleCheck, taskObj, isEdit, setTaskList }) {
  function handleDelete(taskObj) {
    setTaskList((curTaskList) =>
      curTaskList.filter((curTaskObj) => curTaskObj !== taskObj)
    );
  }

  return (
    <div className="task">
      <input
        type="checkbox"
        id={`task${taskObj.id}`}
        checked={taskObj.isChecked}
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
            onClick={() => handleDelete(taskObj)}
          ></IonIcon>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

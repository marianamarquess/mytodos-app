import React from "react";
import { IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";

export default function ControlBar({ isEdit, onEdit, setSortBy }) {
  function handleSelectOption(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="control-bar">
      <form className="sort-form">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" onChange={handleSelectOption}>
          <option value="most-recent">Most Recent</option>
          <option value="checked">To Do</option>
          <option value="unchecked">Completed</option>
        </select>
      </form>

      <IonIcon
        icon={pencil}
        className="pencil-icon"
        onClick={onEdit}
        style={isEdit ? { color: "var(--color-accent)" } : {}}
      ></IonIcon>
    </div>
  );
}

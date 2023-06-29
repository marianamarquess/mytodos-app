import { IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";
import { useEffect } from "react";

export default function ControlBar({ isEdit, onEdit, addInput, children }) {
  useEffect(
    function () {
      function callback(e) {
        if (isEdit && addInput.current.contains(e.target)) onEdit();
      }

      document.addEventListener("click", callback);

      return function () {
        document.removeEventListener("click", callback);
      };
    },
    [onEdit, isEdit, addInput]
  );

  return (
    <div className="control-bar">
      {children}

      <IonIcon
        icon={pencil}
        className="pencil-icon"
        onClick={onEdit}
        style={isEdit ? { color: "var(--color-accent)" } : {}}
      ></IonIcon>
    </div>
  );
}

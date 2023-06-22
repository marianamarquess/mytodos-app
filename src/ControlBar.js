import { IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";

export default function ControlBar({ isEdit, onEdit, children }) {
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

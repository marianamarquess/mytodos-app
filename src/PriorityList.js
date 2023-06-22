import { useState } from "react";
import PriorityTag from "./PriorityTag";

export default function PriorityList({ onSelectPriority, selectPriority }) {
  const [tempSelectPriority, setTempSelectPriority] = useState("");

  function styleObj(priority) {
    if (tempSelectPriority && tempSelectPriority === priority)
      return {
        opacity: 1,
      };
    if (selectPriority === priority)
      return {
        opacity: 1,
      };
  }

  return (
    <div className="priority-list">
      {["low", "medium", "high"].map((priority) => (
        <PriorityTag
          key={priority}
          priority={priority}
          styleProperty={styleObj(priority)}
          onSelectPriority={() => onSelectPriority(priority)}
          onHoverIn={() => setTempSelectPriority(priority)}
          onHoverOut={() => setTempSelectPriority("")}
        />
      ))}
    </div>
  );
}

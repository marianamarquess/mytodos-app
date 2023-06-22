export default function PriorityTag({
  priority,
  styleProperty,
  onSelectPriority,
  onHoverIn,
  onHoverOut,
}) {
  return (
    <div
      className={`priority-item ${priority}`}
      style={styleProperty}
      onClick={onSelectPriority}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {priority}
    </div>
  );
}

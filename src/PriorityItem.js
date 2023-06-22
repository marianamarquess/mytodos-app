export default function PriorityItem({
  priority,
  onSelectPriority,
  selectPriority,
}) {
  return (
    <div
      className={`priority-item ${priority}`}
      onClick={() => onSelectPriority(priority)}
      style={selectPriority === priority ? { opacity: 1 } : {}}
    >
      {priority}
    </div>
  );
}

{
  /* <div
className={`priority-item ${priority}`}
onClick={() => onSelectPriority(priority)}
style={selectPriority === priority ? { opacity: 1 } : {}}
>
{priority}
</div> */
}

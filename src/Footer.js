export default function Footer({ taskList }) {
  if (!taskList.length) return;

  const tasksLeft = taskList.filter((taskObj) => !taskObj.isChecked).length;

  if (tasksLeft === 0)
    return (
      <footer className="footer">
        <span>🎉 You Completed All Your Tasks!</span>
      </footer>
    );

  return (
    <footer className="footer">
      <span>
        🕐 {tasksLeft} {tasksLeft === 1 ? "Task" : "Tasks"} Left!
      </span>
    </footer>
  );
}

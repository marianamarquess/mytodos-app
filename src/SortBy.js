export default function SortBy({
  sortBy,
  setSortBy,
  taskList,
  sortedTaskList,
}) {
  function handleSelectOption(e) {
    setSortBy(e.target.value);
  }

  return (
    <form className="sort-form">
      <label htmlFor="sort">Sort by</label>
      <select id="sort" onChange={handleSelectOption}>
        <option value="most-recent">Most Recent</option>
        <option value="priority">Priority</option>
        <option value="checked">To Do</option>
        <option value="unchecked">Completed</option>
      </select>
    </form>
  );
}

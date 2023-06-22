import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ControlBar from "./ControlBar";
import List from "./List";
import AddTask from "./AddTask";
import ListItem from "./ListItem";
import Task from "./Task";
import PriorityList from "./PriorityList";
import { useRef, useState } from "react";

setupIonicReact();

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState("most-recent");
  const [selectPriority, setSelectPriority] = useState("");
  const [displaySelectPriority, setDisplaySelectPriority] = useState(false);

  const addInput = useRef(null);

  let sortedTaskList;

  if (sortBy === "most-recent") sortedTaskList = taskList;

  if (sortBy === "priority") {
    const priorities = ["high", "medium", "low"];

    sortedTaskList = taskList.slice().sort((a, b) => {
      const priorityIndexA = priorities.indexOf(a.priority);
      const priorityIndexB = priorities.indexOf(b.priority);

      return priorityIndexA - priorityIndexB;
    });
  }

  if (sortBy === "checked")
    sortedTaskList = taskList
      .slice()
      .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));

  if (sortBy === "unchecked")
    sortedTaskList = taskList
      .slice()
      .sort((a, b) => Number(b.isChecked) - Number(a.isChecked));

  function handleAddItem(e) {
    e.preventDefault();

    if (!newTask) return;
    if (!selectPriority) return;

    setTaskList((curTaskList) => [
      {
        task: newTask,
        isChecked: false,
        priority: selectPriority,
        id: new Date().getTime(),
      },
      ...curTaskList,
    ]);

    setNewTask("");
    setSelectPriority("");
    setDisplaySelectPriority(false);
    addInput.current.blur();
  }

  function handleToggleCheck(id) {
    setTaskList((curTaskList) =>
      curTaskList.map((taskObj) =>
        taskObj.id === id
          ? { ...taskObj, isChecked: !taskObj.isChecked }
          : taskObj
      )
    );
  }

  function handleDelete(taskObj) {
    setTaskList((curTaskList) =>
      curTaskList.filter((curTaskObj) => curTaskObj !== taskObj)
    );
  }

  return (
    <>
      <Header />
      <Main>
        <ControlBar
          isEdit={isEdit}
          onEdit={() => setIsEdit(!isEdit)}
          setSortBy={setSortBy}
        />
        <List>
          <ListItem>
            <AddTask
              newTask={newTask}
              setNewTask={setNewTask}
              handleAddItem={handleAddItem}
              addInput={addInput}
              displaySelectPriority={displaySelectPriority}
              setDisplaySelectPriority={setDisplaySelectPriority}
            >
              <PriorityList
                selectPriority={selectPriority}
                onSelectPriority={(priority) => setSelectPriority(priority)}
              />
            </AddTask>
          </ListItem>

          {sortedTaskList.map((taskObj) => (
            <ListItem key={taskObj.id}>
              <Task
                taskObj={taskObj}
                onToggleCheck={handleToggleCheck}
                isEdit={isEdit}
                onDelete={handleDelete}
              />
            </ListItem>
          ))}
        </List>
      </Main>
      <Footer taskList={taskList} />
    </>
  );
}

export default App;

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
import { useEffect, useRef, useState } from "react";
import SortBy from "./SortBy";

setupIonicReact();

function App() {
  ///////////////////////
  // STATE VARIABLES DEFINITION
  const [taskList, setTaskList] = useState(function () {
    const storedValue = localStorage.getItem("taskList");

    if (!storedValue) return [];

    return JSON.parse(storedValue);
  });

  const [newTask, setNewTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState("most-recent");
  const [selectPriority, setSelectPriority] = useState("");
  const [displaySelectPriority, setDisplaySelectPriority] = useState(false);

  const addInput = useRef(null);

  useEffect(function () {
    if (selectPriority) addInput.current.focus();
  });

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  useEffect(
    function () {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    },
    [taskList]
  );

  ///////////////////////
  // SORT FUNCTIONALITY
  let sortedTaskList;

  if (sortBy === "most-recent") sortedTaskList = taskList;

  if (sortBy === "priority") {
    const priorities = ["high", "medium", "low"];

    sortedTaskList = taskList
      .slice()
      .sort(
        (a, b) =>
          priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
      );
  }

  if (sortBy === "checked")
    sortedTaskList = taskList
      .slice()
      .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));

  if (sortBy === "unchecked")
    sortedTaskList = taskList
      .slice()
      .sort((a, b) => Number(b.isChecked) - Number(a.isChecked));

  /////////////////////////
  // CLOSE ADD TASK FORM
  function onCloseAddTask() {
    setNewTask("");
    setDisplaySelectPriority(false);
    setSelectPriority("");
    addInput.current.blur();
  }

  /////////////////////////
  // ADD NEW TASK HANDLER
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

    onCloseAddTask();
  }

  /////////////////////////////////////
  // TOGGLE CHECK TASK FUNCTIONALITY
  function handleToggleCheck(id) {
    setTaskList((curTaskList) =>
      curTaskList.map((taskObj) =>
        taskObj.id === id
          ? { ...taskObj, isChecked: !taskObj.isChecked }
          : taskObj
      )
    );
  }

  return (
    <>
      <Header />
      <Main>
        <ControlBar isEdit={isEdit} onEdit={handleEdit} addInput={addInput}>
          <SortBy
            sortBy={sortBy}
            setSortBy={setSortBy}
            taskList={taskList}
            sortedTaskList={sortedTaskList}
          />
        </ControlBar>
        <List>
          <ListItem>
            <AddTask
              newTask={newTask}
              setNewTask={setNewTask}
              handleAddItem={handleAddItem}
              addInput={addInput}
              displaySelectPriority={displaySelectPriority}
              setDisplaySelectPriority={setDisplaySelectPriority}
              onCloseAddTask={onCloseAddTask}
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
                setTaskList={setTaskList}
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

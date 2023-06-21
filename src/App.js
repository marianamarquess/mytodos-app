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

import { useState } from "react";

setupIonicReact();

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState("most-recent");

  let sortedTaskList;

  if (sortBy === "most-recent") sortedTaskList = taskList;

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

    setTaskList((curTaskList) => [
      { task: newTask, isChecked: false, id: new Date().getTime() },
      ...curTaskList,
    ]);

    setNewTask("");
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

  function handleEdit() {
    setIsEdit(!isEdit);
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
        <ControlBar isEdit={isEdit} onEdit={handleEdit} setSortBy={setSortBy} />
        <List>
          <ListItem>
            <AddTask
              newTask={newTask}
              setNewTask={setNewTask}
              handleAddItem={handleAddItem}
            />
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

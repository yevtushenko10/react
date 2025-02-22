import { useState } from "react";
import { useEffect } from "react";
import { API, TASK_STATUS } from "./../../constants/tasks";
import "./style.sass";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksProgress, setTasksProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  const getTasks = async () => {
    try {
      const request = await fetch(API);
      const response = await request.json();

      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setTasksToDo(tasks.filter((item) => item.status === TASK_STATUS.TODO));
    setTasksProgress(
      tasks.filter((item) => item.status === TASK_STATUS.PROGRESS)
    );
    setTasksDone(tasks.filter((item) => item.status === TASK_STATUS.DONE));
  }, [tasks]);

  const handleTaskProgress = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: `PUT`,
          body: JSON.stringify({ ...item, status: TASK_STATUS.PROGRESS }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      setTasks((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTaskToDo = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: `PUT`,
          body: JSON.stringify({ ...item, status: TASK_STATUS.TODO }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      setTasks((prevState) =>
        prevState.map((element) =>
          element.id === response.id ? response : element
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTaskDone = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: `PUT`,
          body: JSON.stringify({ ...item, status: TASK_STATUS.DONE }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      setTasks((prevState) =>
        prevState.map((element) =>
          element.id === response.id ? response : element
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTaskDelete = async (item) => {
    try {
      await fetch(API + `/${item.id}`, {
        method: `DELETE`,
      });

      setTasks((prevState) =>
        prevState.filter((element) => element.id !== item.id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="board__wrapper">
      <div className="tasks__wrapper">
        <p className="tasks__title">To Do: {tasksToDo.length}</p>
        {tasksToDo.length ? (
          <ul className="tasks__list">
            {tasksToDo.map((item) => (
              <li key={item.id}>
                {item.title}{" "}
                <button onClick={() => handleTaskProgress(item)}>
                  In Progress
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="tasks__wrapper">
        <p className="tasks__title">In-Progress: {tasksProgress.length}</p>
        {tasksProgress.length ? (
          <ul className="tasks__list">
            {tasksProgress.map((item) => (
              <li key={item.id}>
                {item.title}{" "}
                <button onClick={() => handleTaskToDo(item)}>To do</button>
                <button onClick={() => handleTaskDone(item)}>Done</button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="tasks__wrapper">
        <p className="tasks__title">Done: {tasksDone.length}</p>
        {tasksDone.length ? (
          <ul className="tasks__list">
            {tasksDone.map((item) => (
              <li key={item.id}>
                {item.title}{" "}
                <button onClick={() => handleTaskDelete(item)}>Archive</button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Tasks;

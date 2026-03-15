import { useEffect, useState } from "react";
import api from "../Services/app";

const TaskCard = () => {
  const [task, setTask] = useState([]);

  const getTask = async () => {
    try {
      const res = await api.get("/task/allTask");
      setTask(res.data.getTask);
      console.log(task);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      {task.map((card) => (
        <div key={card._id}>
          <h1>{card.title}</h1>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
export default TaskCard;

import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({ taskName: "", description: "", expectedTime: "" });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(task); }} className="flex justify-around form-overlay my-2">
      <input type="text" placeholder="Task Name" onChange={(e) => setTask({ ...task, taskName: e.target.value })} required />
      <textarea  placeholder="Description" onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
      <input type="number" placeholder="Expected Time (min)" onChange={(e) => setTask({ ...task, expectedTime: e.target.value })} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
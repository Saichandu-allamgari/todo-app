const TaskList = ({ tasks, onComplete, onDelete }) => (
  <table className="w-full form-overlay border border-gray-400">
    <thead>
      <tr>
        <th className="border p-2 ">Task Name</th>
        <th className="border p-2 ">Task Description</th>
        <th className="border p-2 "> Task Status</th>
        <th className="border p-2 "> Task Status</th>
        <th className="border p-2 "> Task Delete</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td className="border p-2 ">{task.taskName}</td>
          <td className="border p-2 ">{task.description}</td>
          <td className="border p-2">Status: {task.status}</td>
          <td className="border p-2">{task.status === "pending" && <button onClick={() => onComplete(task._id)}>Mark Complete</button>}</td>
         <td className="border p-2"><button onClick={() => onDelete(task._id)}>Delete</button></td> 
        </tr>
      ))}
    </tbody>
    </table>
  );
  
  export default TaskList;
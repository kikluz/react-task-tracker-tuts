import Task from './Task'
// data array for state 

// we can destructuring 
const Tasks = ({ tasks, onDelete, onToggle}) => {

    return (
        <>
          {tasks.map((task) => (
            //   passing the task as a prop 
              <Task  key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </>
    )
}

export default Tasks

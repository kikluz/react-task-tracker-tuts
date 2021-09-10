import { FaTimes } from 'react-icons/fa'
// destructure task 
const Task = ({ task, onDelete,  onToggle}) => {
    return (
        <>
        {/* when onDoubleClick call toggle with task id  */}
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{' '} 
                <FaTimes 
                    style={{ color: 'red', 
                    cursor: 'pointer'}}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
        </>
    )
}

export default Task

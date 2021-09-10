import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from './components/About';


function App() {

  // this set to false to hide the form, we need the button add to toggle the form
  const [showAddTask, setShowAddTask ] = useState(false);

  // if we want to change any part of the state we use setTasks
  // seems is part of app component we can use it as a props 
  // we have our state a the top lavel 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

      const getTasks = async () => {
        const tasksFromSerever = await fetchTasks()
        setTasks(tasksFromSerever)
      }

      getTasks()
  },[]);

  // fetch data from api 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

   // fetch data from api for toggle reminder 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

// Add Task 
const addTask = async (task) => {
  // insted of console.log we want added to our state
  // console.log(task);
  // create an id up 
  // const id = Math.floor(Math.random() * 10000) + 1
  // // copy the number 
  // const newTask = { id, ...task }

  // setTasks([...tasks, newTask])

  const res = await fetch(`http://localhost:5000/tasks/`,{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  // get data, dta that just return its new task added 
  const data = await res.json()

  // call the setTasks
  setTasks([...tasks, data])

  
}
// whener we want to delete a task or add or anything like that
// this function passing to Task 
// delete from the server 
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
  // we setup setTasks and filter array and for each task return task id and if not match to id 
  setTasks(tasks.filter((task) => task.id !== id))
} 

// Toggle reminder  is request a promise to api
const toggleReminder = async (id) => {
  // get the id of the await
  const taskToToggle = await fetchTask(id)

  // store the updated task, this event its going to have the same properties taskToToggle
  // and change reminder to the wherever the opocite of taskToToggle reminder it is
  const upDateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  // fetchimg the id from api 
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    // add method  of PUT this is an updae 
    method: 'PUT',
    // add headers we sending data to api 
    headers: {
      // add content type of data we sending 
      'Content-type': 'application/json'
    },
    // add body is the data we sending wrap in json.stringify to turn it into string with
    // upDateTask
    body: JSON.stringify(upDateTask)
  })
  // waiting on the responsoe json 
  const data = await res.json()
  
  // setTasks get tasks state and map task return if the task id in the current
  // iteration is equal to the id that its pass in  then spread array but changed the reminder
  //  set to wherever specific reminder task is false or true
  setTasks(
    tasks.map((task) => 
    // change to data, that data that we get its the update task 
    task.id === id ? {...task, reminder: data.reminder} : task
  ))
}

  return (
    <Router>
    <>
      <div className="App">
          <div className="container">
            {/* fire it off we have a function setShowAddTask and
            set it to the opocity to the value it is  */}
            <Header onAdd={() => setShowAddTask
              (!showAddTask)}
              showAdd={showAddTask}
            />
           

            <Route path="/" exact render={(props) => (
              <>
                 {/* if showAddTask is true  then show component  */}
                {showAddTask && <AddTask onAdd={addTask}/>}

                {
                  tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> ) 
                  : ('No tasks at this moment')
                }
              </>
            )}/>
            <Route path="/about" component={About}/>
            <Footer />
          </div>

          
      </div>
    </>
    </Router>
  );
}

export default App;

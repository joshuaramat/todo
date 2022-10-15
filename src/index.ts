/* Import the v4 function from the uuid package. */
import { v4 as uuidV4 } from "uuid"

/**
 * A Task is an object with an id, title, completed, and createdAt property.
 * @property {string} id - A unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {boolean} completed - A boolean value that indicates whether the task is completed or not.
 * @property {Date} createdAt - The date the task was created
 */
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

/* Select the elements from the DOM. */
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement
const input = document.querySelector<HTMLInputElement>("#new-task-title")

/* Create a new tasks variable and assigning it to the return value of the loadTasks() function. */
const tasks: Task[] = loadTasks()

/* Loop through the tasks array and passing each task object into the addListItem() function. */
tasks.forEach(addListItem)

/* Add an event listener to the form element that listens for the submit event. When the submit
event is fired, it will prevent the default behavior of the form element, check if the input value
is empty or null, create a new task object, add the new task object to the tasks array, create a new
list item and append it to the list, and clear the input value. */
form?.addEventListener("submit", (e) => {
  /* It prevents the default behavior of the form element. */
  e.preventDefault()
  
  /* Checking if the input value is empty or null. If it is, it will return undefined. */
  if (input?.value == "" || input?.value == null) return

  /* Creating a new task object with the id, title, completed, and createdAt properties. */
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  /* Add the newTask object to the tasks array. */
  tasks.push(newTask)

  /* Create a new list item and appending it to the list. */
  addListItem(newTask)
  input.value = ""
})


/**
 * addListItem() creates a new list item, label, and checkbox,
 * sets the type attribute of the checkbox element to "checkbox", sets the checked property of the
 * checkbox element to the completed property of the task object, adds an event listener to the
 * checkbox
 * element that listens for the change event, and when the change event is fired, it will set the
 * completed property of the task object to the checked property of the checkbox element and call the
 * saveTasks() function
 * @param {Task} task - Task
 */
function addListItem(task: Task) {
  /* Create a new list item, label, and checkbox. */
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  /* Set the type attribute of the checkbox element to "checkbox". */
  checkbox.type = "checkbox"
  
  /* Set the checked property of the checkbox element to the completed property of the task
  object. */
  checkbox.checked = task.completed

  /* Add an event listener to the checkbox element that listens for the change event. When the
  change event is fired, it will set the completed property of the task object to the checked
  property of the checkbox element and call the saveTasks() function. */
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  /* Create a new list item, label, and checkbox. */
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

/**
 * Use the localStorage API to save the tasks array to the browser's local storage
 */
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

/**
 * If there is a string in localStorage with the key "TASKS", parse it as JSON and return the result.
 * Otherwise, return an empty array.
 * @returns An array of tasks
 */
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")

  if (taskJSON == null) return []

  return JSON.parse(taskJSON)
}
/* Importing the v4 function from the uuid package. */
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

/* Selecting the elements from the DOM. */
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement
const input = document.querySelector<HTMLInputElement>("#new-task-title")

/* Add an event listener to the form element that listens for the submit event. When the submit
event is fired, it will prevent the default behavior of the form element, check if the input value
is empty or null, and if it isn't, it will create a new task object with the id, title, completed,
and createdAt properties. It will then create a new list item and append it to the list. */
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

  /* Creating a new list item and appending it to the list. */
  addListItem(newTask)
})

/**
 * addListItem() creates a new list item, label, and checkbox, sets the type attribute of the checkbox element to
 * "checkbox", and appends the label and checkbox to the list item, which is then appended to the list
 * @param {Task} task - Task - This is the parameter that we're passing into the function.
 */
function addListItem(task: Task) {
  /* Creating a new list item, label, and checkbox. */
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  /* Setting the type attribute of the checkbox element to "checkbox". */
  checkbox.type = "checkbox"

  /* Creating a new list item, label, and checkbox. */
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}
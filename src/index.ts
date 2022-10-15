/* Import the v4 function from the uuid package. */
import { v4 as uuidV4 } from "uuid"

/**
 * Create Task type, an object with an id, title, completed, and createdAt property.
 * id - A unique identifier for the task.
 * title - The title of the task.
 * completed - A boolean value that indicates whether the task is completed or not.
 * createdAt - The date the task was created
 */
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

/* Use TypeScript to type check the HTML elements. */
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("new-task-title");

/* This is an event listener that listens for the submit event on the form. 
When the form is submitted,the event listener will prevent the default behavior of the form, 
check if the input value is empty or null, and if it is, return undefined. 
If the input value is not empty or null, it will create a new task object with the id, title, completed, and createdAt properties, 
and then create a new list item and append it to the list. */
form?.addEventListener("submit", e => {
  e.preventDefault();
  
  /* Check if the input value is empty or null. If it is, return undefined. */
  if (input?.value == "" || input?.value == null) return
  
  /* Create a new task object with the id, title, completed, and createdAt properties. */
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  /* Create a new list item and appending it to the list. */
  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  /* Creating a new list item, label, and checkbox. */
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  /* Set the type of the checkbox to "checkbox". */
  checkbox.type = "checkbox"
  /* Set the checked property of the checkbox to the completed property of the task. */
  checkbox.checked = task.completed

  /* Creating a new list item, label, and checkbox. */
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}
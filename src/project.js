import { addTodoFunctionality } from "./todo.js";

export function createProject(title, description = "", todos = []) {
  return addProjectFunctionality({
    title,
    description,
    todos,
  });
}

export function addProjectFunctionality(project) {
  function changeTitle(newTitle) {
    this.title = newTitle;
  }

  function changeDescription(newDescription) {
    this.description = newDescription;
  }

  function addTodoItem(todo) {
    this.todos.push(todo);
  }

  function removeTodoItem(todoIndex) {
    this.todos.splice(todoIndex, 1);
  }

  return {
    ...project,
    changeTitle,
    changeDescription,
    addTodoItem,
    removeTodoItem,
  };
}

export function getProject(projectTitle) {
  if (!localStorage.getItem(projectTitle)) {
    return;
  }

  let project = localStorage.getItem(projectTitle);

  project = JSON.parse(project);

  const todosWithFunctionality = project.todos.map((todo) =>
    addTodoFunctionality(todo)
  );

  project.todos = todosWithFunctionality;

  return addProjectFunctionality(project);
}

export function saveProject(project) {
  localStorage.setItem(project.title, JSON.stringify(project));
}

export function deleteProject(projectTitle) {
  if (projectTitle === "Default Project") {
    return;
  }

  localStorage.removeItem(projectTitle);
}

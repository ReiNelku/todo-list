export function createProject(title, description, todos = []) {
  return {
    title,
    description,
    todos,
  };
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

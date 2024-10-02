import { getProject, deleteProject, saveProject } from "./project.js";
import {
  showCreateProjectModal,
  showEditProjectModal,
  showAddTodoModal,
} from "./modal.js";
import plusIcon from "./icons/plus-icon.svg";

const body = document.body;

export function displaySidebar() {
  const sidebar = document.createElement("aside");
  body.appendChild(sidebar);

  const sidebarHeader = document.createElement("div");
  sidebar.appendChild(sidebarHeader);

  const sidebarHeaderTitle = document.createElement("h2");
  sidebarHeaderTitle.textContent = "📔 My Projects";
  sidebarHeader.appendChild(sidebarHeaderTitle);

  const createNewProjectBtn = document.createElement("button");
  sidebarHeader.appendChild(createNewProjectBtn);
  const createNewProjectImg = document.createElement("img");
  createNewProjectImg.src = plusIcon;
  createNewProjectBtn.addEventListener("click", showCreateProjectModal);
  createNewProjectBtn.appendChild(createNewProjectImg);

  const projectsDiv = document.createElement("div");
  projectsDiv.classList.add("projects");
  sidebar.appendChild(projectsDiv);

  const projectList = document.createElement("ul");
  projectList.classList.add("project-list");
  projectsDiv.appendChild(projectList);
  showProjectListItems();
}

export function showProjectListItems() {
  const projectList = document.querySelector(".project-list");
  projectList.textContent = "";

  Object.keys(localStorage).forEach((projectName) => {
    const project = getProject(projectName);

    const projectListItem = document.createElement("li");
    projectList.appendChild(projectListItem);

    const projectListItemBtn = document.createElement("button");
    projectListItemBtn.classList.add("project-select");
    if (project.title === "Default Project") {
      projectListItemBtn.textContent = `📘 ${project.title}`;
    } else {
      projectListItemBtn.textContent = `📕 ${project.title}`;
    }
    projectListItemBtn.addEventListener("click", () => {
      displayProject(project);
    });
    projectListItem.appendChild(projectListItemBtn);

    if (projectName !== "Default Project") {
      const projectListItemDeleteBtn = document.createElement("button");
      projectListItemDeleteBtn.classList.add("project-delete");
      projectListItemDeleteBtn.textContent = "❌";
      projectListItemDeleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this project?")) {
          deleteProject(project.title);
          showProjectListItems();
        }
      });
      projectListItem.appendChild(projectListItemDeleteBtn);
    }
  });
}

export function displayProject(project) {
  displayProjectHeader(project);

  displayProjectTodos(project);
}

function displayProjectHeader(project) {
  let projectHeader = null;
  if (document.querySelector("header")) {
    projectHeader = document.querySelector("header");
    projectHeader.textContent = "";
  } else {
    projectHeader = document.createElement("header");
  }
  projectHeader.classList.add("project-header");
  body.appendChild(projectHeader);

  const mainHeaderDiv = document.createElement("div");
  projectHeader.appendChild(mainHeaderDiv);

  const mainHeaderTitle = document.createElement("h1");
  mainHeaderTitle.textContent = project.title;
  mainHeaderDiv.appendChild(mainHeaderTitle);

  const mainHeaderDescription = document.createElement("p");
  mainHeaderDescription.textContent = project.description;
  mainHeaderDiv.appendChild(mainHeaderDescription);

  const projectActionButtonsDiv = document.createElement("div");
  projectActionButtonsDiv.classList.add("project-action-buttons");
  projectHeader.appendChild(projectActionButtonsDiv);

  if (project.title !== "Default Project") {
    const editProjectButton = document.createElement("button");
    editProjectButton.textContent = "Edit Project";
    editProjectButton.addEventListener("click", () =>
      showEditProjectModal(project)
    );
    projectActionButtonsDiv.appendChild(editProjectButton);
  }

  const addNewTodoButton = document.createElement("button");
  addNewTodoButton.textContent = "Add Todo";
  addNewTodoButton.addEventListener("click", () => showAddTodoModal(project));
  projectActionButtonsDiv.appendChild(addNewTodoButton);
}

function displayProjectTodos(project) {
  let main = null;
  if (document.querySelector("main")) {
    main = document.querySelector("main");
    main.textContent = "";
  } else {
    main = document.createElement("main");
  }
  body.appendChild(main);

  const todoList = document.createElement("ul");
  todoList.classList.add("todo-list");
  main.appendChild(todoList);

  project.todos.forEach((todo, todoIndex) =>
    showTodo(todo, todoIndex, project, todoList)
  );
}

function showTodo(todo, todoIndex, project, todoList) {
  const todoListItem = document.createElement("li");
  todoList.appendChild(todoListItem);

  const todoMainInfoDiv = document.createElement("div");
  todoMainInfoDiv.classList.add("todo-main-info");
  todoListItem.appendChild(todoMainInfoDiv);

  const todoListItemInfoDiv = document.createElement("div");
  if (todo.completed) {
    todoListItemInfoDiv.classList.add("todo-info");
    todoListItemInfoDiv.classList.add("completed");
  } else {
    todoListItemInfoDiv.classList.add("todo-info");
  }

  todoMainInfoDiv.appendChild(todoListItemInfoDiv);

  let todoExtraInfo = false;
  const todoListItemTitle = document.createElement("button");
  switch (todo.priority) {
    case 1:
      todoListItemTitle.textContent = `🔴 ${todo.title}`;
      todoListItemTitle.classList.add("urgent-important");
      break;
    case 2:
      todoListItemTitle.textContent = `🟠 ${todo.title}`;
      todoListItemTitle.classList.add("urgent-non-important");
      break;
    case 3:
      todoListItemTitle.textContent = `🟢 ${todo.title}`;
      todoListItemTitle.classList.add("non-urgent-important");
      break;
    case 4:
      todoListItemTitle.textContent = `🔵 ${todo.title}`;
      todoListItemTitle.classList.add("non-urgent-non-important");
      break;
  }
  todoListItemTitle.addEventListener("click", () => {
    todoExtraInfo = !todoExtraInfo;

    if (todoExtraInfo) {
      const todoExtraInfoDiv = document.createElement("div");
      todoExtraInfoDiv.classList.add("todo-extra-info");
      todoListItem.appendChild(todoExtraInfoDiv);

      const todoDescriptionDiv = document.createElement("div");
      todoExtraInfoDiv.appendChild(todoDescriptionDiv);

      const todoDescriptionTitle = document.createElement("h3");
      todoDescriptionTitle.classList.add("todo-extra-info-title");
      todoDescriptionTitle.textContent = "Description: ";
      todoDescriptionDiv.appendChild(todoDescriptionTitle);

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;
      todoDescriptionDiv.appendChild(todoDescription);
    } else {
      todoListItem.removeChild(document.querySelector(".todo-extra-info"));
    }
  });
  todoListItemInfoDiv.appendChild(todoListItemTitle);

  const todoListItemDate = document.createElement("p");
  todoListItemDate.textContent = `🗓️ ${todo.dueDate}`;
  todoListItemInfoDiv.appendChild(todoListItemDate);

  const todoListItemActionsDiv = document.createElement("div");
  todoListItemActionsDiv.classList.add("todo-actions");
  todoMainInfoDiv.appendChild(todoListItemActionsDiv);

  const todoListItemMarkComplete = document.createElement("button");
  todoListItemMarkComplete.textContent = "✔️";
  todoListItemMarkComplete.addEventListener("click", () => {
    todo.changeStatus();
    project.saveTodoItemChanges(todo, todoIndex);
    deleteProject(project.title);
    saveProject(project);
    displayProject(project);
    todoListItemInfoDiv.classList.toggle("completed");
  });
  todoListItemActionsDiv.appendChild(todoListItemMarkComplete);

  const todoListItemDelete = document.createElement("button");
  todoListItemDelete.textContent = "❌";
  todoListItemDelete.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      project.removeTodoItem(todoIndex);
      deleteProject(project.title);
      saveProject(project);
      displayProject(project);
    }
  });
  todoListItemActionsDiv.appendChild(todoListItemDelete);
}

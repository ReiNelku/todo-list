import { getProject, deleteProject } from "./project.js";
import { showCreateProjectModal } from "./modal.js";
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
    projectListItemBtn.textContent = `📕 ${project.title}`;
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

function displayProjectHeader({ title, description }) {
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
  mainHeaderTitle.textContent = title;
  mainHeaderDiv.appendChild(mainHeaderTitle);

  const mainHeaderDescription = document.createElement("p");
  mainHeaderDescription.textContent = description;
  mainHeaderDiv.appendChild(mainHeaderDescription);

  const projectActionButtonsDiv = document.createElement("div");
  projectActionButtonsDiv.classList.add("project-action-buttons");
  projectHeader.appendChild(projectActionButtonsDiv);

  if (title !== "Default Project") {
    const editProjectButton = document.createElement("button");
    editProjectButton.textContent = "Edit Project";
    projectActionButtonsDiv.appendChild(editProjectButton);
  }

  const addNewTodoButton = document.createElement("button");
  addNewTodoButton.textContent = "Add Todo";
  projectActionButtonsDiv.appendChild(addNewTodoButton);
}

function displayProjectTodos({ todos }) {
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

  todos.forEach((todo) => showTodo(todo, todoList));
}

function showTodo(todo, todoList) {
  const todoListItem = document.createElement("li");
  todoList.appendChild(todoListItem);

  const todoListItemInfoDiv = document.createElement("div");
  todoListItemInfoDiv.classList.add("todo-info");
  todoListItem.appendChild(todoListItemInfoDiv);

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
  todoListItemInfoDiv.appendChild(todoListItemTitle);

  const todoListItemDate = document.createElement("p");
  todoListItemDate.textContent = `🗓️ ${todo.dueDate}`;
  todoListItemInfoDiv.appendChild(todoListItemDate);

  const todoListItemActionsDiv = document.createElement("div");
  todoListItemActionsDiv.classList.add("todo-actions");
  todoListItem.appendChild(todoListItemActionsDiv);

  const todoListItemMarkComplete = document.createElement("button");
  todoListItemMarkComplete.textContent = "✔️";
  todoListItemActionsDiv.appendChild(todoListItemMarkComplete);

  const todoListItemDelete = document.createElement("button");
  todoListItemDelete.textContent = "❌";
  todoListItemActionsDiv.appendChild(todoListItemDelete);
}

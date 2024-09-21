import { getProject } from "./project.js";
import plusIcon from "./icons/plus-icon.svg";

export function displaySidebar() {
  const body = document.querySelector("body");
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
    projectListItemBtn.textContent = `📕 ${project.title}`;
    projectListItem.appendChild(projectListItemBtn);
  });
}

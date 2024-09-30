import { displaySidebar, displayProject } from "./user-interface.js";
import { createProject, getProject, saveProject } from "./project.js";
import "./styles.css";

let selectedProject = null;

(function createDefaultProject() {
  if (getProject("Default Project")) {
    selectedProject = getProject("Default Project");
    return;
  }
  const defaultProject = createProject("Default Project");
  selectedProject = defaultProject;
  saveProject(defaultProject);
})();

displaySidebar();
displayProject(selectedProject);

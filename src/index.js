import { displaySidebar, displayProject } from "./user-interface.js";
import { createProject, saveProject } from "./project.js";
import "./styles.css";

let selectedProject = null;

(function createDefaultProject() {
  const defaultProject = createProject("Default Project");
  selectedProject = defaultProject;
  saveProject(defaultProject);
})();

displaySidebar();
displayProject(selectedProject);

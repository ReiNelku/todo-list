import { createProject, getProject, saveProject } from "./project.js";
import { showProjectListItems, displayProject } from "./user-interface.js";

const body = document.body;
const modal = document.createElement("dialog");
body.appendChild(modal);

const form = document.createElement("form");
modal.appendChild(form);

export function showCreateProjectModal() {
  formReset();
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Create New Project";
  form.appendChild(modalTitle);

  const errorDiv = document.createElement("div");
  form.appendChild(errorDiv);

  createFormField("title", "text", true, true);
  createFormField("description", "text", false, false);

  const formButtonsDiv = document.createElement("div");
  formButtonsDiv.classList.add("form-buttons");
  form.appendChild(formButtonsDiv);

  const submitButton = createFormButton("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    if (form.checkValidity()) {
      if (getProject(title.value)) {
        errorDiv.textContent = "";
        const error = createErrorMessage("This project already exists.");
        errorDiv.appendChild(error);
        return;
      }

      const project = createProject(title.value, description.value);
      saveProject(project);
      showProjectListItems();
      displayProject(project);

      closeModal();
    } else {
      errorDiv.textContent = "";
      const error = createErrorMessage("Please fill all required fields.");
      errorDiv.appendChild(error);
    }
  });

  const cancelButton = createFormButton("cancel");
  cancelButton.addEventListener("click", closeModal);

  modal.showModal();
}

function formReset() {
  form.textContent = "";
}

function closeModal() {
  modal.close();
}

function createErrorMessage(errorMessage) {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = errorMessage;

  return error;
}

function createFormField(title, fieldType, autofocus, required) {
  const formFieldDiv = document.createElement("div");
  formFieldDiv.classList.add("form-field");
  form.appendChild(formFieldDiv);

  const label = document.createElement("label");
  label.setAttribute("for", title);
  if (required) {
    label.textContent = `${title.charAt(0).toUpperCase() + title.slice(1)}*`;
  } else {
    label.textContent = title.charAt(0).toUpperCase() + title.slice(1);
  }
  formFieldDiv.appendChild(label);

  const field = document.createElement("input");
  field.setAttribute("type", fieldType);
  field.setAttribute("name", title);
  field.setAttribute("id", title);
  if (autofocus) {
    field.setAttribute("autofocus", true);
  }
  if (required) {
    field.setAttribute("required", true);
  }
  formFieldDiv.appendChild(field);
}

function createFormButton(buttonValue) {
  const formButtonsDiv = document.querySelector(".form-buttons");

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("value", buttonValue);
  button.textContent =
    buttonValue.charAt(0).toUpperCase() + buttonValue.slice(1);
  formButtonsDiv.appendChild(button);

  return button;
}

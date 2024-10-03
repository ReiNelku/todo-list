import { format } from "date-fns";
import { createTodoItem } from "./todo.js";
import {
  createProject,
  getProject,
  saveProject,
  deleteProject,
} from "./project.js";
import { showProjectListItems, displayProject } from "./user-interface.js";

const body = document.body;
const modal = document.createElement("dialog");
body.appendChild(modal);

const form = document.createElement("form");
modal.appendChild(form);

export function showCreateProjectModal() {
  formReset();
  createModalTitle("Create New Project");

  const errorDiv = createModalErrorDiv();

  createFormField("title", "text", true, true);
  createFormField("description", "text", false, false);

  createModalButtonDiv();

  const submitButton = createFormButton("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    if (form.checkValidity()) {
      if (getProject(title.value)) {
        showErrorMessage("This project already exists.", errorDiv);
        return;
      }

      const project = createProject(title.value, description.value);
      saveProject(project);
      showProjectListItems();
      displayProject(project);

      closeModal();
    } else {
      showErrorMessage("Please fill all required fields.", errorDiv);
    }
  });

  const cancelButton = createFormButton("cancel");
  cancelButton.addEventListener("click", closeModal);

  modal.showModal();
}

export function showEditProjectModal(project) {
  formReset();

  createModalTitle("Edit Project");

  const errorDiv = createModalErrorDiv();

  createFormField("title", "text", true, false);
  createFormField("description", "text", false, false);

  createModalButtonDiv();

  const submitButton = createFormButton("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    if (title.value === "" && description.value === "") {
      showErrorMessage("Please fill at least one field.", errorDiv);

      return;
    }

    deleteProject(project.title);

    if (title.value) {
      project.changeTitle(title.value);
    }

    if (description.value) {
      project.changeDescription(description.value);
    }

    saveProject(project);
    showProjectListItems();
    displayProject(project);

    closeModal();
  });

  const cancelButton = createFormButton("cancel");
  cancelButton.addEventListener("click", closeModal);

  modal.showModal();
}

export function showAddTodoModal(project) {
  formReset();

  createModalTitle("Add Todo");

  const errorDiv = createModalErrorDiv();

  createFormField("title", "text", true, true);
  createFormField("description", "text", false, true);
  createFormField("dueDate", "datetime-local", false, true);
  createSelectPriority();

  createModalButtonDiv();

  const submitButton = createFormButton("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    if (form.checkValidity()) {
      const todo = createTodoItem(
        title.value,
        description.value,
        format(dueDate.value, "dd-MM-yyyy HH:mm"),
        parseInt(priority.value),
        false
      );
      project.addTodoItem(todo);
      saveProject(project);
      displayProject(project);

      closeModal();
    } else {
      showErrorMessage("Please fill all required fields.", errorDiv);
    }
  });

  const cancelButton = createFormButton("cancel");
  cancelButton.addEventListener("click", closeModal);

  modal.showModal();
}

export function showEditTodoModal(todo, todoIndex, project) {
  formReset();

  createModalTitle("Edit Todo");

  const errorDiv = createModalErrorDiv();

  createFormField("title", "text", true, false);
  createFormField("description", "text", false, false);
  createFormField("dueDate", "datetime-local", false, false);
  createSelectPriority();

  createModalButtonDiv();

  const submitButton = createFormButton("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    console.log(title.value, description.value, dueDate.value, priority.value);
    if (
      title.value === "" &&
      description.value === "" &&
      dueDate.value === "" &&
      parseInt(priority.value) === todo.priority
    ) {
      showErrorMessage("Please change at least one field.", errorDiv);

      return;
    }

    if (title.value) {
      todo.changeTitle(title.value);
    }

    if (description.value) {
      todo.changeDescription(description.value);
    }

    if (dueDate.value) {
      todo.changeDueDate(format(dueDate.value, "dd-MM-yyyy HH:mm"));
    }

    if (parseInt(priority.value) !== todo.priority) {
      todo.changePriority(parseInt(priority.value));
    }

    deleteProject(project.title);
    project.saveTodoItemChanges(todo, todoIndex);
    saveProject(project);
    displayProject(project);

    closeModal();
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

function createModalTitle(title) {
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = title;
  form.appendChild(modalTitle);
}

function createModalErrorDiv() {
  const errorDiv = document.createElement("div");
  form.appendChild(errorDiv);

  return errorDiv;
}

function showErrorMessage(errorMessage, errorDiv) {
  errorDiv.textContent = "";
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = errorMessage;

  errorDiv.appendChild(error);
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

function createSelectPriority() {
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("form-field");
  form.appendChild(priorityDiv);

  const label = document.createElement("label");
  label.setAttribute("for", "priority");
  label.textContent = "Priority*";
  priorityDiv.appendChild(label);

  const select = document.createElement("select");
  select.setAttribute("name", "priority");
  select.setAttribute("id", "priority");
  select.setAttribute("required", true);
  priorityDiv.appendChild(select);

  function createOption(value, optionContent) {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    option.textContent = optionContent;

    return option;
  }

  select.appendChild(createOption(1, "Important Urgent"));
  select.appendChild(createOption(2, "Unimportant Urgent"));
  select.appendChild(createOption(3, "Important Nonurgent"));
  select.appendChild(createOption(4, "Unimportant Nonurgent"));
}

function createModalButtonDiv() {
  const formButtonsDiv = document.createElement("div");
  formButtonsDiv.classList.add("form-buttons");
  form.appendChild(formButtonsDiv);
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

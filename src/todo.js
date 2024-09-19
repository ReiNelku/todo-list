export function createTodoItem(
  title,
  description,
  dueDate,
  priority,
  completed,
  notes = "",
  checklist = []
) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed,
    notes,
    checklist,
  };
}

export function addTodoFunctionality(todo) {
  function changeTitle(newTitle) {
    this.title = newTitle;
  }

  function changeDescription(newDescription) {
    this.description = newDescription;
  }

  function changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  function changePriority(newPriority) {
    this.priority = newPriority;
  }

  function changeStatus() {
    this.completed = !this.completed;
  }

  function changeNotes(newNotes) {
    this.notes = newNotes;
  }

  function addToChecklist(item) {
    this.checklist.push(item);
  }

  function removeFromChecklist(itemIndex) {
    this.checklist.splice(itemIndex, 1);
  }

  function changeChecklistItemStatus(itemIndex) {
    this.checklist[itemIndex].completed = !this.checklist[itemIndex].completed;
  }

  return {
    ...todo,
    changeTitle,
    changeDescription,
    changeDueDate,
    changePriority,
    changeStatus,
    changeNotes,
    addToChecklist,
    removeFromChecklist,
    changeChecklistItemStatus,
  };
}

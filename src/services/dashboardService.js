import { mockDashboard } from "../data/mockDashboard";

import {
  loadLocalData,
  saveLocalData,
} from "./storageService";

function clone(value) {
  return structuredClone(value);
}

let dashboard =
  loadLocalData() ?? clone(mockDashboard);

function persist() {
  saveLocalData(dashboard);
}

export async function getDashboard() {
  return clone(dashboard);
}

/*
 * SHOPPING
 */

export async function addShoppingItem(label) {
  const item = {
    id: crypto.randomUUID(),
    label,
    checked: false,
  };

  dashboard.shopping.push(item);

  persist();

  return clone(item);
}

export async function toggleShoppingItem(id) {
  const item = dashboard.shopping.find(
    (item) => item.id === id,
  );

  if (!item) {
    throw new Error("Shopping item not found");
  }

  item.checked = !item.checked;

  persist();

  return clone(item);
}

export async function deleteShoppingItem(id) {
  dashboard.shopping =
    dashboard.shopping.filter(
      (item) => item.id !== id,
    );

  persist();
}

/*
 * TASKS
 */

export async function addTask(label) {
  const task = {
    id: crypto.randomUUID(),
    label,
    completed: false,
    due: null,
  };

  dashboard.tasks.push(task);

  persist();

  return clone(task);
}

export async function toggleTask(id) {
  const task = dashboard.tasks.find(
    (task) => task.id === id,
  );

  if (!task) {
    throw new Error("Task not found");
  }

  task.completed = !task.completed;

  persist();

  return clone(task);
}

export async function deleteTask(id) {
  dashboard.tasks =
    dashboard.tasks.filter(
      (task) => task.id !== id,
    );

  persist();
}

/*
 * EVENTS
 */

export async function addEvent(event) {
  const newEvent = {
    id: crypto.randomUUID(),
    ...event,
  };

  dashboard.events.push(newEvent);

  persist();

  return clone(newEvent);
}

export async function deleteEvent(id) {
  dashboard.events =
    dashboard.events.filter(
      (event) => event.id !== id,
    );

  persist();
}

/*
 * HOME INFO
 */

export async function updateDinner(dinner) {
  dashboard.dinner = dinner;

  persist();

  return clone(dinner);
}

export async function updateTrash(trash) {
  dashboard.trash = trash;

  persist();

  return clone(trash);
}
import { APP_CONFIG } from "../config/appConfig";

export function loadLocalData() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.storageKey);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Unable to load local data", error);

    return null;
  }
}

export function saveLocalData(data) {
  try {
    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(data),
    );
  } catch (error) {
    console.error("Unable to save local data", error);
  }
}

export function clearLocalData() {
  localStorage.removeItem(APP_CONFIG.storageKey);
}

export function exportLocalData(data) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `doma-backup-${Date.now()}.json`;

  link.click();

  URL.revokeObjectURL(url);
}
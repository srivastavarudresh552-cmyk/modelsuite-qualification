const USER_STORAGE_KEY = 'user';

// #3

const getStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const readStoredUser = () => {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const stored = storage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    storage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const saveStoredUser = (user) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Ignore storage write failures so the app keeps working.
  }
};

export const clearStoredUser = () => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }
};

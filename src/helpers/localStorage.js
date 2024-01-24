export const setItem = (key, item) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error('local storage setItem error:', err);
  }
};

export const getItem = key => {
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    console.error('local storage getItem error:', err);
  }
};

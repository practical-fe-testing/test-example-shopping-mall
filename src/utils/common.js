export const pick = (obj, ...propNames) => {
  if (!obj || !propNames) {
    return {};
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (propNames.includes(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
};

export const debounce = (fn, wait) => {
  let timeout = null;

  return (...args) => {
    const later = () => {
      timeout = -1;
      fn(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

export const isNumber = value => typeof value === 'number';

export const parseJSON = value => {
  if (!value) {
    return value;
  }

  const result = JSON.parse(value);

  return typeof result === 'string' ? JSON.parse(result) : result;
};

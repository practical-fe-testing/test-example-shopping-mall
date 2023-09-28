import { compile } from 'path-to-regexp';

export const pathToUrl = (path, params = {}) => compile(path)(params);

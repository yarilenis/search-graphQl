import {
  SET_AUTH,
  SET_COOKIE,
} from './index';

export const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setCookie = (cookie) => ({ type: SET_COOKIE, cookie });

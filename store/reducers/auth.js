import {
  SET_AUTH,
  SET_COOKIE,
} from '../actions';

const initialState = {
  idCookie: null,
  data: {
    loggedIn: false,
    user: {},
  },
};

export default function (state = initialState, action) {
  const { type, auth, cookie } = action;
  const cloneState = { ...state };
  switch (type) {
    case SET_AUTH:
      cloneState.data = { ...auth };
      return cloneState;
    case SET_COOKIE:
      cloneState.idCookie = cookie;
      return cloneState;
    default:
      return state;
  }
}

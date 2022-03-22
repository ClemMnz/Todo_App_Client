import { GET_USER } from "../actions/types";

const initialState = [];

export default (user = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return payload;
    default:
      return user;
  }
};

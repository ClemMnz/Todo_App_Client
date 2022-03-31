import { GET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

export default function (message = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return message;
  }
}
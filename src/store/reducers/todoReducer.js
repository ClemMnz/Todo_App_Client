import {
  ADD_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
  DELETE_ALL_TASKS,
  DELETE_TASK,
} from "../actions/types";

const initialState = [];

export default (todos = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK:
      return [...todos, payload];
    case GET_ALL_TASKS:
      return payload;
    case UPDATE_TASK:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            ...payload,
          };
        }
        return todo;
      });
    case DELETE_TASK:
       return todos.filter(({ id }) => id !== payload.id);
    case DELETE_ALL_TASKS:
      return [];
    default:
      return todos;
  }
};

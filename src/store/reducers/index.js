import { combineReducers } from "redux";
import user from "./userReducer";
import todos from "./todoReducer";
import persons from "./personReducer";
import message from "./messageReducer";

export default combineReducers({
  user,
  todos,
  persons,
  message
});

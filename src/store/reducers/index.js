import { combineReducers } from "redux";
import user from "./userReducer";
import todos from "./todoReducer";

export default combineReducers({
  user,
  todos,
});

import {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  DELETE_ALL_TASKS,
} from "./types";
import taskService from "../../services/taskService";

export const createTask =
  ({ formData, token }) =>
  async (dispatch) => {
    try {
      const res = await taskService.create({ formData, token });
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getAllTasks = (token) => async (dispatch) => {
  try {
    const res = await taskService.getAll(token);

    dispatch({
      type: GET_ALL_TASKS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask =
  ({ id, token }) =>
  async (dispatch) => {
    try {
      await taskService.remove({ id, token });

      dispatch({
        type: DELETE_TASK,
        payload: { id },
      });
      return Promise.resolve({ id });
    } catch (err) {}
  };

export const getTask = (id) => async (dispatch) => {
  try {
    const res = await taskService.get(id);

    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {}
};

export const findTaskByTitle =
  ({ title, token }) =>
  async (dispatch) => {
    try {
      const res = await taskService.findByTitle({ title, token });

      dispatch({
        type: GET_ALL_TASKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const findTasksByPerson =
  ({ responsible, token }) =>
  async (dispatch) => {
    try {
      const res = await taskService.findByPerson({ responsible, token });

      dispatch({
        type: GET_ALL_TASKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteAllTasks = (token) => async (dispatch) => {
  try {
    const res = await taskService.removeAll(token);
    dispatch({
      type: DELETE_ALL_TASKS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateTask =
  ({ id, data, token }) =>
  async (dispatch) => {
    try {
      const res = await taskService.update({ id, data, token });
      dispatch({
        type: UPDATE_TASK,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

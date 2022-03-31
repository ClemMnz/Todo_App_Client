import {
  GET_ALL_PERSONS,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
  DELETE_ALL_PERSONS,
  GET_PERSON,
  GET_MESSAGE,
} from "./types";
import PersonService from "../../services/personService";
import { setMessage } from "./messageAction";

export const createPerson =
  ({ formData, token }) =>
  async (dispatch) => {
    await PersonService.create({ formData, token })
      .then(
        (res) => {
          dispatch({
            type: ADD_PERSON,
            payload: res.data,
          });
          //return Promise.resolve(res.data);
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            dispatch(setMessage(message));
        }
      )
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          dispatch(setMessage(message));
        return Promise.reject(error);
      });
  };

export const getAllPersons = (token) => async (dispatch) => {
  try {
    const res = await PersonService.getAll(token);

    dispatch({
      type: GET_ALL_PERSONS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePerson =
  ({ id, token }) =>
  async (dispatch) => {
    try {
      await PersonService.remove({ id, token });

      dispatch({
        type: DELETE_PERSON,
        payload: { id },
      });
      return Promise.resolve({ id });
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getPerson = (id) => async (dispatch) => {
  try {
    const res = await PersonService.get(id);

    dispatch({
      type: GET_PERSON,
      payload: res.data,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteAllPersons = (token) => async (dispatch) => {
  try {
    const res = await PersonService.removeAll(token);
    dispatch({
      type: DELETE_ALL_PERSONS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePerson =
  ({ id, data, token }) =>
  async (dispatch) => {
    try {
      const res = await PersonService.update({ id, data, token });
      dispatch({
        type: UPDATE_PERSON,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

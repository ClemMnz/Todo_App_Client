import axios from "../utils/api-request";

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getAll = (token) => {
  return axios.get(`/todos-list`, headers(token));
};

const get = (id) => {
  return axios.get(`/get-todo/${id}`);
};

const create = ({ formData, token }) => {
  return axios.post("/add-todo", formData, headers(token));
};

const update = ({ id, data, token }) => {
  return axios.put(`/update-todo/${id}`, data, headers(token));
};

const remove = ({ id, token }) => {
  return axios.delete(`/delete-todo/${id}`, headers(token));
};

const removeAll = (token) => {
  return axios.delete(`/delete-todos`, headers(token));
};

const findByTitle = ({ title, token }) => {
  return axios.get(`/todos-list?title=${title}`, headers(token));
};

const taskService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default taskService;

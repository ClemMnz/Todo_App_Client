import axios from "../utils/apiRequest";

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getAll = (token) => {
  return axios.get(`/task/list`, headers(token));
};

const create = ({ formData, token }) => {
  return axios.post("/task/add", formData, headers(token));
};

const update = ({ id, data, token }) => {
  return axios.put(`/task/update/${id}`, data, headers(token));
};

const remove = ({ id, token }) => {
  return axios.delete(`/task/delete/${id}`, headers(token));
};

const removeAll = (token) => {
  return axios.delete(`/task/delete`, headers(token));
};

const findByTitle = ({ title, token }) => {
  return axios.get(`/task/list?title=${title}`, headers(token));
};

const findByPerson = ({ responsible, token }) => {
  return axios.get(`/task/list?responsible=${responsible}`, headers(token));
};

const taskService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByPerson
};

export default taskService;

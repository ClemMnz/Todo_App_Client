import axios from "../utils/apiRequest";

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getAll = (token) => {
  return axios.get(`/person/list`, headers(token));
};

const create = ({ formData, token }) => {
  return axios.post("/person/add", formData, headers(token));
};

const update = ({ id, data, token }) => {
  return axios.put(`/person/update/${id}`, data, headers(token));
};

const remove = ({ id, token }) => {
  return axios.delete(`/person/delete/${id}`, headers(token));
};

const removeAll = (token) => {
  return axios.delete(`/person/delete`, headers(token));
};


const personService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
};

export default personService;

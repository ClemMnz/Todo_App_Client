import axios from "../utils/api-request";

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getUser = ({ user, token }) => {
  const userSub = user.sub;
  return axios.get(`${process.env.REACT_APP_AUTH0_AUDIENCE}users/${userSub}`, headers(token));
};

const userService = {
  getUser
};

export default userService;

import axios from "../utils/api-request";
import { AUTH0_DOMAIN } from "../utils/config"; 

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getUser = ({ user, token }) => {
  const userSub = user.sub;
  return axios.get(`https://${AUTH0_DOMAIN}/api/v2/users/${userSub}`, headers(token));
};

const userService = {
  getUser
};

export default userService;

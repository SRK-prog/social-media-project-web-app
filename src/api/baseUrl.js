import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_USER_POST_SERVICE,
});

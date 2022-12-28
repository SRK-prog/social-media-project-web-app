import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
});

// https://mernstack-backend-server.herokuapp.com/api

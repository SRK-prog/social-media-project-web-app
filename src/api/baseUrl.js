import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-233-8-84.ap-south-1.compute.amazonaws.com:8080/api",
});
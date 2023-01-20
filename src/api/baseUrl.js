import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-3-110-86-150.ap-south-1.compute.amazonaws.com:8080/api",
});
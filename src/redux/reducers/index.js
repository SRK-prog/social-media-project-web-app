import { combineReducers } from "redux";
import posts from "./postsReducers";
import user from "./user";
import socket from "./socketReducer";

export default combineReducers({ posts, socket, user });

import { combineReducers } from "redux";
import posts from "./postsReducers";
import user from "./user";
import friendsPosts from "./friendsPostReducer";
import socket from "./socketReducer";

export default combineReducers({ posts, friendsPosts, socket, user });

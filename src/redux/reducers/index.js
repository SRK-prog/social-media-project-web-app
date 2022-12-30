import { combineReducers } from "redux";
import postsReducers from "./postsReducers";
import usersReducers from "./usersReducers";
import friendsPostReducer from "./friendsPostReducer";
import notificationSocket from "./notificationReducer";

export default combineReducers({
  posts: postsReducers,
  user: usersReducers,
  friendsPosts: friendsPostReducer,
  notificationSocket,
});

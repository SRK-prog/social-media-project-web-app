import { combineReducers } from "redux";
import postsReducers from "./postsReducers";
import usersReducers from "./usersReducers";
import friendsPostReducer from "./friendsPostReducer";

export default combineReducers({
  posts: postsReducers,
  user: usersReducers,
  friendsPosts: friendsPostReducer,
});

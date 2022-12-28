import { FETCH_POSTS } from "../types";

export default function fetchingPosts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}

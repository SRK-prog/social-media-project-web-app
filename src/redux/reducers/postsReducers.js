import { actionTypes } from "../../constants/constants";

const { FETCH_POSTS } = actionTypes;

export default function fetchingPosts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}

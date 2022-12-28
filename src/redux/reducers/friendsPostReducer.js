import { FETCH_FRIENDSPOSTS } from "../types";

export default function fetchingFriendsPosts(state = [], action) {
  switch (action.type) {
    case FETCH_FRIENDSPOSTS:
      return action.payload;
    default:
      return state;
  }
}

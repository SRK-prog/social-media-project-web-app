import { FETCH_FRIENDSPOSTS, FETCH_POSTS } from "../types";
import BASE_URL from "../../api/baseUrl";

export const fetchPosts = () => async (dispatch) => {
  const {
    data: { response },
  } = await BASE_URL.get("/posts/get-all");
  dispatch({ type: FETCH_POSTS, payload: response });
};

export const fetchFriendsPosts = (token) => async (dispatch) => {
  const { data: { response }, } = await BASE_URL.get("/posts/timeline/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: FETCH_FRIENDSPOSTS, payload: response });
};

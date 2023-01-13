import { FETCH_FRIENDSPOSTS, FETCH_POSTS, FETCH_USER } from "../types";
import BASE_URL from "../../api/baseUrl";
import _ from "lodash";

export const fetchPosts = () => async (dispatch) => {
  const { data } = await BASE_URL.get("/posts");
  dispatch({ type: FETCH_POSTS, payload: data });
};

export const fetchUser = (userId) => (dispatch) => {
  _fetchUser(userId, dispatch);
};

const _fetchUser = _.memoize(async (userId, dispatch) => {
  const { data } = await BASE_URL.get("/users", {
    params: { userId },
  });
  dispatch({ type: FETCH_USER, payload: data });
});

export const fetchFriendsPosts = (userId) => async (dispatch) => {
  const { data } = await BASE_URL.get("/posts/timeline/" + userId);
  dispatch({ type: FETCH_FRIENDSPOSTS, payload: data });
};

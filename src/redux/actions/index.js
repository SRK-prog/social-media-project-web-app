import { actionTypes } from "../../constants/constants";
import { baseUrl } from "../../api/baseUrls";

const { FETCH_POSTS } = actionTypes;

export const fetchPosts = () => async (dispatch) => {
  const {
    data: { response },
  } = await baseUrl.get("/posts/get-all");
  dispatch({ type: FETCH_POSTS, payload: response });
};

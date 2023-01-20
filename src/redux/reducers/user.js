import { actionTypes, keyTypes } from "../../constants/constants";
import Utils from "../../utils";

const { UPDATE_USER, REMOVE_USER } = actionTypes;
const { USER, ACCESS_TOKEN } = keyTypes;

const getToken = () => {
  const value = Utils.getCookie(ACCESS_TOKEN);
  if (!value) localStorage.removeItem(USER);
  return value;
};

const storeData = (data) => {
  Utils.localStorageSetItem(USER, data);
  if (data.accessToken) Utils.setCookie(ACCESS_TOKEN, data.accessToken, 30);
};

const clearData = () => {
  localStorage.removeItem(USER);
  Utils.removeCookie(ACCESS_TOKEN);
};

const token = getToken();
const data = !!token ? Utils.localStorageGetItem(USER) : null;
const userData = !!data ? data : {};

const initialState = {
  isLoggedIn: !!userData?.userId,
  userId: userData?.userId || "",
  username: userData?.username || "",
  email: userData?.email || "",
  profilepicture: userData?.profilepicture || "",
  accessToken: token || "",
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      storeData(action.payload);
      return { ...state, ...action.payload, isLoggedIn: true };
    case REMOVE_USER:
      clearData();
      return {
        isLoggedIn: false,
        userId: "",
        username: "",
        email: "",
        profilePicture: "",
        accessToken: "",
      };
    default:
      return state;
  }
}

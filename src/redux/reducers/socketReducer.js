import { actionTypes } from "../../constants/constants";

const { UPDATE_SOCKET } = actionTypes;

const initialState = {
  socket: { connected: false },
};

export default function socket(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_SOCKET:
      return { ...state, ...payload };
    default:
      return state;
  }
}

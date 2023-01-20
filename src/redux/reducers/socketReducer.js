import { UPDATE_SOCKET } from "../types";

const initialState = {
  socket: { connected: false },
};

export default function notification(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_SOCKET:
      return { ...state, ...payload };
    default:
      return state;
  }
}

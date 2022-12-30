import { UPDATE_NOTIFY_SOCKET } from "../types";

const initialState = {
  isConnected: false,
  socket: null,
};

export default function notification(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_NOTIFY_SOCKET:
      return { ...state, ...payload };
    default:
      return state;
  }
}

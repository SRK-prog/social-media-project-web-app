import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/style.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const WebApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<WebApp />, document.getElementById("root"));

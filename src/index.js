import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/style.css";
import { Provider } from "react-redux";
import App from "./App";
import { ContextProvider } from "./context/Context";
import store from "./redux/store";

const WebApp = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  );
};

ReactDOM.render(<WebApp />, document.getElementById("root"));

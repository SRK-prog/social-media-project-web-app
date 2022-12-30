import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const reduxLogger = createLogger();

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") middlewares.push(reduxLogger);

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;

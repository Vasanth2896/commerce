// import { createStore } from 'redux'
// export const store = createStore(allReducer);


import { createStore, compose, applyMiddleware } from "redux";
import { allReducer } from "./reducer";
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
export const history = createBrowserHistory();
let middleware = [
    thunk,
    routerMiddleware(history)
];

middleware.push(createLogger());

const composedEnhancers = compose(
    applyMiddleware(...middleware)
);
export const store = createStore(allReducer, composedEnhancers);

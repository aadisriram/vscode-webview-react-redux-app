import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { initialState, reducer, State } from "../reducers";

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State>(
  reducer,
  initialState,
  applyMiddleware(logger)
);

export default store;

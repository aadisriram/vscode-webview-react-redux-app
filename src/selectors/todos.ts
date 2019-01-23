import { createSelector } from "reselect";
import { State } from "../reducers";

/*
 * Get the todos state from the root state
 */
const getTodosState = (state: State) => state.todos;

/*
 * Getting todos array from todos State
 */
export const getTodos = createSelector(
  [getTodosState],
  s => s.todos
);

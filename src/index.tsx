import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import * as Actions from './actions/todos';

document.defaultView.addEventListener('message', event => {
  store.dispatch(Actions[`${event.data.action}`](event.data.data));
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();

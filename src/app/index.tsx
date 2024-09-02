import { Provider } from "react-redux";
import { store } from "../store";
import App from "./app";

export const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

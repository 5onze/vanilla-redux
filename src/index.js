import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import stores from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={stores.store}>
    <PersistGate loading={null} persistor={stores.persistor}>
      <App />
    </PersistGate>
  </Provider>
);

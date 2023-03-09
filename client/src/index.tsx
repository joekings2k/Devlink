import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./index.css";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import {store} from "state/reduxpesisit"
import {StyledEngineProvider} from "@mui/material/styles"

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

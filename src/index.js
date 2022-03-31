import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import AuthProvider from "./utils/authProvider";
import store from "./store/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

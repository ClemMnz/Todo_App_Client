import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ element, ...args }) => (
  <Route
    component={withAuthenticationRequired(element)}
    {...args}
  />
);

export default ProtectedRoute;
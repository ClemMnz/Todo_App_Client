import React from "react";
import Navigation from "./Navigation/navBar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navigation />
      <main>{children}</main>
    </React.Fragment>
  );
};
export default Layout;

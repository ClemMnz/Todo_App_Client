import React from "react";
import Footer from "./Footer/footer";
import Navigation from "./Navigation/navBar";
import { StylesProvider } from '@mui/styles';

const Layout = ({ children }) => {
  return (
    <StylesProvider injectFirst>
    <React.Fragment>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
    </StylesProvider >
  );
};
export default Layout;

import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/home";
import NotFound from "./Components/NotFound/notFound";
import Layout from "./Components/Layout/layout";
import Profile from "./Components/Profile/profile";
import ListTasks from "./Components/Tasks/listTasks";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { useSelector } from "react-redux";
import {ProtectedRoute} from "./utils/protectedRoutes";

const App = () => {
  return (
  <>
      <Fragment>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/list"
              element={<ProtectedRoute component={ListTasks} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Fragment>
  
  </>
  );
};

export default App;

import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home";
import NotFound from "./Components/NotFound/notFound";
import Layout from "./Components/Layout/layout";
import Profile from "./Components/Profile/profile";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ListTasks from "./Components/Tasks/listTasks";
import { useAuth0 } from "@auth0/auth0-react";

import { CircularProgress, Box } from "@mui/material";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Box
        mt={"25%"}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  return (
    <BrowserRouter>
      <Fragment>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all" element={<ListTasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;

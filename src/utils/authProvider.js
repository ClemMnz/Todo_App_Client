import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import {  useNavigate } from 'react-router-dom';


const AuthProvider = ({ children }) => {

  if (
    !(
      process.env.REACT_APP_AUTH0_DOMAIN &&
      process.env.REACT_APP_AUTH0_CLIENT_ID &&
      process.env.REACT_APP_AUTH0_AUDIENCE
    )
  ) {
    return null;
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri="http://localhost:3000/list"
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="read:current_user profile email  read:current_user_metadata update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;

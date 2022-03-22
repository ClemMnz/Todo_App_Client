import React from "react";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  if (!(AUTH0_DOMAIN && AUTH0_CLIENT_ID && AUTH0_AUDIENCE)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri="http://localhost:3000/all"
      onRedirectCallback="http://localhost:3000/all"
      audience={AUTH0_AUDIENCE}
      scope="read:current_user profile email  read:current_user_metadata update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;

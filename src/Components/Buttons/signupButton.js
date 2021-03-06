import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      size="medium"
      variant={"outlined"}
      color="secondary"
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
    >
      S'inscrire
    </Button>
  );
};

export default LoginButton;

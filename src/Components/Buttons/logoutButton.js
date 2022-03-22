import React from "react";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      size={"small"}
      variant={"outlined"}
      color='secondary'
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Se Déconnecter
    </Button>
  );
};

export default LogoutButton;

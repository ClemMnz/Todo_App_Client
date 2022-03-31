import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Tooltip,
  IconButton,
  Menu,
  Avatar
} from "@mui/material";
import LoginButton from "../../Buttons/loginButton";
import LogoutButton from "../../Buttons/logoutButton";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { HashLink } from "react-router-hash-link";

import { Navlink, NavSmallLink } from "../../customed";
import "animate.css";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const user = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#8a73fb" }} position="static">
      <Toolbar>
        <HashLink to="/">
          <Navlink>Accueil</Navlink>
        </HashLink>

        {isAuthenticated && (
          <HashLink to="/list">
            <Navlink>Liste des tâches</Navlink>
          </HashLink>
        )}
        {!isAuthenticated ? (
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <LoginButton />
          </Box>
        ) : (
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <Box>
              <Tooltip title="Mon compte">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src={user.picture} alt={user.name} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem textAlign="center" onClick={handleCloseUserMenu}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: "1.1rem",
                      display: { xs: "block", sm: "block" },
                    }}
                  >
                    <HashLink to="/profile">
                      <NavSmallLink>Mon compte</NavSmallLink>
                    </HashLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <LogoutButton />
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

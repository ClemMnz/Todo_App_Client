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
  Avatar,
  Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SignUpButton from "../../Buttons/signupButton";
import LoginButton from "../../Buttons/loginButton";
import LogoutButton from "../../Buttons/logoutButton";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { HashLink as Link } from "react-router-hash-link";
import useStyles from "../../styles";
import "animate.css";

const Navbar = () => {

  const { isAuthenticated } = useAuth0();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#8a73fb" }} position="static">
      <Toolbar>
        <Typography ml={5} variant="h5" component="div" >
          <Link to="/" className={classes.navlink}>
            Accueil
          </Link>
        </Typography>
        {isAuthenticated && (
        <Typography
          ml={2}
          variant="h5"
          component="div"
        
        >
          <Link to="/all" className={classes.navlink}>
            Liste des tâches
          </Link>
        </Typography>
        )}
        {!isAuthenticated ? (
          <Box sx={{  flexGrow:1, display: "flex",
          flexDirection: "row-reverse"}}>
          <LoginButton  /></Box>
        ) : (
          <Box sx={{  flexGrow:1,   display: "flex",
          flexDirection: "row-reverse"}}>
            <Box >
              <Tooltip title="Mon compte">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                     fontSize:'1.1rem',
                      display: { xs: "block", sm: "block" },
                    }}
                  >
                    <Link  sx={{textDecoration:"none"}} justifyContent="center" to="/profile">
                      Mon compte
                    </Link>
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

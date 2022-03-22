import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions/userAction";
import moment from "moment";
import { AUTH0_DOMAIN } from "../../utils/config";
import "moment/locale/fr";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
 // const domain = "dev-uvuzhhsk.us.auth0.com";
  const User = useSelector((state) => state.user);

  useEffect(async () => {
    const token = await getAccessTokenSilently({
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      scope: "read:current_user",
    });
    dispatch(getUser({ user, token }))
      .then(() => {

      })
      .catch((e) => {
        console.log(e);
      });
  }, [getAccessTokenSilently, user, dispatch]);

  return (
    isAuthenticated && (
      <Container   >
        <Box p={'2rem 10rem 2rem 10rem'} justifyContent={'center'}>
          <Box><img style={{ float:'right'}}src={User.picture} alt={User.name} /></Box>
          <Typography textAlign={'center'} m={5} variant='h4'>{User.name}</Typography>
          <Typography variant='h6'><b>Nom:  </b> {User.family_name} </Typography>
          <Typography variant='h6'><b>Prénom:  </b> {User.given_name} </Typography>
          <Typography variant='h6'><b>Email:  </b> {User.email}</Typography>
        
          <Typography variant='h6'>
            <b>Dernière connexion : </b>
            {moment(User.last_login).format("DD/MM/YYYY à HH:mm")}{" "}
          </Typography>
         
          <Typography variant='h6'><b>Métadonnées :</b></Typography>
          {User ? (
            <Box p={'1em 10em 1em 8em'}><pre>{JSON.stringify(User, null, 2)}</pre></Box>
          ) : (
            "Aucune métadonnées trouvées."
          )}
          
        </Box>
      </Container>
    )
  );
};

export default Profile;

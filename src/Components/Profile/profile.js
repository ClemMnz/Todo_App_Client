import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Paper, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions/userAction";
import moment from "moment";
import "moment/locale/fr";
import { Title, SubtitleLine, Subtitle } from "../customed";

export const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);

  useEffect(async () => {
    const token = await getAccessTokenSilently({
      audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      scope: "read:current_user",
    });
    dispatch(getUser({ user, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }, [getAccessTokenSilently, user, dispatch]);

  return (
    User && (
      <Box m={{xs:2,sm:3, md:8}}>
        <Paper elevation={5}>
          <Box p={{xs: "2rem 1rem 2rem 1rem", sm: "3rem 10rem 5rem 10rem", md: "3rem 15rem 5rem 15rem" }}>
            <Box margin={{ xs:'1rem', sm:'1rem'}} >
              <img
               style={{float: "right" }}
                src={User.picture}
                alt={User.name}
              />
            </Box>
            <Title>{User.name}</Title>

            <SubtitleLine>
              <Subtitle>Nom: </Subtitle>
              <Typography> {User.family_name} </Typography>
            </SubtitleLine>
            <SubtitleLine>
              <Subtitle>Prénom: </Subtitle>
              <Typography> {User.given_name} </Typography>
            </SubtitleLine>
            <SubtitleLine>
              <Subtitle>Email: </Subtitle>
              <Typography> {User.email}</Typography>
            </SubtitleLine>

            <SubtitleLine>
              <Subtitle>Dernière connexion : </Subtitle>
              <Typography>
                {moment(User.last_login).format("DD/MM/YYYY à HH:mm")}
              </Typography>
            </SubtitleLine>

            <SubtitleLine>
              <Subtitle>Métadonnées :</Subtitle>
            </SubtitleLine>
            {User ? (
             
                <Stack p={2} noWrap flexDirection={{ xs: 'column'}}>{JSON.stringify(User, null, 2)}</Stack>
             
            ) : (
              "Aucune métadonnées trouvées."
            )}
          </Box>
        </Paper>
      </Box>
    )
  );
};

export default Profile;

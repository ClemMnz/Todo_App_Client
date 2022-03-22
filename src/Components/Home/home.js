import React from "react";
import { ReactComponent as ReactIcon } from "../../Images/logos/reactjs.svg";
import { ReactComponent as ReduxIcon } from "../../Images/logos/redux.svg";
import { ReactComponent as ExpressIcon } from "../../Images/logos/express.svg";
import { ReactComponent as MongoDdIcon } from "../../Images/logos/mongodb.svg";
import { ReactComponent as NodeJsIcon } from "../../Images/logos/nodejs.svg";
import { ReactComponent as Auth0Icon } from "../../Images/logos/auth0.svg";
import { ReactComponent as MuiIcon } from "../../Images/logos/mui.svg";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SignUpButton from "../Buttons/signupButton";
import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

import Typed from "react-typed";

const textLines = [
  `Bienvenue sur cette application de gestion de tâches.<br>
    Voici la stack que j'ai utilisée :<br>
    React, Redux et Material UI pour le front-end.<br>
    Node.js et Express pour le back-end.<br>
    MongoDB pour la persistance des données<br>
    et Auth0 pour l'authentification. 😊`,
];

const Home = () => {
  const { isAuthenticated } = useAuth0();
  const anL = "animate__animated animate__fadeInLeft";
  const anR = "animate__animated animate__fadeInRight";
  const animArrow =
    "animate__animated  animate__slideInDown animate__slow animate__delay-4s animate__infinite";
  const animButton = "animate__animated animate__fadeInLeft animate__delay-4s";

  return (
    <>
      <Box m={5}>
        <Box
          height={"8rem"}
          margin={{ sm: "3rem 5rem 2rem 5rem", md: "6rem 18rem 9rem 18rem" }}
          textAlign={"center"}
          fontSize={24}
          fontFamily="Souvenir , Roboto Mono"
        >
          <Typed strings={textLines} typeSpeed={45} />
        </Box>
        {!isAuthenticated && (
          <Box   mb={{xs:"15rem",md: "7rem"}}>
            <Box
             mt={{xs:"15rem",md: "5rem"}}
           
              style={{
                margin:'1.3rem',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowCircleDownIcon className={animArrow} fontSize={"large"} />
            </Box>

            <Box
              className={animButton}
              style={{
               
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <SignUpButton />
            </Box>
          </Box>
        )}
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
        
          mt={{xs:"8rem", md: "6rem"}}
          mb={{xs:"8rem", md: "5rem"}}
        >
          <MuiIcon className={anL} />
          <ReduxIcon className={anL} />
          <ReactIcon className={anL} />
          <ExpressIcon className={anL} />
          <NodeJsIcon className={anR} />
          <MongoDdIcon className={anR} />
          <Auth0Icon className={anR} />
        </Stack>
      </Box>
    </>
  );
};

export default Home;

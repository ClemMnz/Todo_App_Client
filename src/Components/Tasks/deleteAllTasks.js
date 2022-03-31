import React, { useState } from "react";
import { deleteAllTasks } from "../../store/actions/taskAction";
import { Button, Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { HomeAlert, Modal } from "../customed";

const DeleteAll = (props) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState(false);

  const deleteA = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    dispatch(deleteAllTasks(accessToken))
      .then(() => {
        setDeleted(true);
        setMessage("Vous venez de supprimer toutes vos tâches.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal>
      {deleted && (
        <Box
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Close float={"left"} onClick={props.onHide} />
        </Box>
      )}
      {!deleted && (
        <>
          <Typography
            severity="info"
            m={2}
            id="transition-modal-title"
            textAlign={"center"}
            fontSize={18}
            variant="h5"
          >
            Etes vous certain(e) de vouloir supprimer toutes les tâches ?{" "}
          </Typography>
          <Box
            id="transition-modal-description"
            display={"flex"}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              sx={{ m: "0.5rem", backgroundColor: "lightGray" }}
              onClick={props.onHide}
              mr={1}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              sx={{ m: "0.5rem", backgroundColor: "#8a73fb" }}
              onClick={() => deleteA()}
            >
              Confirmer
            </Button>
          </Box>
        </>
      )}
      {deleted && (
        <Box>
          <HomeAlert variant="outlined" severity="info">
            {message}
          </HomeAlert>
        </Box>
      )}
    </Modal>
  );
};

export default DeleteAll;

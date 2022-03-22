import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  AlertTitle,
  Alert,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch } from "react-redux";
import { getAllTasks, updateTask } from "../../store/actions/taskAction";
import { style } from "./createTask";
import UpdateTask from "./updateTask";
import { TextValidator } from "react-material-ui-form-validator";
import { AUTH0_AUDIENCE } from "../../utils/config";

const Task = (props) => {
  
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [currentTask, setCurrentTask] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState("");
 
  const handleChangeIsEdit = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    setCurrentTask(props.task);
    console.log(props.task);
  }, [props.task, props.token]);

  const updateT = async () => {
    const token = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
    });
    var data = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
      updated_at: new Date(),
    };

    dispatch(updateTask({ id: currentTask.id, data, token }))
      .then(() => {
        dispatch(getAllTasks(token));
        props.onHide();
        setUpdated(true);
        setMessage("La tâche a bien été mise à jour.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box sx={style}>
        <Close onClick={props.onHide} />
        {isEditMode ? (
          <>
            {!updated ? (
              <Box>
                <UpdateTask task={currentTask} setTask={setCurrentTask} />

                <Button
                  sx={{
                    marginBottom: "0.5rem",
                    marginLeft: "20rem",
                    backgroundColor: "#8a73fb",
                  }}
                  type="submit"
                  variant="contained"
                  onClick={updateT}
                >
                  Modifier
                </Button>
              </Box>
            ) : (
              <div
                style={{
                  margin: "2rem",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Alert textAlign={"center"} severity="success">
                  <AlertTitle>{message}</AlertTitle>
                </Alert>
              </div>
            )}
          </>
        ) : (
          <Box m={2}>
            <Typography
              mb={3}
              id="transition-modal-title"
              textAlign={"center"}
              variant="h5"
              component="h2"
            >
              {props.task.title}
            </Typography>
            <div>
              <Typography gutterBottom noWrap>
                {" "}
                <b>Description: </b>
                {props.task.description}
              </Typography>
            </div>
            <div>
              <Typography>
                <b>Statut: </b>
                {props.task.status}
              </Typography>
            </div>
            <div>
              <Typography>
                <b>Création: </b>
                {moment(props.task.created_at).format("DD/MM/YYYY à HH:mm")}
              </Typography>
            </div>
            <div>
              <Typography>
                <b>Dernière Modification: </b>{" "}
                {moment(props.task.updated_at).format("DD/MM/YYYY à HH:mm")}
              </Typography>
            </div>
            <Box
              style={{
                margin: "0.5rem",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                float="right"
                fontSize={{ xs: 10, sm: 8 }}
                sx={{ backgroundColor: "#8a73fb" }}
                variant="contained"
                type="submit"
                endIcon={<Edit />}
                onClick={handleChangeIsEdit}
              >
                Modifier
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Task;

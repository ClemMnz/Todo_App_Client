import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  AlertTitle,
  Alert,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, updateTask } from "../../store/actions/taskAction";
import UpdateTask from "./updateTask";
import {
  Modal,
  Subtitle,
  SubtitleLine,
  SubmitButton,
  BoxReverse,
} from "../customed";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const Task = (props) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [currentTask, setCurrentTask] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState("");
  const persons = useSelector((state) => state.persons);

  const getToken = async () => {
    token = await getAccessTokenSilently({
      audience: audience,
      scope: "read:current_user",
    });
    return token;
  };
  let token = getToken();

  const handleChangeIsEdit = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    setCurrentTask(props.task);
  }, [props.task, props.token]);

  const updateT = async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    var data = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
      responsible: currentTask.responsible,
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
      <Modal>
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
            <List>
              <SubtitleLine>
                <Subtitle noWrap>Description: </Subtitle>
                <Typography>{props.task.description}</Typography>
              </SubtitleLine>
              <SubtitleLine>
                <Subtitle>Statut: </Subtitle>{" "}
                <Typography>{props.task.status}</Typography>
              </SubtitleLine>
              <SubtitleLine>
                <Subtitle>Responsable: </Subtitle>
                {persons &&
                  persons
                    .filter((person) => person._id === props.task.responsible)
                    .map((p) => (
                      <Typography>{`${
                        p.firstname + " " + p.lastname
                      }`}</Typography>
                    ))}
                {!props.task.responsible && <Typography>Non défini</Typography>}
              </SubtitleLine>
              <SubtitleLine>
                <Subtitle>Créée le: </Subtitle>
                <Typography>
                  {moment(props.task && props.task.created_at).format(
                    "DD/MM/YYYY à HH:mm"
                  )}
                </Typography>
              </SubtitleLine>
              <SubtitleLine>
                <Subtitle>Dernière modification: </Subtitle>{" "}
                <Typography>
                  {moment(props.task.updated_at).format("DD/MM/YYYY à HH:mm")}
                </Typography>
              </SubtitleLine>
            </List>

            <BoxReverse>
              <SubmitButton
                type="submit"
                endIcon={<Edit />}
                onClick={handleChangeIsEdit}
              >
                Modifier
              </SubmitButton>
            </BoxReverse>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default Task;

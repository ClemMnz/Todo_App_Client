import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  CardContent,
  Button,
  Modal,
  Box,
  Typography,
  Container,
  CardHeader,
  Alert,
  List,
} from "@mui/material";
import { Search, Add, DeleteForever, Edit } from "@mui/icons-material";
import moment from "moment";
import CreateTask from "./createTask";
import Task from "./task";
import "moment/locale/fr";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteAll from "./deleteAllTasks";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  getAllTasks,
  deleteTask,
  findTaskByTitle,
} from "../../store/actions/taskAction";
import { getUser } from "../../store/actions/userAction";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { AUTH0_AUDIENCE } from "../../utils/config";

const ListTasks = () => {
  const [modalShow, setModalShow] = useState(false);
  const todos = useSelector((state) => state.todos);
  const User = useSelector((state) => state.user);
  const [currentTask, setCurrentTask] = useState({});
  const [title, setTitle] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently } = useAuth0();

  const onChange = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleOpenModal = (task, type) => {
    setModalShow(true);
    setCurrentTask(task);
    setTypeModal(type);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  useEffect(async () => {
    const token = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
      scope: "read:current_user",
    });
    dispatch(getUser({ user, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }, [getAccessTokenSilently, user, dispatch]);

  useEffect(async () => {
    const token = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
    });

    dispatch(getAllTasks(token));
  }, [getAccessTokenSilently, dispatch]);

  const getToken = async () => {
    token = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
    });
    return token;
  };
  let token = getToken();

  const findTask = async () => {
    const token = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
    });
    dispatch(findTaskByTitle({ title, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteT = ({ id, token }) => {
    dispatch(deleteTask({ id, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box mb={"10rem"}>
        <Typography
          m={4}
          textAlign={"center"}
          textTransform="uppercase"
          variant="h5"
        >
          Liste de tâches
        </Typography>

        <Container>
          {/*
            <ValidatorForm sx={{ float: "left" }} onSubmit={findTask}>
              <TextValidator
                type="text"
                placeholder="Recherchez par titre..."
                value={title}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </ValidatorForm>
              */}
          <Button
            endIcon={<Add />}
            sx={{
              float: "right",
              margin: "1rem",
              backgroundColor: "gray",
              color: "white",
            }}
            variant={"contained"}
            onClick={() => handleOpenModal({}, "add")}
          >
            Ajouter
          </Button>

          {todos && todos.length > 1 && (
            <Button
              endIcon={<DeleteForever />}
              variant={"contained"}
              sx={{
                float: "right",
                margin: "1rem",
                backgroundColor: "lightGray",
                color: "white",
              }}
              onClick={() => handleOpenModal({}, "delete")}
            >
              Tout supprimer
            </Button>
          )}

          <Grid container spacing={4} mt={5}>
            {todos.length >= 1 ? (
              todos &&
              todos.map((task) => (
                <Grid item md={4}>
                  <Card
                    sx={{
                      maxWidth: "24rem",
                      border: "0.1px solid lightGray",
                      boxShadow: "12px 8px 1px 1px rgba(0, 0, 255, .2)",
                    }}
                  >
                    <CardHeader
                      variant="h4"
                      action={
                        <Box
                          sx={{
                            spacing: 1,
                            marginLeft: "2rem",
                            fontSize: "1.3rem",
                          }}
                        >
                          <Edit
                            aria-label="settings"
                            onClick={() => handleOpenModal(task, "edit")}
                          />
                          <DeleteForever
                            aria-label="settings"
                            key={task.id}
                            onClick={() =>
                              deleteT({ id: task.id, token: token })
                            }
                          />
                        </Box>
                      }
                      title={task.title}
                    />

                    <CardContent>
                      <List>
                        <Typography
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          noWrap
                          gutterBottom
                        >
                          {" "}
                          <b>Description: </b>
                          {task.description}
                        </Typography>

                        <Typography>
                          <b>Statut: </b> {task.status}{" "}
                        </Typography>

                        <Typography>
                          <b>Créée le: </b>
                          {moment(task && task.created_at).format(
                            "DD/MM/YYYY à HH:mm"
                          )}
                        </Typography>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                ml={50}
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Alert
                  variant="outlined"
                  severity="info"
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    border: "1px grey",
                    color: "black",
                  }}
                >
                  Vous n'avez aucune tâche.
                </Alert>
              </Box>
            )}{" "}
          </Grid>
        </Container>
      </Box>
      <Modal
        open={modalShow}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        onClose={handleCloseModal}
      >
        {typeModal === "edit" ? (
          <Task onHide={handleCloseModal} task={currentTask} />
        ) : typeModal === "add" ? (
          <CreateTask onHide={handleCloseModal} />
        ) : typeModal === "delete" ? (
          <DeleteAll onHide={handleCloseModal} />
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default ListTasks;

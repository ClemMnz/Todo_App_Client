import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  MenuItem,
  Modal,
  Box,
  Typography,
  Container,
  CardHeader,
  List,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { ButtonHome, DeleteButton } from "../customed";
import { Search, DeleteForever, Edit, Cancel } from "@mui/icons-material";
import moment from "moment";
import CreateTask from "./createTask";
import Task from "./task";
import "moment/locale/fr";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteAll from "./deleteAllTasks";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAllTasks,
  deleteTask,
  findTaskByTitle,
  findTasksByPerson,
} from "../../store/actions/taskAction";
import { getUser } from "../../store/actions/userAction";
import { getAllPersons } from "../../store/actions/personAction";
import {
  TextValidator,
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import CreatePerson from "../Persons/createPerson";
import {
  HomeAlert,
  Subtitle,
  SubtitleLine,
  Title,
  CardShad,
} from "../customed";

const ListTasks = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [title, setTitle] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [responsible, setResponsible] = useState("");
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently } = useAuth0();
  const persons = useSelector((state) => state.persons);
  const todos = useSelector((state) => state.todos);
  const User = useSelector((state) => state.user);

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onChange = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleSelectChange = (event) => {
    const responsible = event.target.value;
    setResponsible(responsible);
  };

  const handleReset = () => {
    setTitle("");
    setResponsible("");
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
      audience: audience,
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
      audience: audience,
    });

    dispatch(getAllTasks(token));
    dispatch(getAllPersons(token));
  }, [getAccessTokenSilently, dispatch]);

  const getToken = async () => {
    token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  };
  let token = getToken();

  const findTasks = async () => {
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    dispatch(findTaskByTitle({ title, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const findByPerson = async () => {
    const token = await getAccessTokenSilently({
      audience: audience,
    });

    dispatch(findTasksByPerson({ responsible, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteT = async ({ id, token }) => {
    dispatch(deleteTask({ id, token }))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box mb={"10rem"}>
        <Title>Liste de tâches</Title>
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={{ xs: 2, md: 4 }}
            mb={5}
            mt={5}
          >
            <ValidatorForm onSubmit={findTasks}>
              <TextValidator
                type="text"
                size={"small"}
                placeholder="Recherchez par titre..."
                value={title}
                name="title"
                onChange={onChange}
                validators={[
                  "matchRegexp:^[a-zA-Z_0-9_' '_,.?@-é/èàêô]{0,45}$",
                ]}
                errorMessages={[
                  "Caractères autorisés: Lettres, chiffres et '_,.?@-é/èàêô'",
                ]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Cancel onClick={handleReset} />
                    </InputAdornment>
                  ),
                }}
              />
            </ValidatorForm>
            <ValidatorForm autoWidth onSubmit={findByPerson}>
              <SelectValidator
                label="Responsable"
                type="text"
                size={"small"}
                name="responsible"
                value={responsible}
                onChange={handleSelectChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Search onClick={() => findByPerson()} />
                      <Cancel onClick={handleReset} />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: '15rem'}}
              >
                {persons &&
                  persons.map((person) => (
                    <MenuItem value={person._id} key={person}>{`${
                      person.firstname + " " + person.lastname
                    }`}</MenuItem>
                  ))}
              </SelectValidator>
            </ValidatorForm>

            <ButtonHome onClick={() => handleOpenModal({}, "add")}>
              Ajouter une tâche
            </ButtonHome>
            <ButtonHome onClick={() => handleOpenModal({}, "addPerson")}>
              Ajouter un responsable
            </ButtonHome>

            {todos && todos.length > 1 && (
              <DeleteButton
                endIcon={<DeleteForever />}
                onClick={() => handleOpenModal({}, "delete")}
              >
                Tout supprimer
              </DeleteButton>
            )}
          </Stack>
          <Grid
            container
            mt={"3rem"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={{ xs: 2, sm: 2, md: 4 }}
          >
            {todos.length >= 1 ? (
              todos &&
              todos.map((task, index) => (
                <Grid key={index} item xs={12} sm={6} md={3.5}>
                  <CardShad key={task}>
                    <CardHeader
                      avatar={<Avatar sx={{}} aria-label="recipe"></Avatar>}
                      sx={{ fontFamily: "monospace", fontSize: "1rem" }}
                      action={
                        <IconButton
                          aria-label="settings"
                          sx={{
                            spacing: 1,
                            marginLeft: "2rem",
                            fontSize: "1.3rem",
                            color: "#440099",
                          }}
                        >
                          <Edit onClick={() => handleOpenModal(task, "edit")} />
                          <DeleteForever
                            onClick={() =>
                              deleteT({ id: task.id, token: token })
                            }
                          />
                        </IconButton>
                      }
                      title={task.title}
                    />

                    <CardContent>
                      <List>
                        <SubtitleLine>
                          <Subtitle noWrap>Description: </Subtitle>
                          <Typography>{task.description}</Typography>
                        </SubtitleLine>
                        <SubtitleLine>
                          <Subtitle>Statut: </Subtitle>{" "}
                          <Typography>{task.status}</Typography>
                        </SubtitleLine>
                        <SubtitleLine>
                          <Subtitle>Responsable: </Subtitle>
                          {persons &&
                            persons
                              .filter(
                                (person) => person._id === task.responsible
                              )
                              .map((p) => (
                                <Typography>{`${
                                  p.firstname + " " + p.lastname
                                }`}</Typography>
                              ))}
                          {!task.responsible && (
                            <Typography>Non défini</Typography>
                          )}
                        </SubtitleLine>
                        <SubtitleLine>
                          <Subtitle>Créée le: </Subtitle>
                          <Typography>
                            {moment(task && task.created_at).format(
                              "DD/MM/YYYY à HH:mm"
                            )}
                          </Typography>
                        </SubtitleLine>
                      </List>
                    </CardContent>
                  </CardShad>
                </Grid>
              ))
            ) : (
              <Container
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "5rem" }}
              >
                <HomeAlert variant="outlined" severity="info">
                  Vous n'avez aucune tâche.
                </HomeAlert>
              </Container>
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
        ) : typeModal === "addPerson" ? (
          <CreatePerson onHide={handleCloseModal} />
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

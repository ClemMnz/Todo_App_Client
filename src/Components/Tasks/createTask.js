import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Typography,
  AlertTitle,
  Alert,
  MenuItem,
} from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { createTask } from "../../store/actions/taskAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllPersons } from "../../store/actions/personAction";
import { SubmitButton, Modal, BoxReverse } from "../customed";

const CreateTask = (props) => {
  const options = ["Nouvelle", "En cours"];
  const dispatch = useDispatch();
  const audience = process.env.AUTH0_AUDIENCE;
  const { getAccessTokenSilently } = useAuth0();
  const user = useSelector((state) => state.user);
  const persons = useSelector((state) => state.persons);
  const message = useSelector((state) => state.message);

  const initialState = {
    title: "",
    description: "",
    status: "",
    created_at: new Date(),
    responsible: "",
    user: "",
  };
  const [task, setTask] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  useEffect(async () => {
    document.title = "Todo App";
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    dispatch(getAllPersons(token));
  }, [getAccessTokenSilently, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSelectStatusChange = (event) => {
    setTask({ ...task, status: event.target.value });
  };

  const handleSelectResponsibleChange = (event) => {
    setTask({ ...task, responsible: event.target.value });
  };


  const saveTask = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently({
      audience: audience,
    });

    var formData = {
      title: task.title,
      description: task.description,
      status: task.status,
      created_at: task.created_at,
      responsible: task.responsible,
      user: user.user_id,
    };
    dispatch(createTask({ formData, token }))
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Modal>
        <Close onClick={props.onHide} />
        <Typography
          mb={2}
          id="transition-modal-title"
          textAlign={"center"}
          variant="h5"
          component="h2"
        >
          Nouvelle tâche
        </Typography>

        <ValidatorForm
          onSubmit={saveTask}
          m={"5rem"}
          id="transition-modal-description"
          padded="very"
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          {submitted && (
            <div
              style={{
                margin: "1rem",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Alert textAlign={"center"} severity="success">
                <AlertTitle>La tâche a bien été ajoutée.</AlertTitle>
              </Alert>
            </div>
          )}

          <div>
            <TextValidator
              margin="dense"
              label="Titre"
              name="title"
              id="title"
              placeholder="Titre"
              type="text"
              value={task.title}
              onChange={handleInputChange}
              validators={[
                "required",
                "matchRegexp:^[a-zA-Z_0-9_' '_,.?@-é/èàêô]{3,25}$",
              ]}
              errorMessages={[
                "Veuillez renseigner un titre svp.",
                "Le titre doit comporter entre 3 et 25 caractères.",
              ]}
              fullWidth
              required
            />
            <TextValidator
              margin="dense"
              label="Description"
              name="description"
              id="description"
              placeholder="Description"
              minRows={3}
              multiline
              type="text"
              value={task.description}
              onChange={handleInputChange}
              validators={[
                "required",
                "matchRegexp:^[a-zA-Z_0-9_' '_,.?@-é/èàêô]{3,250}$",
              ]}
              errorMessages={[
                "Veuillez renseigner une description svp.",
                "La description doit comporter entre 3 et 250 caractères.",
              ]}
              required
              fullWidth
            />
            <SelectValidator
              margin="dense"
              type="text"
              required
              name="status"
              aria-expanded="false"
              label="Statut"
              validators={["required"]}
              errorMessages={["Veuillez choisir un statut svp."]}
              fullWidth
              value={task.status}
              onChange={handleSelectStatusChange}
            >
              {options &&
                options.map((option) => (
                  <MenuItem key={option} value={option}>{`${option}`}</MenuItem>
                ))}
            </SelectValidator>
            <SelectValidator
              margin="dense"
              type="text"
              name="responsible"
              aria-expanded="false"
              label="Responsable"
              fullWidth
              value={task.responsible}
              onChange={handleSelectResponsibleChange}
            >
              {persons &&
                persons.map((person) => (
                  <MenuItem
                    key={person.id}
                    value={person}
                  >{`${person.firstname} ${person.lastname}`}</MenuItem>
                ))}
            </SelectValidator>
            <BoxReverse>
              <SubmitButton
                variant="contained"
                type="submit"
                endIcon={<Send />}
              >
                Ajouter
              </SubmitButton>
            </BoxReverse>
          </div>
        </ValidatorForm>
      </Modal>
    </>
  );
};

export default CreateTask;

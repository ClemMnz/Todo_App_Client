import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Typography,
  Button,
  Box,
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
import { useNavigate } from "react-router-dom";
import { AUTH0_AUDIENCE } from "../../utils/config";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
 
  
};

const CreateTask = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audience = AUTH0_AUDIENCE;
  const { getAccessTokenSilently } = useAuth0();
  const user = useSelector((state) => state.user);
  
  const initialState = {
    title: "",
    description: "",
    status: "",
    created_at: new Date(),
    token: "",
  };
  const [task, setTask] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSelectChange = (event) => {
    setTask({ ...task, status: event.target.value });
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
      user: user.user_id,
    };
    dispatch(createTask({ formData, token }))
      .then(() => {
        setSubmitted(true);
        navigate("/all");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box sx={style}>
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
          sx={{ margin: "5rem" }}
          id="transition-modal-description"
          padded="very"
          raised
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
          stackable="true"
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
              fluid
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
              fluid
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
              onChange={handleSelectChange}
            >
              <MenuItem selected value="Nouvelle">
                Nouvelle
              </MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
            </SelectValidator>
            <Box
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                fontSize={{ xs: 10, sm: 8 }}
                sx={{ float: "right", backgroundColor: "#8a73fb" }}
                variant="contained"
                type="submit"
                endIcon={<Send />}
              >
                Ajouter
              </Button>
            </Box>
          </div>
        </ValidatorForm>
      </Box>
    </>
  );
};

export default CreateTask;

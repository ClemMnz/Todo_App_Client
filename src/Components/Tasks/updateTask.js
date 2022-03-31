import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";

const UpdateTask = ({ setTask, task }) => {
  const options = ["En cours", "Terminée"];
  const persons = useSelector((state) => state.persons);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  const handleSelectChange = (event) => {
    setTask({ ...task, status: event.target.value });
  };

  const handleSelectResponsibleChange = (event) => {
    setTask({ ...task, responsible: event.target.value });
  };

  return (
    <Box>
      <Typography
        mb={1}
        id="transition-modal-title"
        textAlign={"center"}
        variant="h5"
      >
        Editer la tâche
      </Typography>
      <Box sx={{ padding: "1rem" }}>
        <ValidatorForm id="transition-modal-description">
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
                "matchRegexp:^[a-zA-Z_0-9_' '_,.?!@/-éèàêô]{3,25}$",
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
                "matchRegexp:^[a-zA-Z_0-9_' '_,.?§!@/-éèàêô]{3,250}$",
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
              {options &&
                options.map((option) => (
                  <MenuItem
                    key={task.status}
                    value={option}
                  >{`${option}`}</MenuItem>
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
                    key={task.responsible}
                    selected
                    value={person}
                  >{`${person.firstname} ${person.lastname}`}</MenuItem>
                ))}
            </SelectValidator>
          </div>
        </ValidatorForm>
      </Box>
    </Box>
  );
};

export default UpdateTask;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, AlertTitle, Alert } from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { createPerson } from "../../store/actions/personAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitButton, Modal, BoxReverse } from "../customed";

const CreatePerson = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audience = process.env.AUTH0_AUDIENCE;
  const { getAccessTokenSilently } = useAuth0();
  const user = useSelector((state) => state.user);

  const initialState = {
    firstname: "",
    lastname: "",
    created_at: new Date(),
    user: "",
  };
  const [person, setPerson] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const savePerson = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently({
      audience: audience,
    });

    var formData = {
      firstname: person.firstname,
      lastname: person.lastname,
      created_at: person.created_at,
      user: user.user_id,
    };
    dispatch(createPerson({ formData, token }))
      .then(() => {
        setSubmitted(true);
        navigate("/all");
      })
      .catch((e) => {
        setSubmitted(false);
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
          Nouvelle personne
        </Typography>

        <ValidatorForm
          margin={"5rem"}
          onSubmit={savePerson}
          id="transition-modal-description"
          padded="very"
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
                <AlertTitle>La personne a bien été ajoutée.</AlertTitle>
              </Alert>
            </div>
          )}

          <TextValidator
            margin="dense"
            label="Nom"
            name="lastname"
            id="lastname"
            placeholder="Nom"
            type="text"
            value={person.lastname}
            onChange={handleInputChange}
            validators={[
              "required",
              "matchRegexp:^[a-zA-Z_0-9_' '_,.?@-é/èàêô]{3,45}$",
            ]}
            errorMessages={[
              "Veuillez renseigner un nom svp.",
              "Le nom doit comporter entre 3 et 45 caractères.",
            ]}
            fullWidth
            required
          />
          <TextValidator
            margin="dense"
            label="Prénom"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            type="text"
            value={person.firstname}
            onChange={handleInputChange}
            validators={[
              "required",
              "matchRegexp:^[a-zA-Z_0-9_' '_,.?@-é/èàêô]{3,45}$",
            ]}
            errorMessages={[
              "Veuillez renseigner un prénom svp.",
              "Le prénom doit comporter entre 3 et 45 caractères.",
            ]}
            required
            fullWidth
          />
          <BoxReverse>
            <SubmitButton type="submit" endIcon={<Send />}>
              Ajouter
            </SubmitButton>
          </BoxReverse>
        </ValidatorForm>
      </Modal>
    </>
  );
};

export default CreatePerson;

import { styled } from "@mui/material/styles";
import {
  Button,
  Stack,
  Box,
  Alert,
  Paper,
  Card,
  Typography,
  Link,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";

const SubmitButton = styled(Button)((props) => ({
  [props.theme.breakpoints.up("xs")]: {
    float: "right",
    margin: "1rem",
    size: "small",
    backgroundColor: "#FFA500",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#8a73fb",
      color: "#FFF",
    },
  },
  [props.theme.breakpoints.up("md")]: {
    float: "right",
    backgroundColor: "#FFA500",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
    },
  },
}));

const DeleteButton = styled(Button)(() => ({
  float: "right",
  padding: "0.7rem",
  fontSize: "0.6rem",
  backgroundColor: "#FFA500",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "lightGray",
    color: "#FFF",
  },
}));

const ButtonHome = styled(Button)(() => ({
  float: "right",
  padding: "0.7rem",
  fontSize: "0.6rem",
  backgroundColor: "grey",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "#FFA500",
    color: "#FFF",
  },
}));

const Modal = styled(Paper)((props) => ({
  [props.theme.breakpoints.up("xs")]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    boxShadow: 24,
    padding: "2rem",
  },
  [props.theme.breakpoints.up("sm")]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    boxShadow: 24,
    padding: "1.6rem",
  },
}));

const BoxReverse = styled(Box)(() => ({
  margin: "0.3rem",
  display: "flex",
  flexDirection: "row-reverse",
}));

const Title = styled(Typography)(() => ({
  margin: "2rem",
  display: "flex",
  justifyContent: "center",
  textTransform: "uppercase",
  fontSize: "1.3rem",
  fontFamily: "monospace",
}));

const HomeAlert = styled(Alert)(() => ({
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  fontSize: "1.1rem",
  border: "1px grey",
  color: "black",
  textAlign: "center",
}));

const CardShad = styled(Card)(() => ({
  border: "0.1px solid lightGray",
  boxShadow: "12px 8px 1px 1px rgba(0, 0, 255, .2)",
}));

const SubtitleLine = styled(Stack)(() => ({
  flexDirection: "row",
  margin: "0.4rem",
}));

const Subtitle = styled(Stack)(() => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginRight: "0.5rem",
  fontFamily: "monospace",
  color: "#FFA500",
}));

const Navlink = styled(Link)(() => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  margin: "1.2rem",
  color: "#FFF",
  fontFamily: "monospace",
  textTransform: "uppercase",
  textDecoration: "none",
}));

const NavSmallLink = styled(Link)(() => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "Grey",
  fontFamily: "monospace",
  textDecoration: "none",
  justifyContent: "center",
}));

export {
  SubmitButton,
  DeleteButton,
  Subtitle,
  ButtonHome,
  Modal,
  Title,
  CardShad,
  HomeAlert,
  BoxReverse,
  SubtitleLine,
  Navlink,
  NavSmallLink,
};

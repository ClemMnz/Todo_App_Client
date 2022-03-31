import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  const { isLoading } = useAuth0();

  return (
    isLoading && (
      <Box
        mt={"25%"}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    )
  );
};

export default Loader;

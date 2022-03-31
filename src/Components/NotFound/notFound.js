import React from "react";
import { Link } from "react-router-dom";
import {Box} from "@mui/material";
import pageNotFound from '../../Images/page-introuvable.jpg';

const NotFound = () => {

  return (
    <Box  display={'flex'}  marginTop={{xs:'40%', sm: '20%', md:'1%'}} alignItems={'center'} justifyContent={'center'} >
        <img style={{ width: '50%' , height: 'auto'}} src={pageNotFound} />
    </Box>
  );
};

export default NotFound;

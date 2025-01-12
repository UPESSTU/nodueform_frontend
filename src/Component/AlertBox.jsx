// an alert box component us mui to show alerts 

import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const AlertBox = ({ severity, title, message }) => {
    return (
        <Alert severity={severity} variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {message}
        </Alert>
    );
    }

export default AlertBox;

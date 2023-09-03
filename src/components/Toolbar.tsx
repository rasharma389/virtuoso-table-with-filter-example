import React from "react";
import { Box, AppBar } from "@mui/material";

export const Toolbar = (props: any) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "white",
        border: "1px solid #eee",
        display: "flex",
        justifyContent: "flex-start",
        padding: '0 20px'
      }}
    >
      {/* <AppBar
        elevation={0}
        sx={{
          background: "white",
          border: "1px solid grey",
          display: "flex",
          justifyContent: "flex-start"
        }}
        position="static"
      > */}
      {props.children}
      {/* </AppBar> */}
    </Box>
  );
};

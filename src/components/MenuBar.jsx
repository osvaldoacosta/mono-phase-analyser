import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#274e5e" }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img
            src="logo512.png"
            alt="MonoPhaseAnalyzer Logo"
            style={{ height: 40, marginRight: 16 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MonoPhaseAnalyzer
          </Typography>
        </Box>
        <Button color="inherit">Início</Button>
        <Button color="inherit">Ensaios</Button>
        <Button color="inherit">Diagrama Fasorial</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

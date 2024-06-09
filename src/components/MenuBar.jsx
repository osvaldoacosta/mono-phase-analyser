import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Icone_Logo from "./eletric.png";

const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#274e5e" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={Icone_Logo}
            alt="MonoPhaseAnalyzer Logo"
            style={{ height: 40, marginRight: 16 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MonoPhaseAnalyzer
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" href="/">Início</Button>
          <Button color="inherit" href="/ensaios">Ensaios</Button>
          <Button color="inherit" href="/diagramas">Diagrama Fasorial</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;


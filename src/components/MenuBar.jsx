import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#274e5e" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={"eletric.png"}
            alt="MonoPhaseAnalyzer Logo"
            style={{ height: 40, marginRight: 16 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MonoPhaseAnalyzer
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" href="/">
            Início
          </Button>
          <Button color="inherit" href="/parametros">
            Parâmetros
          </Button>
          <Button color="inherit" href="/calculate-regulacao">
            Calcular Regulação
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

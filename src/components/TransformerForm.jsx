import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import CircuitResult from "./Result";

const TransformerForm = () => {
  const [formValues, setFormValues] = useState({
    tensionType: "Alta",
    transformerType: "T",
    Pca: "50",
    Vca: "230",
    Ica: "2.1",
    transformerImage: "",
    Icc: "6",
    Vcc: "47",
    Pcc: "160",
    VTransBaixa: "230",
    VTransAlta: "2300",
    Pap: "15000",
    Fp: "1",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let transformerImage = "";
    if (formValues.tensionType === "Alta") {
      switch (formValues.transformerType) {
        case "T":
          transformerImage = "T-Primario.png";
          break;
        case "L":
          transformerImage = "L-Primario.png";
          break;
        case "SERIE":
          transformerImage = "SERIE-Primario.png";
          break;
        default:
          transformerImage = "SERIE-Primario.png";
          break;
      }
    } else {
      switch (formValues.transformerType) {
        case "T":
          transformerImage = "T-Secundario.png";
          break;
        case "L":
          transformerImage = "L-Secundario.png";
          break;
        case "SERIE":
          transformerImage = "SERIE-Secundario.png";
          break;
        default:
          transformerImage = "";
          break;
      }
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      transformerImage,
    }));

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <CircuitResult
        tensionType={formValues.tensionType}
        transformerType={formValues.transformerType}
        Pca={formValues.Pca}
        Ica={formValues.Ica}
        Vca={formValues.Vca}
        transformerImage={formValues.transformerImage}
        VTransAlta={formValues.VTransAlta}
        VTransBaixa={formValues.VTransBaixa}
        Icc={formValues.Icc}
        Vcc={formValues.Vcc}
        Pcc={formValues.Pcc}
        Pap={formValues.Pap}
        Fp={formValues.Fp}
      />
    );
  }

  return (
    <Box sx={{ width: 900, mx: "auto", mt: 5 }}>
      <h1>Cálculo dos Parâmetros do Transformador</h1>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">
            Selecione o tipo de ensaio (CC ou CA):{" "}
          </FormLabel>
          <RadioGroup
            aria-label="tension"
            name="tensionType"
            value={formValues.tensionType}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="Alta"
              control={<Radio />}
              label="Ensaio de Curto-Circuito (Lado de alta tensão) - CC"
            />
            <FormControlLabel
              value="Baixa"
              control={<Radio />}
              label="Ensaio de Circuito Aberto (Lado de baixa tensão) - CA"
            />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="transformer-type-label">
            Selecionar Tipo de Circuito
          </InputLabel>
          <Select
            labelId="transformer-type-label"
            id="transformerType"
            name="transformerType"
            value={formValues.transformerType}
            onChange={handleChange}
          >
            <MenuItem value="T">Tipo T</MenuItem>
            <MenuItem value="L">Tipo L</MenuItem>
            <MenuItem value="SERIE">Tipo Em Série</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="VTransAlta"
              name="VTransAlta"
              label="Alta Tensão do Transformador"
              value={formValues.VTransAlta}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="VTransBaixa"
              name="VTransBaixa"
              label="Baixa Tensão do Transformador"
              value={formValues.VTransBaixa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Vca"
              name="Vca"
              label="Tensão no Circuito-Aberto (Vca)"
              value={formValues.Vca}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Ica"
              name="Ica"
              label="Corrente no Circuito-Aberto (Ica)"
              value={formValues.Ica}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Pca"
              name="Pca"
              label="Potência no Circuito-Aberto (Pca)"
              value={formValues.Pca}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Vcc"
              name="Vcc"
              label="Tensão de Curto-Circuito (Vcc)"
              value={formValues.Vcc}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Icc"
              name="Icc"
              label="Corrente no Curto-Circuito (Icc)"
              value={formValues.Icc}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              margin="normal"
              id="Pcc"
              name="Pcc"
              label="Potência no Curto-Circuito (Pcc)"
              value={formValues.Pcc}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Pap"
              name="Pap"
              label="Potência aparente"
              value={formValues.Pap}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Fp"
              name="Fp"
              label="Fator de potência"
              value={formValues.Fp}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "#274e5e" }}
        >
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default TransformerForm;

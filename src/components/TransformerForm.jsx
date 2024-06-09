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
    tensionType: "baixa",
    transformerType: "",
    Pca: "",
    Vca: "",
    Ica: "",
    transformerImage: "",
    espiraPrimario: "",
    espiraSecundario: "",
    Icc: "",
    Vcc: "",
    Pcc: "",
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
        espiraPrimario={formValues.espiraPrimario}
        espiraSecundario={formValues.espiraSecundario}
        Icc={formValues.Icc}
        Vcc={formValues.Vcc}
        Pcc={formValues.Pcc}
      />
    );
  }

  return (
    <Box sx={{ width: 600, mx: "auto", mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Selecione tipo de ensaio: </FormLabel>
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
              label="Ensaio de curto-Circuito(Lado de alta tensão)"
            />
            <FormControlLabel
              value="Baixa"
              control={<Radio />}
              label="Ensaio de circuito-aberto(Lado de baixa tensão)"
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
              id="Vca"
              name="Vca"
              label="Tensão do Transformador"
              value={formValues.Vca}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Ica"
              name="Ica"
              label="Corrente do Transformador"
              value={formValues.Ica}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Icc"
              name="Icc"
              label="Corrente de Curto-Circuito (Icc)"
              value={formValues.Icc}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Pca"
              name="Pca"
              label="Potência do Transformador"
              value={formValues.Pca}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="Pcc"
              name="Pcc"
              label="Potência de Curto-Circuito (Pcc)"
              value={formValues.Pcc}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              name="espiraPrimario"
              id="espiraPrimario"
              label="Quantidade de espiras do lado primário"
              value={formValues.espiraPrimario}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              name="espiraSecundario"
              id="espiraSecundario"
              label="Quantidade de espiras do lado secundário"
              value={formValues.espiraSecundario}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default TransformerForm;

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
} from "@mui/material";

const TransformerForm = () => {
  const [formValues, setFormValues] = useState({
    tensionType: "baixa",
    transformerType: "",
    transformerPower: "",
    transformerVoltage: "",
    transformerCurrent: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    console.log("Form Submitted", formValues);
  };

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Selecione o Lado: </FormLabel>
          <RadioGroup
            aria-label="tension"
            name="tensionType"
            value={formValues.tensionType}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="baixa"
              control={<Radio />}
              label="Baixa Tensão"
            />
            <FormControlLabel
              value="alta"
              control={<Radio />}
              label="Alta Tensão"
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
        <TextField
          fullWidth
          margin="normal"
          id="transformerPower"
          name="transformerPower"
          label="Potência do Transformador"
          value={formValues.transformerPower}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="transformerVoltage"
          name="transformerVoltage"
          label="Tensão do Transformador"
          value={formValues.transformerVoltage}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="transformerCurrent"
          name="transformerCurrent"
          label="Corrente do Transformador"
          value={formValues.transformerCurrent}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default TransformerForm;

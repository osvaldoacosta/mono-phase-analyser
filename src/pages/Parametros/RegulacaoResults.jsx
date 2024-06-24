import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Phasor from './Phasor'; // Importe o novo componente

const RegulacaoResults = () => {
  const location = useLocation();
  const { results, formValues } = location.state;

  const [regulationPercentage, setRegulationPercentage] = useState(0);

  useEffect(() => {
    if (results) {
      const { voltageNoLoad, voltageLoad } = formValues;
      const Vsecc_vazio = parseFloat(voltageNoLoad);
      const Vsecc_plena_carga = parseFloat(voltageLoad);

      // Calculating percentage voltage regulation
      const percentageRegulation = ((Vsecc_vazio - Vsecc_plena_carga) / Vsecc_plena_carga) * 100;
      setRegulationPercentage(percentageRegulation.toFixed(2));
    }
  }, [results, formValues]);

  // Dados do diagrama fasorial
  const vectors = [
    { name: 'Vazio', intensity: parseFloat(formValues.voltageNoLoad), angle: 0 },
    { name: 'Plena Carga', intensity: parseFloat(formValues.voltageLoad), angle: 180 }
  ];

  const independentVectors = [];
  const expressaoVpSobreA = `${regulationPercentage}%`;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resultado da Regulação de Tensão
      </Typography>
      <Typography variant="h6" gutterBottom>
        Regulação de Tensão: {regulationPercentage}%
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Gráfico da Regulação de Tensão
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={[{ name: 'Vazio', value: parseFloat(formValues.voltageNoLoad) }, { name: 'Plena Carga', value: parseFloat(formValues.voltageLoad) }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: '100%' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Diagrama Fasorial
            </Typography>
            <Phasor
              vectors={vectors}
              independentVectors={independentVectors}
              expressaoVpSobreA={expressaoVpSobreA}
            />
            </Grid>
          </Box>
        </Grid>
        </Grid>
    </Box>
  );
};

export default RegulacaoResults;



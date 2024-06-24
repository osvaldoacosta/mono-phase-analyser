import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import './ParametrosResults.css';

function ParametrosResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, formValues } = location.state || {};
  let transformerImage = '';

  if (formValues.circuitType === 'T') {
    if (formValues.referredTo === 'primário') {
      transformerImage = "T-Primario.png";
    } else if (formValues.referredTo === 'secundário') {
      transformerImage = "T-Secundario.png";
    }
  } else if (formValues.circuitType === 'L') {
    if (formValues.referredTo === 'primário') {
      transformerImage = "L-Primario.png";
    } else if (formValues.referredTo === 'secundário') {
      transformerImage = "L-Secundario.png";
    }
  } else if (formValues.circuitType === 'Série') {
    transformerImage = "SERIE.png";
  }

  const goBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados dos Parâmetros do Transformador
        </Typography>
        {results ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {transformerImage && (
                <img src={`${transformerImage}`} alt="Tipo de Transformador" style={{ width: '100%', height: 'auto' }} />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={2}>
                <Typography variant="h6" component="h2">Resultados</Typography>
                <p>Zcc: {results.Zcc} Ω</p>
                <p>Req: {results.Req} Ω</p>
                <p>Xeq: {results.Xeq} Ω</p>
                <p>Rc: {results.Rc} Ω</p>
                <p>Zφ: {results.Zphi} Ω</p>
                <p>Xm: {results.Xm} Ω</p>
                <p>Rc' (Referido ao Primário): {results.RcPrime} kΩ</p>
                <p>Xm' (Referido ao Primário): {results.XmPrime} kΩ</p>
                <p>Iφ' (Referido ao Primário): {results.IphiPrime} A</p>
                <p>Ic: {results.Ic} mA</p>
                <p>Im: {results.Im} mA</p>
                {formValues.circuitType === 'T' && (
                  <>
                    <p>Rp: {results.Rp} Ω</p>
                    <p>Xp: {results.Xp} Ω</p>
                    <p>Rs: {results.Rs} Ω</p>
                    <p>Xs: {results.Xs} Ω</p>
                  </>
                )}
                {formValues.circuitType === 'L' && (
                  <>
                    <p>Req Total: {results.ReqTotal} Ω</p>
                    <p>Xeq Total: {results.XeqTotal} Ω</p>
                  </>
                )}
                {formValues.circuitType === 'Série' && (
                  <>
                    <p>Req Total: {results.ReqTotal} Ω</p>
                    <p>Xeq Total: {results.XeqTotal} Ω</p>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box mt={2}>
            <Typography variant="body1">
              Nenhum resultado disponível. Por favor, volte e preencha o formulário novamente.
            </Typography>
          </Box>
        )}
        <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "#274e5e" }}
          onClick={goBack} 
        >
          Voltar
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ParametrosResults;

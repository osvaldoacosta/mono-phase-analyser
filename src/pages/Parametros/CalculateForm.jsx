import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import './Parametros.css';

const CalculateForm = () => {
  const [values, setValues] = useState({
    Va: '',
    Ia: '',
    Pa: '',
    Vb: '',
    Ib: '',
    Pb: '',
    N1: '',
    N2: '',
    setAType: '',
    setASide: '',
    setBType: '',
    setBSide: '',
    circuitType: '',
    referredTo: '',
    voltageNoLoad: '',
    voltageLoad: '',
    voltagePrimary: '',
    powerFactor: ''
  });

  const [regulationResult, setRegulationResult] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateParameters();
  };

  const calculateParameters = () => {
    const { Va, Ia, Pa, Vb, Ib, Pb, N1, N2, setAType, setASide, setBType, setBSide, circuitType, referredTo } = values;

    const VaNum = parseFloat(Va);
    const IaNum = parseFloat(Ia);
    const PaNum = parseFloat(Pa);
    const VbNum = parseFloat(Vb);
    const IbNum = parseFloat(Ib);
    const PbNum = parseFloat(Pb);
    const N1Num = parseFloat(N1);
    const N2Num = parseFloat(N2);

    let Zcc, Req, Xeq, Rc, Xm, RcPrime, XmPrime, IphiPrime, Ic, Im, Zphi, Rp, Xp, Rs, Xs, a, aSquared, ReqTotal, XeqTotal;

    a = N1Num / N2Num;
    aSquared = a * a;

    if (setAType === 'curto-circuito' && setASide === 'baixo' && setBType === 'circuito-aberto' && setBSide === 'alto') {
      Zcc = VaNum / IaNum;
      Req = PaNum / (IaNum * IaNum);
      Xeq = Math.sqrt(Zcc * Zcc - Req * Req);

      Rc = VbNum * VbNum / PbNum;
      Zphi = VbNum / IbNum;
      Xm = Math.sqrt(Zphi * Zphi - Rc * Rc);

      RcPrime = Rc * aSquared;
      XmPrime = Xm * aSquared;

      IphiPrime = IbNum / a;
      Ic = VbNum / RcPrime;
      Im = VbNum / XmPrime;
    } else if (setAType === 'circuito-aberto' && setASide === 'baixo' && setBType === 'curto-circuito' && setBSide === 'alto') {
      Rc = VaNum * VaNum / PaNum;
      Zphi = VaNum / IaNum;
      Xm = Math.sqrt(Zphi * Zphi - Rc * Rc);

      RcPrime = Rc * aSquared;
      XmPrime = Xm * aSquared;

      IphiPrime = IaNum / a;
      Ic = VaNum / RcPrime;
      Im = VaNum / XmPrime;

      Zcc = VbNum / IbNum;
      Req = PbNum / (IbNum * IbNum);
      Xeq = Math.sqrt(Zcc * Zcc - Req * Req);
    } else if (setAType === 'curto-circuito' && setASide === 'alto' && setBType === 'circuito-aberto' && setBSide === 'baixo') {
      Zcc = VaNum / IaNum;
      Req = PaNum / (IaNum * IaNum);
      Xeq = Math.sqrt(Zcc * Zcc - Req * Req);

      Rc = VbNum * VbNum / PbNum;
      Zphi = VbNum / IbNum;
      Xm = Math.sqrt(Zphi * Zphi - Rc * Rc);
    } else if (setAType === 'circuito-aberto' && setASide === 'alto' && setBType === 'curto-circuito' && setBSide === 'baixo') {
      Rc = VaNum * VaNum / PaNum;
      Zphi = VaNum / IaNum;
      Xm = Math.sqrt(Zphi * Zphi - Rc * Rc);

      RcPrime = Rc * Math.pow(N1Num / N2Num, 2);
      XmPrime = Xm * Math.pow(N1Num / N2Num, 2);

      IphiPrime = IaNum * (N2Num / N1Num);
      Ic = VaNum / RcPrime;
      Im = VaNum / XmPrime;

      Zcc = VbNum / IbNum;
      Req = PbNum / (IbNum * IbNum);
      Xeq = Math.sqrt(Zcc * Zcc - Req * Req);
    }

    if (circuitType === 'T') {
      if (referredTo === 'primário') {
        Rp = Req / aSquared;
        Xp = Xeq / aSquared;
        Rs = Req - Rp;
        Xs = Xeq - Xp;
      } else if (referredTo === 'secundário') {
        Rp = Req * aSquared;
        Xp = Xeq * aSquared;
        Rs = Req - Rp;
        Xs = Xeq - Xp;
      }
    } else if (circuitType === 'L') {
      if (referredTo === 'primário') {
        Rp = Req / aSquared;
        Xp = Xeq / aSquared;
        ReqTotal = Rp + Rs;
        XeqTotal = Xp + Xs;
      } else if (referredTo === 'secundário') {
        Rp = Req * aSquared;
        Xp = Xeq * aSquared;
        ReqTotal = Rp + (Req - Rp);
        XeqTotal = Xp + (Xeq - Xp);
      }
    } else if (circuitType === 'Série') {
      ReqTotal = Req + RcPrime / Math.pow(N1 / N2, 2);
      XeqTotal = Xeq + XmPrime / Math.pow(N1 / N2, 2);
    }

    const results = {
      Zcc: Zcc ? Zcc.toFixed(2) : null,
      Req: Req ? Req.toFixed(2) : null,
      Xeq: Xeq ? Xeq.toFixed(2) : null,
      Rc: Rc ? Rc.toFixed(2) : null,
      Xm: Xm ? Xm.toFixed(2) : null,
      RcPrime: RcPrime ? RcPrime.toFixed(2) : null,
      XmPrime: XmPrime ? XmPrime.toFixed(2) : null,
      IphiPrime: IphiPrime ? IphiPrime.toFixed(2) : null,
      Ic: Ic ? (Ic * 1000).toFixed(2) : null,
      Im: Im ? (Im * 1000).toFixed(2) : null,
      Rp: Rp ? Rp.toFixed(2) : null,
      Xp: Xp ? Xp.toFixed(2) : null,
      Rs: Rs ? Rs.toFixed(2) : null,
      Xs: Xs ? Xs.toFixed(2) : null,
      ReqTotal: ReqTotal ? ReqTotal.toFixed(2) : null,
      XeqTotal: XeqTotal ? XeqTotal.toFixed(2) : null,
    };

    // Após calcular os parâmetros, calcular a regulação de tensão
    if (values.voltageNoLoad && values.voltageLoad) {
      const Vsecc_vazio = parseFloat(values.voltageNoLoad);
      const Vsecc_plena_carga = parseFloat(values.voltageLoad);

      // Calculando a regulação de tensão percentual
      const percentageRegulation = ((Vsecc_vazio - Vsecc_plena_carga) / Vsecc_plena_carga) * 100;

      // Definindo o resultado da regulação
      setRegulationResult(`A regulação de tensão é ${percentageRegulation.toFixed(2)}%.`);
    } else {
      setRegulationResult('Por favor, preencha todos os campos para calcular a regulação de tensão.');
    }

    // Definindo os resultados no estado
    navigate('/regulacao-results', { state: { results: { ...results, regulationResult }, formValues: values } });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transformador Monofásico - Calculadora de Regulação de Tensão e Diagrama
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" gutterBottom>
            Dados do Transformador
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Número de Espiras Primário (N1)"
            name="N1"
            value={values.N1}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Número de Espiras Secundário (N2)"
            name="N2"
            value={values.N2}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Circuito Equivalente</InputLabel>
            <Select name="circuitType" value={values.circuitType} onChange={handleChange}>
              <MenuItem value=""><em>Selecione</em></MenuItem>
              <MenuItem value="T">T - Circuito em T</MenuItem>
              <MenuItem value="L">L - Circuito em L</MenuItem>
              <MenuItem value="Série">Série - Circuito em Série</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Referido a (para cálculos de circuito equivalente)</InputLabel>
            <Select name="referredTo" value={values.referredTo} onChange={handleChange}>
              <MenuItem value=""><em>Selecione</em></MenuItem>
              <MenuItem value="primário">Primário</MenuItem>
              <MenuItem value="secundário">Secundário</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box sx={{ width: '48%' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Conjunto de Dados A
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Ensaio</InputLabel>
                <Select name="setAType" value={values.setAType} onChange={handleChange}>
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  <MenuItem value="curto-circuito">Curto-Circuito</MenuItem>
                  <MenuItem value="circuito-aberto">Circuito Aberto</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Lado do Ensaio</InputLabel>
                <Select name="setASide" value={values.setASide} onChange={handleChange}>
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  <MenuItem value="baixo">Baixa Tensão</MenuItem>
                  <MenuItem value="alto">Alta Tensão</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Va (Tensão A) [V]"
                name="Va"
                type="number"
                value={values.Va}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ia (Corrente A) [A]"
                name="Ia"
                type="number"
                value={values.Ia}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Pa (Potência A) [W]"
                name="Pa"
                type="number"
                value={values.Pa}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ width: '48%' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Conjunto de Dados B
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Ensaio</InputLabel>
                <Select name="setBType" value={values.setBType} onChange={handleChange}>
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  <MenuItem value="curto-circuito">Curto-Circuito</MenuItem>
                  <MenuItem value="circuito-aberto">Circuito Aberto</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Lado do Ensaio</InputLabel>
                <Select name="setBSide" value={values.setBSide} onChange={handleChange}>
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  <MenuItem value="baixo">Baixa Tensão</MenuItem>
                  <MenuItem value="alto">Alta Tensão</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Vb (Tensão B) [V]"
                name="Vb"
                type="number"
                value={values.Vb}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ib (Corrente B) [A]"
                name="Ib"
                type="number"
                value={values.Ib}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Pb (Potência B) [W]"
                name="Pb"
                type="number"
                value={values.Pb}
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
            Dados para Regulação de Tensão
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Tensão no secundário sem carga [V]"
            name="voltageNoLoad"
            type="number"
            value={values.voltageNoLoad}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tensão no secundário com plena carga [V]"
            name="voltageLoad"
            type="number"
            value={values.voltageLoad}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tensão no primário [V]"
            name="voltagePrimary"
            type="number"
            value={values.voltagePrimary}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fator de potência (cos φ)"
            name="powerFactor"
            type="number"
            step="0.01"
            min="-1"
            max="1"
            value={values.powerFactor}
            onChange={handleChange}
          />
  
            <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#274e5e" }}
            >
              Calcular
            </Button>
            </Box>
          </form>
  
          {regulationResult && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Resultado da Regulação de Tensão
              </Typography>
              <Typography>{regulationResult}</Typography>
            </Box>
          )}
        </Box>
      </Container>
    );
  };
  
  export default CalculateForm;
  

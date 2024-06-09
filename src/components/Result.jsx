import React from "react";
import { Box, Typography } from "@mui/material";

const CircuitResult = ({
  tensionType,
  transformerType,
  Pca,
  Vca,
  Ica,
  transformerImage,
  espiraPrimario,
  espiraSecundario,
  Icc,
  Pcc,
  Vcc,
}) => {
  const a = espiraPrimario / espiraSecundario;
  const Zca = calcularImpedanciaCc(Vcc, Icc);
  const RcCc = calcularResistenciaCc(Pcc, Icc, transformerType == "Alta", a);
  const Xca = calcularReatanciaCc(Zca, RcCc);

  const Zphi = calcularImpedanciaMagnetizacao(Vca, Ica);
  const RcMag = calcularResistenciaMagnetizacao(Vca, Pca);
  const Xm = calcularReatanciaMagnetizacao(Zphi, RcMag);

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: 5 }}>
        <Box sx={{ flex: "0 0 auto" }}>
          <img
            src={transformerImage}
            alt="Circuit Diagram"
            style={{ width: "100%", height: "auto", maxWidth: 500 }}
          />
        </Box>
        <Box sx={{ flex: "1 1 auto", mr: 50, mt: 5 }}>
          <Typography sx={{ color: "black" }}>Tensão: {tensionType}</Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Tipo: {transformerType}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Potência: {Pca}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>Tensão: {Vca}</Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Corrente: {Ica}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Espiras do primário: {espiraPrimario}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Espiras do secundário: {espiraSecundario}
          </Typography>
        </Box>
      </Box>
      <div>
        <li>{"Zcc: " + Zca}</li>
        <li>{"Req: " + RcCc}</li>
        <li>{"Xcc: " + Xca}</li>
        <li>{"Zphi: " + Zphi}</li>
        <li>{"Xm: " + Xm}</li>
        <li>{"Rc: " + RcMag}</li>
      </div>
    </div>
  );
};

function calcularImpedanciaCc(Vcc, Icc) {
  return Vcc / Icc;
}

// Função para calcular a resistência associada ao circuito de curto-circuito (Rc)
function calcularResistenciaCc(Pcc, Icc, isCC, a) {
  const rc = Pcc / (Icc * Icc);
  if (isCC) {
    return rc;
  }
  return rc / (a * a);
}

// Função para calcular a reatância do circuito de curto-circuito (Xca)
function calcularReatanciaCc(Zca, Rca) {
  return Math.sqrt(Zca * Zca - Rca * Rca);
}

// Função para calcular a impedância do ramo de magnetização (Zphi)
function calcularImpedanciaMagnetizacao(Vv, Iv) {
  return Vv / Iv;
}

// Função para calcular a resistência do ramo de magnetização (Rc)
function calcularResistenciaMagnetizacao(Vv, Pv) {
  return (Vv * Vv) / Pv;
}

// Função para calcular a reatância de magnetização (Xm)
function calcularReatanciaMagnetizacao(Zphi, Rc) {
  const d1 = 1 / Math.abs(Zphi);
  const d2 = 1 / Rc;

  const bosta1 = d1 * d1 - d2 * d2;
  const bosta2 = 1 / Math.sqrt(bosta1);
  return bosta2;
}
export default CircuitResult;

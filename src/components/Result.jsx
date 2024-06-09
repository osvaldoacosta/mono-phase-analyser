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
  /*
  if (transformerType === "Baixa"){
    const Zca = calcularImpedanciaCa(Vca, Ica, Pca);
    const RcCa = calcularResistenciaCa(Pca, Ica);
    const Xca = calcularReatanciaCa(Zca, RcCa);

    const ZphiCa = calcularImpedanciaMagnetizacaoCa(Vca, Ica); //checar
    const RaMag = calcularResistenciaMagnetizacaoCa(RcCa); //checar
    const XmCa = calcularReatanciaCa(Vca, Pca);
  }else{
    const a = espiraPrimario / espiraSecundario;
    const Zcc = calcularImpedanciaCc(Vcc, Icc);
    const RcCc = calcularResistenciaCc(Pcc, Icc, transformerType === "Alta", a);
    const Xcc = calcularReatanciaCc(Zcc, RcCc);

    const Zphi = calcularImpedanciaMagnetizacao(Vca, Ica);
    const RcMag = calcularResistenciaMagnetizacao(Vca, Pca);
    const Xm = calcularReatanciaMagnetizacao(Zphi, RcMag);
  }
  */

    const a = espiraPrimario / espiraSecundario;
    const Zcc = calcularImpedanciaCc(Vcc, Icc);
    const RcCc = calcularResistenciaCc(Pcc, Icc, transformerType === "Alta", a);
    const Xcc = calcularReatanciaCc(Zcc, RcCc);

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
        <li>{"Zcc: " + Zcc}</li>
        <li>{"Req: " + RcCc}</li>
        <li>{"Xcc: " + Xcc}</li>
        <li>{"Zphi: " + Zphi}</li>
        <li>{"Xm: " + Xm}</li>
        <li>{"Rc: " + RcMag}</li>
      </div>
    </div>
  );
};

// Função para calcular a impedância no ensaio cc
function calcularImpedanciaCc(Vcc, Icc) {
  return Vcc / Icc;
}

// Função para calcular a impedância no ensaio ca
/*
function calcularImpedanciaCa(Vca, Ica, Pca){
  const Zca = Math.acos(Psa / (Vca * Ica))
  return Zca
}*/

// Função para calcular a resistência associada ao circuito de curto-circuito (Rc)
function calcularResistenciaCc(Pcc, Icc, isCC, a) {
  const rc = Pcc / (Icc * Icc);
  if (isCC) {
    return rc;
  }
  return rc / (a * a);
}

function calcularResistenciaCa(){

}

// Função para calcular a reatância do circuito de curto-circuito (Xca)
function calcularReatanciaCc(Zca, Rca) {
  return Math.sqrt(Zca * Zca - Rca * Rca);
}

function calcularReatanciaCa(){

}

// Função para calcular a impedância do ramo de magnetização (Zphi)
function calcularImpedanciaMagnetizacao(Vv, Iv) {
  return Vv / Iv;
}

function calcularImpedanciaMagnetizacaoCa(Vca, Ica){
  const zPhi = Vca/Ica
  return zPhi;
}

// Função para calcular a resistência do ramo de magnetização (Rc)
function calcularResistenciaMagnetizacao(Vv, Pv) {
  return (Vv * Vv) / Pv;
}

function calcularResistenciaMagnetizacaoCa(){

}

// Função para calcular a reatância de magnetização (Xm)
function calcularReatanciaMagnetizacao(Zphi, Rc) {
  const d1 = 1 / Math.abs(Zphi);
  const d2 = 1 / Rc;

  const zr = d1 * d1 - d2 * d2;
  const resultado = 1 / Math.sqrt(zr);
  return resultado;
}

function calcularReatanciaMagnetizacaoCa(Vca, Pca){
  const reatanciaMagCa = (Vca * Vca)/Pca
  return reatanciaMagCa;
}

export default CircuitResult;

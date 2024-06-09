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
  let Zca, RcCa, Xca, ZphiCa, RaMag, XmCa, Zcc, RcCc, Xcc, Zphi, RcMag, Xm;

  if (tensionType === "Baixa") {
    Zca = calcularImpedanciaCa(Vca, Ica);
    RcCa = calcularResistenciaCa(Vca, Pca);
    Xca = calcularReatanciaCa(Zca, RcCa);

    ZphiCa = calcularImpedanciaMagnetizacaoCa(Vca, Ica);
    RaMag = calcularResistenciaMagnetizacaoCa(Vca, Pca);
    XmCa = calcularReatanciaMagnetizacaoCa(Vca, Ica, RcCa);
  } else {
    const a = espiraPrimario / espiraSecundario;
    Zcc = calcularImpedanciaCc(Vcc, Icc);
    RcCc = calcularResistenciaCc(Pcc, Icc, a);
    Xcc = calcularReatanciaCc(Zcc, RcCc);

    Zphi = calcularImpedanciaMagnetizacao(Vca, Ica);
    RcMag = calcularResistenciaMagnetizacao(Vca, Pca);
    Xm = calcularReatanciaMagnetizacao(Zphi, RcMag);
  }
  
  return (
    <div>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 5 }}>
      <h1>Parâmetros do Transformador</h1>
      <Box sx={{ flex: "0 0 auto" }}>
        <img
          src={transformerImage}
          alt="Diagrama do Circuito"
          style={{ width: "100%", height: "auto", maxWidth: 500, margin: "0 auto" }}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Resultados:</Typography>
        {tensionType === "Baixa" && (
          <div>
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
            <Typography>Zca: {Zca}</Typography>
            <Typography>RcCa: {RcCa}</Typography>
            <Typography>Xca: {Xca}</Typography>
            <Typography>ZphiCa: {ZphiCa}</Typography>
            <Typography>RaMag: {RaMag}</Typography>
            <Typography>XmCa: {XmCa}</Typography>
          </div>
        )}
        {tensionType !== "Baixa" && (
          <div>
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
            <Typography>Zcc: {Zcc}</Typography>
            <Typography>RcCc: {RcCc}</Typography>
            <Typography>Xcc: {Xcc}</Typography>
            <Typography>Zphi: {Zphi}</Typography>
            <Typography>RcMag: {RcMag}</Typography>
            <Typography>Xm: {Xm}</Typography>
          </div>
        )}
    </Box>
      </Box>
    </div>
  );
};

// Função para calcular a impedância no ensaio cc
function calcularImpedanciaCc(Vcc, Icc) {
  return Vcc / Icc;
}

// Função para calcular a impedância no ensaio ca
function calcularImpedanciaCa(Vca, Ica){
  //Zca = Rp + jXp + Zphi ou que za é aproxidamente zphi
  const Zphi = Vca/Ica
  return Zphi;
}

// Função para calcular a resistência associada ao circuito de curto-circuito (Rc)
function calcularResistenciaCc(Pcc, Icc, a) {
  const rc = Pcc / (Icc * Icc);
  return rc / (a * a);
}

function calcularResistenciaCa(Vca, Pca){
  const rca = (Vca*Vca)/Pca
  return rca
}

// Função para calcular a reatância do circuito de curto-circuito (Xca)
function calcularReatanciaCc(Zca, Rca) {
  return Math.sqrt(Zca * Zca - Rca * Rca);
}

//revisar fórmula
function calcularReatanciaCa(){
  //xca = ? ou xm = 2pifl 
  const Xca = 0
  return Xca 
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

//revisar fórmula
function calcularResistenciaMagnetizacaoCa(Vca, Pca){
  const rc = (Vca*Vca)/Pca
  return rc
}

// Função para calcular a reatância de magnetização (Xm)
function calcularReatanciaMagnetizacao(Zphi, Rc) {
  const d1 = 1 / Math.abs(Zphi);
  const d2 = 1 / Rc;

  const zr = d1 * d1 - d2 * d2;
  const Xm = 1 / Math.sqrt(zr);
  return Xm;
}

function calcularReatanciaMagnetizacaoCa(Vca, Ica, RcCa){
  const reatanciaMagCa = Vca/(Math.sqrt(Ica*Ica-(Vca/RcCa)*(Vca/RcCa)))
  return reatanciaMagCa;
}

export default CircuitResult;

import React from "react";
import { Box, Typography } from "@mui/material";
import PhasorialDiagram from "./PhasorialDiagram";
import { complex, i, evaluate, add, multiply, abs, arg } from "mathjs";
const CircuitResult = ({
  tensionType,
  transformerType,
  Pca,
  Vca,
  Ica,
  transformerImage,
  VTransAlta,
  VTransBaixa,
  Icc,
  Pcc,
  Vcc,
  Pap,
}) => {
  let Zca,
    RcCa,
    Xca,
    ZphiCa,
    RaMag,
    XmCa,
    Zcc,
    RcCc,
    Xcc,
    Zphi,
    RcMag,
    Xm,
    Xeq,
    Req,
    Rcp,
    Xmp,
    Vpsobrea;

  if (tensionType === "Baixa") {
    Zca = calcularImpedanciaCa(Vca, Ica);
    RcCa = calcularResistenciaCa(Vca, Pca);
    Xca = calcularReatanciaCa(Zca, RcCa);

    ZphiCa = calcularImpedanciaMagnetizacaoCa(Vca, Ica);
    RaMag = calcularResistenciaMagnetizacaoCa(Vca, Pca);
    XmCa = calcularReatanciaMagnetizacaoCa(Vca, Ica, RcCa);
  } else {
    const a = VTransAlta / VTransBaixa;
    Zcc = calcularImpedanciaCc(Vcc, Icc);
    RcCc = calcularResistenciaCc(Pcc, Icc, a);
    Xcc = calcularReatanciaCc(Zcc, RcCc);

    Zphi = calcularImpedanciaMagnetizacao(Vca, Ica);
    RcMag = calcularResistenciaMagnetizacao(Vca, Pca);
    Xm = calcularReatanciaMagnetizacao(Zphi, RcMag);
    const Thetacc = (Math.acos(Pcc / (Icc * Vcc)) * 180) / Math.PI;
    const rectangularForm = polarToRectangular(Zcc, Thetacc);

    Req = rectangularForm.real;
    Xeq = rectangularForm.imaginary;

    Rcp = a * a * RcMag;
    Xmp = Xm * a * a;

    const Is = Pap / Vca;

    const Rs = Req / Math.pow(a, 2); // Resistancia
    const Xs = Xeq / Math.pow(a, 2); //Reatancia

    const Vrs = complex(Rs * Is, 0); // Voltage drop across resistance
    const Vxs = complex(0, Xs * Is); // Voltage drop across reactance

    // Initial voltage in complex form (polar to rectangular)
    const VpRect = complex(Vca, 0);

    // Sum the components
    const VsumRect = add(VpRect, Vrs);
    const VfinalRect = add(VsumRect, Vxs);

    // Convert the final voltage back to polar form
    const VfinalPolar = abs(VfinalRect);
    const VfinalAngle = arg(VfinalRect) * (180 / Math.PI); // Convert radians to degrees

    console.log(Xm);
    Vpsobrea = `Vp/a = ${VfinalPolar} ∠ ${VfinalAngle.toFixed(2)}° V`;
  }

  const vectors = [
    {
      angle: 0,
      intensity: VTransBaixa,
      name: "Vs",
    },
    { angle: 90, intensity: Xca * Ica, name: "jXeqIs" },
    { angle: 0, intensity: RcCa * Ica, name: "ReqIs" },
  ];

  return (
    <div>
      <h1>Parâmetros do Transformador</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Box sx={{ flex: "0 0 auto" }}>
          <img
            src={transformerImage}
            alt="Diagrama do Circuito"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 500,
              margin: "0 auto",
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Resultados:</Typography>
          {tensionType === "Baixa" && (
            <div>
              <Typography sx={{ color: "black" }}>
                Tensão: {tensionType}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Tipo: {transformerType}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Potência: {Pca}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Tensão: {Vca}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Corrente: {Ica}
              </Typography>
              <ul>
                <li>Zca: {Zca}</li>
                <li>RcCa: {RcCa}</li>
                <li>Xca: {Xca}</li>
                <li>ZphiCa: {ZphiCa}</li>
                <li>RaMag: {RaMag}</li>
                <li>XmCa: {XmCa}</li>
              </ul>
              <div>
                <h1>Diagrama fasorial</h1>
                <PhasorialDiagram vectors={vectors} />
              </div>
            </div>
          )}
          {tensionType !== "Baixa" && (
            <div>
              <Typography sx={{ color: "black" }}>
                Tensão: {tensionType}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Tipo: {transformerType}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Potência: {Pca}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Tensão: {Vca}
              </Typography>
              <Typography sx={{ mt: 1, color: "black" }}>
                Corrente: {Ica}
              </Typography>
              <ul>
                <li>Zcc: {Zcc}</li>
                <li>RcCc: {RcCc}</li>
                <li>Xcc: {Xcc}</li>
                <li>Zphi: {Zphi}</li>
                <li>RcMag: {RcMag}</li>
                <li>Xm: {Xm}</li>
                <li>Req: {Req}</li>
                <li>Xeq: {Xeq}</li>
                <li>Rcp: {Rcp}</li>
                <li>Xmp: {Xmp}</li>
                <li>Vp/a: {Vpsobrea}</li>
              </ul>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

function polarToRectangular(magnitude, angleDegrees) {
  const angleRadians = angleDegrees * (Math.PI / 180); // Convertendo o ângulo para radianos
  const realPart = magnitude * Math.cos(angleRadians);
  const imaginaryPart = magnitude * Math.sin(angleRadians);
  return {
    real: realPart,
    imaginary: imaginaryPart,
  };
}

// Função para calcular a impedância no ensaio cc
function calcularImpedanciaCc(Vcc, Icc) {
  return Vcc / Icc;
}

// Função para calcular a impedância no ensaio ca
function calcularImpedanciaCa(Vca, Ica) {
  //Zca = Rp + jXp + Zphi ou que za é aproxidamente zphi
  const Zphi = Vca / Ica;
  return Zphi;
}

// Função para calcular a resistência associada ao circuito de curto-circuito (Rc)
function calcularResistenciaCc(Pcc, Icc, a) {
  const rc = Pcc / (Icc * Icc);
  return rc / (a * a);
}

function calcularResistenciaCa(Vca, Pca) {
  const rca = (Vca * Vca) / Pca;
  return rca;
}

// Função para calcular a reatância do circuito de curto-circuito (Xca)
function calcularReatanciaCc(Zca, Rca) {
  return Math.sqrt(Zca * Zca - Rca * Rca);
}

//revisar fórmula
function calcularReatanciaCa() {
  //xca = ? ou xm = 2pifl
  const Xca = 0;
  return Xca;
}

// Função para calcular a impedância do ramo de magnetização (Zphi)
function calcularImpedanciaMagnetizacao(Vv, Iv) {
  return Vv / Iv;
}

function calcularImpedanciaMagnetizacaoCa(Vca, Ica) {
  const zPhi = Vca / Ica;
  return zPhi;
}

// Função para calcular a resistência do ramo de magnetização (Rc)
function calcularResistenciaMagnetizacao(Vv, Pv) {
  return (Vv * Vv) / Pv;
}

//revisar fórmula
function calcularResistenciaMagnetizacaoCa(Vca, Pca) {
  const rc = (Vca * Vca) / Pca;
  return rc;
}

// Função para calcular a reatância de magnetização (Xm)
function calcularReatanciaMagnetizacao(Zphi, Rc) {
  const d1 = 1 / Math.abs(Zphi);
  const d2 = 1 / Rc;

  const zr = d1 * d1 - d2 * d2;
  const Xm = 1 / Math.sqrt(zr);
  return Xm;
}

function calcularReatanciaMagnetizacaoCa(Vca, Ica, RcCa) {
  const reatanciaMagCa =
    Vca / Math.sqrt(Ica * Ica - (Vca / RcCa) * (Vca / RcCa));
  return reatanciaMagCa;
}

export default CircuitResult;

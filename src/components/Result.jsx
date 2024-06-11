import React from "react";
import { Box, Typography } from "@mui/material";
import PhasorialDiagram from "./PhasorialDiagram";
import { complex, evaluate, add, abs, arg } from "mathjs";
import VoltageRegulationChart from "./VoltageRegulationChart";

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
  Vcc,
  Pcc,
  Pap,
  Fp,
}) => {
  let Zca, RcCa, Xca, RaMag, XmCa;
  let Zcc,
    RcCc,
    Xcc,
    RcMag,
    Xm,
    Xeq,
    Req,
    Rcp,
    Xmp,
    Vpsobrea,
    VfinalPolarTwo,
    vectorObjArr;

  const a = VTransAlta / VTransBaixa;
  Zcc = calcularImpedanciaCc(Vcc, Icc);
  RcCc = calcularResistenciaCc(Pcc, Icc, a);
  Xcc = calcularReatanciaCc(Zcc, RcCc);

  const Zphi = calcularImpedanciaMagnetizacao(Vca, Ica);
  RcMag = calcularResistenciaMagnetizacao(Vca, Pca);
  Xm = calcularReatanciaMagnetizacao(Zphi, RcMag);
  const Thetacc = (Math.acos(Pcc / (Icc * Vcc)) * 180) / Math.PI;
  const rectangularForm = polarToRectangular(Zcc, Thetacc);

  Req = rectangularForm.real;
  Xeq = rectangularForm.imaginary;

  if (tensionType === "Baixa") {
    Rcp = RcMag;
    Xmp = Xm;
  } else {
    Rcp = a * a * RcMag;
    Xmp = Xm * a * a;
  }
  const Is = Pap / Vca;
  console.log("Fp:", Fp, "\nIs", Is);

  const Rs = Req / Math.pow(a, 2);
  const Xs = Xeq / Math.pow(a, 2);

  console.log("Fp:", Fp, "\nIs", Is, "\nRs:", Rs, "\nXs", Xs);

  let currentAngle = 0;
  if (Fp !== 1) {
    const fpAngle = Math.acos(Math.abs(Fp)) * (180 / Math.PI);
    currentAngle = Fp < 0 ? -fpAngle : fpAngle;
  }

  console.log("Fp:", Fp);
  console.log("Current Angle (degrees):", currentAngle);

  const Vrs = complex(
    Rs * Is * Math.cos(currentAngle * (Math.PI / 180)),
    Rs * Is * Math.sin(currentAngle * (Math.PI / 180)),
  );

  console.log(Vrs);

  const Vxs = complex(
    -Xs * Is * Math.sin(currentAngle * (Math.PI / 180)),
    Xs * Is * Math.cos(currentAngle * (Math.PI / 180)),
  );

  var VpRect = complex(Vca, 0);
  const VsumRect = add(VpRect, Vrs);
  console.log(VsumRect);
  const VfinalRect = add(VsumRect, Vxs);
  console.log(VfinalRect);

  const VfinalPolar = abs(VfinalRect);
  const VfinalAngle = arg(VfinalRect) * (180 / Math.PI);

  Vpsobrea = {
    polar: VfinalPolar,
    angle: VfinalAngle,
    representacao: `${VfinalPolar.toFixed(2)} ∠ ${VfinalAngle.toFixed(2)}° V`,
  };

  console.log(Vpsobrea);
  VfinalPolarTwo = abs(VfinalRect);

  const jXeqIs = complex(Xs * Is, currentAngle + 90);
  console.log(jXeqIs);

  const vectorObj = {
    Is: Is,
    FpAngle: currentAngle,
    Vrs: Vrs,
    jXeqIs: jXeqIs,
  };

  const vectors = [
    {
      angle: 0,
      intensity: VpRect.re,
      name: `Vs =${VpRect.re.toFixed(2)} ∠ 0° V`,
    },
    {
      angle: vectorObj.FpAngle,
      intensity: vectorObj.Vrs.re,
      name: `ReqIs =${vectorObj.Vrs.re.toFixed(2)} ∠ ${vectorObj.Vrs.im.toFixed(
        2,
      )}° V`,
    },
    {
      angle: vectorObj.jXeqIs.im,
      intensity: vectorObj.jXeqIs.re,
      name: `jXeqIs =${vectorObj.jXeqIs.re.toFixed(
        2,
      )} ∠ ${vectorObj.jXeqIs.im.toFixed(2)}° V`,
    },
  ];

  const independentVectors = [
    {
      angle: vectorObj.FpAngle,
      intensity: vectorObj.Is,
      name: `Is =${vectorObj.Is.toFixed(2)} ∠ ${vectorObj.FpAngle.toFixed(
        2,
      )}° A`,
    },
  ];

  vectorObjArr = { sumvec: vectors, singlevec: independentVectors };

  const regTensao = (((VfinalPolarTwo - Vca) / Vca) * 100).toFixed(2);

  return (
    <div>
      <h1>Parâmetros do Transformador</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Box sx={{ mb: 5 }}>
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
          <Typography sx={{ color: "black" }}>Tensão: {tensionType}</Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Tipo: {transformerType}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Tensão maior: {VTransAlta}
          </Typography>
          <Typography sx={{ mt: 1, color: "black" }}>
            Tensão menor: {VTransBaixa}
          </Typography>
          {tensionType === "Baixa" ? (
            <div>
              {transformerType === "L" && (
                <ul>
                  <li>Rc/a² = {Rcp.toFixed(2)} Ohm</li>
                  <li>jXm/a² = j{Xm.toFixed(2)} Ohm</li>
                  <li>Reqs = {Rs.toFixed(2)} Ohm</li>
                  <li>jXeqs = j{Xs.toFixed(2)} Ohm</li>
                  <li>Vp/a = {Vpsobrea.representacao}</li>
                  <li>{`Vs = ${VpRect.re.toFixed(2)} ∠ 0° V`}</li>
                  <li>Is = {Is.toFixed(2)} A</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}
              {transformerType === "SERIE" && (
                <ul>
                  <li>Reqs = {Req.toFixed(2)} Ohm</li>
                  <li>jXeqs = j{Xeq.toFixed(2)} Ohm</li>
                  <li>Vp/a = {Vpsobrea.representacao}</li>
                  <li>{`Vs = ${VpRect.re.toFixed(2)} ∠ 0° V`}</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}
              {transformerType === "T" && (
                <ul>
                  <li>Rp/a²= {(Req / (2 * a * a)).toFixed(2)} Ohm</li>
                  <li>jXp/a²= j{(Xeq / (2 * a * a)).toFixed(2)} Ohm</li>
                  <li>Rs= {(Req / 2).toFixed(2)} Ohm</li>
                  <li>jXs= j{(Xeq / 2).toFixed(2)} Ohm</li>

                  <li>Rc/a² = {Rcp.toFixed(2)} Ohm</li>
                  <li>jXm/a² = j{Xm.toFixed(2)} Ohm</li>
                  <li>Vp/a = {Vpsobrea.representacao}</li>
                  <li>{`Vs = ${VpRect.re.toFixed(2)} ∠ 0° V`}</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              {transformerType === "L" && (
                <ul>
                  <li>Req = {Req.toFixed(2)} Ohm</li>
                  <li>Xeq = {Xeq.toFixed(2)} Ohm</li>
                  <li>Rc = {Rcp.toFixed(2)} Ohm</li>
                  <li>jXm = j{Xmp.toFixed(2)} Ohm</li>
                  <li>
                    Vp ={" "}
                    {`${VfinalPolar.toFixed(2) * a} ∠ ${VfinalAngle.toFixed(
                      2,
                    )}° V`}
                  </li>
                  <li>{`aVs = ${VpRect.re.toFixed(2) * a} ∠ 0° V`}</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}
              {transformerType === "SERIE" && (
                <ul>
                  <li>Reqp = {Req.toFixed(2)} Ohm</li>
                  <li>jXeqp = j{Xeq.toFixed(2)} Ohm</li>
                  <li>
                    Vp ={" "}
                    {`${VfinalPolar.toFixed(2) * a} ∠ ${VfinalAngle.toFixed(
                      2,
                    )}° V`}
                  </li>
                  <li>{`aVs = ${VpRect.re.toFixed(2) * a} ∠ 0° V`}</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}

              {transformerType === "T" && (
                <ul>
                  <li>Rp= {(Req / 2).toFixed(2)} Ohm</li>
                  <li>jXp= j{(Xeq / 2).toFixed(2)} Ohm</li>
                  <li>a²Rs= {((Req / 2) * a * a).toFixed(2)} Ohm</li>
                  <li>ja²Xs= j{(Xeq / 2).toFixed(2) * a * a} Ohm</li>

                  <li>Rc = {Rcp.toFixed(2)} Ohm</li>
                  <li>jXm = j{Xmp.toFixed(2)} Ohm</li>
                  <li>
                    Vp ={" "}
                    {`${VfinalPolar.toFixed(2) * a} ∠ ${VfinalAngle.toFixed(
                      2,
                    )}° V`}
                  </li>
                  <li>{`aVs = ${VpRect.re.toFixed(2) * a} ∠ 0° V`}</li>
                  <li>Regulação de tensão: {regTensao}%</li>
                </ul>
              )}
            </div>
          )}
        </Box>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <h1>Grafico Regulação de tensão</h1>
          <VoltageRegulationChart
            maxLoad={Is.toFixed(2)}
            fp={Fp}
            Vca={Vca}
            Req={Req}
            Xeq={Xeq}
            a={a}
            Pap={Pap}
          />
        </Box>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <h1>Diagrama fasorial</h1>
          <PhasorialDiagram
            vectors={vectorObjArr.sumvec}
            independentVectors={vectorObjArr.singlevec}
            expressaoVpSobreA={Vpsobrea.representacao}
          />
        </Box>
      </Box>
    </div>
  );
};
function polarToRectangular(magnitude, angleDegrees) {
  const angleRadians = angleDegrees * (Math.PI / 180);
  const realPart = magnitude * Math.cos(angleRadians);
  const imaginaryPart = magnitude * Math.sin(angleRadians);
  return { real: realPart, imaginary: imaginaryPart };
}

function calcularImpedanciaCc(Vcc, Icc) {
  return Vcc / Icc;
}

function calcularImpedanciaCa(Vca, Ica) {
  return Vca / Ica;
}

function calcularResistenciaCc(Pcc, Icc, a) {
  const rc = Pcc / (Icc * Icc);
  return rc / (a * a);
}

function calcularResistenciaCa(Vca, Pca) {
  const rca = (Vca * Vca) / Pca;
  return rca;
}

function calcularReatanciaCc(Zca, Rca) {
  return Math.sqrt(Zca * Zca - Rca * Rca);
}

function calcularReatanciaCa() {
  return 0;
}

function calcularImpedanciaMagnetizacao(Vv, Iv) {
  return Vv / Iv;
}

function calcularImpedanciaMagnetizacaoCa(Vca, Ica) {
  return Vca / Ica;
}

function calcularResistenciaMagnetizacao(Vv, Pv) {
  return (Vv * Vv) / Pv;
}

function calcularResistenciaMagnetizacaoCa(Vca, Pca) {
  return (Vca * Vca) / Pca;
}

function calcularReatanciaMagnetizacao(Zphi, Rc) {
  const d1 = 1 / Math.abs(Zphi);
  const d2 = 1 / Rc;
  const zr = d1 * d1 - d2 * d2;
  return 1 / Math.sqrt(zr);
}

function calcularReatanciaMagnetizacaoCa(Vca, Ica, RcCa) {
  return Vca / Math.sqrt(Ica * Ica - (Vca / RcCa) * (Vca / RcCa));
}

export default CircuitResult;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { complex, add, abs } from "mathjs";

// Function to calculate voltage regulation based on load and power factor
const calculateVoltageRegulation = (
  load,
  powerFactor,
  Vca,
  Req,
  Xeq,
  a,
  Pap,
) => {
  const Is = Pap / Vca;
  const Rs = Req / Math.pow(a, 2);
  const Xs = Xeq / Math.pow(a, 2);

  let currentAngle = 0;
  if (powerFactor !== 1) {
    const fpAngle = Math.acos(Math.abs(powerFactor)) * (180 / Math.PI);
    currentAngle = powerFactor < 0 ? -fpAngle : fpAngle;
  }

  const Vrs = complex(
    Rs * Is * Math.cos(currentAngle * (Math.PI / 180)),
    Rs * Is * Math.sin(currentAngle * (Math.PI / 180)),
  );

  const Vxs = complex(
    -Xs * Is * Math.sin(currentAngle * (Math.PI / 180)),
    Xs * Is * Math.cos(currentAngle * (Math.PI / 180)),
  );

  const VpRect = complex(Vca, 0);
  const VsumRect = add(VpRect, Vrs);
  const VfinalRect = add(VsumRect, Vxs);

  const VfinalPolarTwo = abs(VfinalRect);

  return ((VfinalPolarTwo - Vca) / Vca) * 100; // Voltage regulation in percentage
};

const generateData = (maxLoad, Vca, Req, Xeq, a, Pap, fp) => {
  const data = [];
  const steps = 20; // Number of data points

  for (let i = 0; i <= steps; i++) {
    const load = (i / steps) * maxLoad; // Adjusted load value

    // Assuming calculateVoltageRegulation correctly scales with load
    const pf1 =
      (i / steps) *
      calculateVoltageRegulation(maxLoad, 1.0, Vca, Req, Xeq, a, Pap);
    const pf0_8 =
      (i / steps) *
      calculateVoltageRegulation(maxLoad, fp, Vca, Req, Xeq, a, Pap);
    const pf0_6 =
      (i / steps) *
      calculateVoltageRegulation(maxLoad, -fp, Vca, Req, Xeq, a, Pap);

    data.push({
      load,
      pf1: parseFloat(pf1.toFixed(2)), // Fixed decimal of 2
      pf0_8: parseFloat(pf0_8.toFixed(2)), // Fixed decimal of 2
      pf0_6: parseFloat(pf0_6.toFixed(2)), // Fixed decimal of 2
    });
  }

  return data;
};
const VoltageRegulationChart = ({ maxLoad, Vca, Req, Xeq, a, Pap, fp }) => {
  const data = generateData(maxLoad, Vca, Req, Xeq, a, Pap, fp);

  // Find maximum Y value for setting Y-axis domain
  const maxY = Math.max(
    Math.max(...data.map((d) => d.pf1)),
    Math.max(...data.map((d) => d.pf0_8)),
    Math.max(...data.map((d) => d.pf0_6)),
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="load"
          label={{
            value: "Corrente a plena Carga (A)",
            position: "insideBottomRight",
            offset: -5,
          }}
          domain={[-maxLoad, maxLoad]} // Set domain without offset
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          label={{
            value: "Regulação de Tensão (%)",
            angle: -90,
            position: "insideLeft",
          }}
          domain={[-maxY, maxY]} // Set domain based on maximum Y value
          padding={{ top: 20, bottom: 20 }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pf1" stroke="#8884d8" name="FP = 1.0" />

        <Line
          type="monotone"
          dataKey="pf0_8"
          stroke="#82ca9d"
          name="FP = 0.8"
        />
        <Line
          type="monotone"
          dataKey="pf0_6"
          stroke="#ffc658"
          name="FP = 0.6"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VoltageRegulationChart;

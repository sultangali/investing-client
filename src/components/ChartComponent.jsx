import React from 'react';
import { ChartCanvas, Chart, LineSeries, XAxis, YAxis } from "react-financial-charts";
import { scaleLinear } from "d3-scale";

const ChartComponent = () => {
  const chartData = [
    { name: 'observation1', value: 24 },
    { name: 'observation2', value: 26 },
    { name: 'observation3', value: 32 },
  ];

  return (
    <ChartCanvas
      data={chartData}
      xAccessor={(d, index) => index}
      xScale={scaleLinear().domain([0, chartData.length - 1])}
      width={800}
      height={400}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
    >
      <Chart id={1} yExtents={chartData.map(d => d.value)} >
        <LineSeries yAccessor={(d) => d.value} />
        <XAxis />
        <YAxis />
      </Chart>
    </ChartCanvas>
  );
}

export default ChartComponent;


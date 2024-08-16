import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TableRow = ({ item, chartData, mark, currentTime, currentLanguage, onRowClick }) => {

  const [highlightMax, setHighlightMax] = React.useState(false);
  const [highlightMin, setHighlightMin] = React.useState(false);

  console.log('currentLanguage', currentLanguage)

  const switchLanguage = (language) => {
    switch(language) {
      case 'kaz': 
        return 'kaz'
      case 'rus':
        return 'rus'
      case 'eng':
        return 'eng'
      default: 
        return 'kaz'
    }
  }

  const dps = chartData[item.name]?.map((itm, index) => ({
    x: index + 1,
    y: itm?.data?.output
  })) || []

  const previousOutput = dps.length > 1 ? dps[dps.length - 2]?.y : undefined

  const change = previousOutput !== undefined ? ((item?.data?.output - previousOutput) / previousOutput) * 100 : 0

  const options = React.useMemo(() => {
    const lastPoint = dps[dps.length - 1]
    return {
      height: 80,
      axisX: {
        labelFormatter: () => '',
        tickLength: 1,
        lineThickness: 0,
        gridThickness: 0
      },
      axisY: {
        // labelFormatter: () => "",
        tickLength: 3,
        lineThickness: 1,
        gridThickness: 0,
        lineColor: "#2e8b57"
      },
      data: [{
        type: "line",
        lineColor: "#4361ee",
        lineThickness: 2,
        markerType: "circle",
        markerSize: 1,
        markerColor: "#4361ee",
        dataPoints: dps
      }],
      annotations: lastPoint ? [{
        x: lastPoint.x,
        y: lastPoint.y,
        markerType: "circle",
        markerSize: 8,
        markerColor: "#ff0000",
        label: {
          text: `${lastPoint.y}`,
          backgroundColor: "#ff0000",
          borderThickness: 0,
          fontColor: "#ffffff",
          fontSize: 12,
          cornerRadius: 3,
          fontWeight: "bold",
          x: lastPoint.x + 0.2,
          y: lastPoint.y,
          offsetX: 0,
          offsetY: -15,
          labelAlign: "center"
        }
      }] : []
    };
  }, [dps]);

  const getMaxMinChange = (dataPoints) => {
    if (dataPoints.length === 0) return { max: 0, min: 0, change: 0 }
    const maxPoint = Math.max(...dataPoints.map(p => p.y))
    const minPoint = Math.min(...dataPoints.map(p => p.y))
    // const change = ((dataPoints[dataPoints.length - 1].y - dataPoints[0].y) / dataPoints[0].y) * 100
    return { max: maxPoint, min: minPoint }
  }

  const dataPoints = chartData[item.name]?.map((itm, index) => ({
    x: index + 1,
    y: itm?.data?.output
  })).filter(point => point.y !== undefined);

  const { max, min } = getMaxMinChange(dataPoints);

  React.useEffect(() => {
    setHighlightMax(true);
    const timer = setTimeout(() => {
      setHighlightMax(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [max]);

  React.useEffect(() => {
    setHighlightMin(true);
    const timer = setTimeout(() => {
      setHighlightMin(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [min]);

  const optionsWithDps = {
    ...options,
    data: [{
      ...options.data[0],
      dataPoints: dataPoints
    }]
  };

  const setToFixed = (number, currentTime) => {
    switch (currentTime) {
      case 'live':
        return parseFloat((number)?.toFixed(8)); // Примерное значение для минуты (при 365 днях в году)
      case '15sec':
        return parseFloat((number)?.toFixed(8));
      case '1min':
          return parseFloat((number)?.toFixed(8));
      case '1hour':
        return parseFloat((number)?.toFixed(7)); // Значение для часа
      case '1day':
        return parseFloat((number)?.toFixed(6)); // Значение для одного дня
      case '1week':
        return parseFloat((number)?.toFixed(5)); // Значение для одной недели (52 недели в году)
      case '1month':
        return parseFloat((number)?.toFixed(4)); // Значение для одного месяца (12 месяцев в году)
      case '3month':
        return parseFloat((number)?.toFixed(3)); // Значение для трёх месяцев (4 квартала в году)
      case '6month':
        return parseFloat((number)?.toFixed(2)); // Значение для шести месяцев (полгода)
      case '1year':
        return parseFloat((number)?.toFixed(1)); // Годовое значение, без изменений
      default:
        return parseFloat((number)?.toFixed(1)); // Если ни один из случаев не подходит, возвращаем оригинальные данные
    }
  }

  return (
    <tr>
      <td>{item.index + 1}</td>
      <td className="product-link-btn" onClick={onRowClick}>{item?.lang[switchLanguage(currentLanguage)]}</td>
      <td style={{ width: '100px' }}>
        <span style={mark === 'mark' ? { backgroundColor: 'rgba(2, 225, 2, 0.273)' } : { backgroundColor: 'transparent' }}>{setToFixed(item?.data?.output, currentTime)}</span> </td>
      <td style={{ width: '100px' }}>{setToFixed(previousOutput, currentTime)}</td>
      <td style={{ width: '100px' }}><span style={{ backgroundColor: highlightMax ? '#3498db6d' : 'transparent' }}>{setToFixed(max, currentTime)}</span> </td>
      <td style={{ width: '100px' }}><span style={{ backgroundColor: highlightMin ? '#e67d2270' : 'transparent' }}>{setToFixed(min, currentTime)}</span></td>
      <td className={change >= 0 ? 'positive' : 'negative'} style={change >= 0 ? { color: 'green', width: '100px' } : { color: 'red', width: '100px' }}>
        {change >= 0 && '+'}{change.toFixed(2) + '%'}
      </td>
      <td style={{ width: '200px' }}>
        <CanvasJSChart options={optionsWithDps} />
      </td>
    </tr>
  );
};

export default TableRow
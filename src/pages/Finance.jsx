import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Finance ({ index, item, chartData, currentTime }) {

    let dps = {
		1: [],
		2: [],
		3: []
	}
     chartData[item.name]?.forEach((itm, index) => {
        dps['1'].push( { 
			// [index]: {
			x: index + 1,
            y: itm?.data?.rNextNumber['1']
			// {0: itm?.data?.output, 1: itm?.data?.output + 0.5, 2: itm?.data?.output - 0.5, 3: itm?.data?.output},
		// }
       })
	   dps['2'].push( { 
		// [index]: {
		x: index + 1,
		y: itm?.data?.rModuleNumber['1']
		// {0: itm?.data?.output, 1: itm?.data?.output + 0.5, 2: itm?.data?.output - 0.5, 3: itm?.data?.output},
	// }
   })

    })
	// K: Object { 1: 44183.4, 2: 30400.2, 3: 24019.4 }
	// aIndex: 29
	// cell: 17615.8
	// currentPopulation: 20.4
	// equilibrium: Object { 1: {…}, 2: {…}, 3: {…} }
	// fModuleNumber: Object { 1: -3739.6, 2: -4975.2, 3: -5972.9 }
	// forecasting: Object { 1: {…}, 2: {…}, 3: {…} }
	// logarithm: Object { 1: -0.41, 2: 0.32, 3: 1.01 }
	// observation: Object { 1: {…}, 2: {…} }
	// output: 0.03012027
	// rModuleNumber: Object { 1: 0.249, 2: 0.259, 3: 0.273 }
	// rNextNumber: Object { 1: 0.103, 2: 0.305, 3: 0.324 }
	// sModuleNumber: Object { 1: -651142.8, 2: -47934763.4, 3: -83590879.3 }
	// slope: Object { 1: 0.1681, 2: 0.1801, 3: 0.194 }
	// sum: 17615.8

		const options = {
			title: {
				text: "Microsoft Corporation Stock Price - December 2017"
			},
			axisX: {
				tickLength: 1,
				lineThickness: 1,
				gridThickness: 0
			},
			axisY: {
				tickLength: 1,
				lineThickness: 1,
				gridThickness: 1,
				title: "Бағалар",
			},
			data: [{
				type: "spline",
				name: "rNextNumber - " +  dps['1'][dps['1'].length - 1].y,
				showInLegend: true,
				dataPoints: dps['1']
			}, {
				type: "spline",
				name: "rModuleNumber - " + dps['2'][dps['2'].length - 1].y,
				showInLegend: true,
				dataPoints: dps['2']
			}]
		}

    return (
         <CanvasJSChart options={options} /> 
      )
}
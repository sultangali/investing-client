import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Last = ({ index, item, chartData, currentTime }) => {

    let arrs = {
        "K": [],
        "slope": [],
        "cell": [],
        "sum": []
    }

    let dps = {
        "fModuleNumber": [],
        "rModuleNumber": [],
        "rNextNumber": [],
        "sModuleNumber": []
    }

    chartData[item.name]?.forEach((itm, index) => {
        dps['fModuleNumber'].push({
            x: index + 1,
            label:  (index + 1) + '. f[n]=',
            y: parseFloat((itm?.data?.fModuleNumber['1'] / 10).toFixed(3))
        })
        dps['rModuleNumber'].push({
            x: index + 1,
            label:  (index + 1) + '. r[n]=',
            y: parseFloat((itm?.data?.rModuleNumber['1'] * 180 * 10).toFixed(3))
        })
        dps['rNextNumber'].push({
            x: index + 1,
            label: (index + 1) + '. r^[n]=',
            y: parseFloat((itm?.data?.rNextNumber['1'] * 180 * 10).toFixed(3))
        })
        dps['sModuleNumber'].push({
            x: index + 1,
            label:  (index + 1) + '. s[n]=',
            y: parseFloat((itm?.data?.sModuleNumber['1'] / 365 / 10 / 100).toFixed(3))
        })
        arrs['K'].push({
            1: itm?.data?.K['1'],
            2: itm?.data?.K['2'],
            3: itm?.data?.K['3'],
        })
        arrs['slope'].push({
            1: itm?.data?.slope['1'],
            2: itm?.data?.slope['2'],
            3: itm?.data?.slope['3'],
        })
        arrs['cell'].push(itm?.data?.cell)
        arrs['sum'].push(itm?.data?.sum)
    })

    const options = {
        height: 500,
        title: {
            text: "Барлық өзгерістер"
        },
        axisX: {
            labelFormatter: () => '',
            tickLength: 1,
            lineThickness: 1,
            gridThickness: 0
        },
        axisY: {
            tickLength: 1,
            lineThickness: 1,
            gridThickness: 1,
        },
        data: [{
            type: "column",
            markerType: "circle",
            markerSize: 1,
            name: "f[n] = " + dps['fModuleNumber'][dps['fModuleNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['fModuleNumber']
        }, {
            type: "column",
            markerType: "circle",
            markerSize: 20,
            name: "r[n] = " + dps['rModuleNumber'][dps['rModuleNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['rModuleNumber']
        }, {
            type: "column",
            markerType: "circle",
            markerSize: 20,
            name: "r^[n] = " + dps['rNextNumber'][dps['rNextNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['rNextNumber']
        }, {
            type: "column",
            markerType: "circle",
            markerSize: 20,
            name: "s[n] = " + dps['sModuleNumber'][dps['sModuleNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['sModuleNumber']
        }]
    }
    return (<CanvasJSChart options={options} />)
}

export default Last
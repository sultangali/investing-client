import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import { useTranslation } from "react-i18next";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const FRNumber = ({ index, item, chartData, currentTime }) => {
    const { t } = useTranslation()
    let dps = {
        "fModuleNumber": [],
        "rModuleNumber": [],
    }

    chartData[item.name]?.forEach((itm, index) => {
        dps['fModuleNumber'].push({
            x: index,
            label: 'fModuleNumber: ' + (index + 1),
            y: -(itm?.data?.fModuleNumber['2'] / 200 / 10).toFixed(3)
        })
        dps['rModuleNumber'].push({
            x: index,
            label: 'rModuleNumber: ' + (index + 1),
            y: (itm?.data?.rModuleNumber['2'] + 0.200)
        })
    })

    const options = {
        height: 300,
        title: {
            text: t('fgr')
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
            type: "area",
            markerType: "square",
            markerSize: 10,
             lineColor: "#4361ee",
             color: "#4895ef",
            name: "f[n] = " + dps['fModuleNumber'][dps['fModuleNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['fModuleNumber']
        }, {
            type: "area",
            markerType: "square",
            markerSize: 10,
            markerColor: "#4361ee",
             lineColor: "#4361ee",
            name: "r[n] = " + dps['rModuleNumber'][dps['rModuleNumber'].length - 1].y,
            color: "#4361ee",
            showInLegend: true,
            dataPoints: dps['rModuleNumber']
        }]
    }
    return (<CanvasJSChart options={options} />)
}

export default FRNumber
import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import { useTranslation } from "react-i18next";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const FFRNumber = ({ index, item, chartData, currentTime }) => {
    const { t } = useTranslation()
    let dps = {
        "fModuleNumber": [],
        "rNextNumber": [],
    }

    chartData[item.name]?.forEach((itm, index) => {
        dps['fModuleNumber'].push({
            x: index,
            label: 'fModuleNumber: ' + (index + 1),
            y: -(itm?.data?.fModuleNumber['3'] / 200 / 10).toFixed(3)
        })
        dps['rNextNumber'].push({
            x: index,
            label: 'rNextNumber: ' + (index + 1),
            y: (itm?.data?.rNextNumber['3'] + 0.200)
        })
    })

    const options = {
        height: 300,
        title: {
            text: t("series")
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
            type: "line",
            markerType: "circle",
            markerSize: 1,
             lineColor: "#4361ee",
            name: "f[n] = " + dps['fModuleNumber'][dps['fModuleNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['fModuleNumber']
        }, {
            type: "line",
            markerType: "circle",
            markerSize: 1,
            markerColor: "orange",
             lineColor: "orange",
            name: "r^[n] = " + dps['rNextNumber'][dps['rNextNumber'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['rNextNumber']
        }]
    }
    return (<CanvasJSChart options={options} />)
}

export default FFRNumber
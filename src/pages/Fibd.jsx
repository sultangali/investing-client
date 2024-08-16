import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import { useTranslation } from "react-i18next";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Fibd = ({ index, item, chartData, currentTime }) => {
    const {t} = useTranslation()
    let dps = {
        "increased": [],
        "balanced": [],
        "decreased": []
    }


    const minimize = (number, item, previousValue) => {

        if(number === 0) {
            return parseFloat(number.toFixed(3))
        }

        const baseValue = (number / 365 / 100)

        let newValue
        
        switch(item) {
            case 'increased':
                newValue = (previousValue ? (previousValue + baseValue * (Math.random() * 0.10 + 0.10)) : 1.000)
                return newValue > 0.010 ? newValue : 0.010
            case 'balanced':
                newValue = previousValue ? (previousValue) + (baseValue + 0.150) * (Math.random() * -0.10 + -0.10) : 0.010;
                return newValue < 1.000 ? newValue : 1.000
            case 'decreased':
                newValue = previousValue ? previousValue + baseValue * (Math.random() * 0.100 + 0.10) : 1.00;
                return newValue > 0.010 ? newValue : 0.010
            default: 
                return number
        }
    }

    chartData[item.name]?.forEach((itm, index) => {

        const prevIncreased = dps['increased'][index - 1]?.y || 0.010
        const prevBalanced = dps['balanced'][index - 1]?.y || 0.010
        const prevDecreased = dps['decreased'][index - 1]?.y || 0.010

        dps['increased'].push({
            x: index,
            label: 'increased: ' + (index + 1),
            y: parseFloat(minimize(itm?.data?.equilibrium['3'].increased, 'increased', prevIncreased).toFixed(3))
        })
        dps['balanced'].push({
            x: index,
            label: 'balanced: ' + (index + 1),
            y: parseFloat(minimize(itm?.data?.equilibrium['3'].balanced, 'balanced', prevBalanced).toFixed(3))
        })
        dps['decreased'].push({
            x: index,
            label:'decreased: ' + (index + 1),
            y: parseFloat(minimize(itm?.data?.equilibrium['3'].decreased, 'decreased', prevDecreased).toFixed(3))
        })
    })

    console.log('chartData[item.name]', chartData[item.name])

    const options = {
        height: 300,
        title: {
            text: t("forecasting")
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
             lineColor: "#3a0ca3",
            name: t("increased") + " - " + dps['increased'][dps['increased'].length - 1].y,
            // axisYType: "primary",
            showInLegend: true,
            lineDashType: "longDash",
            dataPoints: dps['increased']
        }, {
            type: "line",
            markerType: "square",
            markerSize: 5,
            markerColor: "#4361ee",
             lineColor: "#4361ee",
             lineDashType: "dot",

            name: t("balanced") + " - " + dps['balanced'][dps['balanced'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['balanced']
        }, {
            type: "line",
            markerType: "circle",
            markerSize: 1,
            lineDashType: "shortDash",
            markerColor: "#4895ef",
            lineColor: "#4895ef",
            name: t("decreased") + " - " + dps['decreased'][dps['decreased'].length - 1].y,
            showInLegend: true,
            dataPoints: dps['decreased']
        }]
    }
    return (<CanvasJSChart options={options} />)
}

export default Fibd
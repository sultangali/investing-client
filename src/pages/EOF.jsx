import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import { useTranslation } from "react-i18next";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const EOF = ({ index, item, chartData, currentTime }) => {
    const { t } = useTranslation()
    let dps = {
        "equilibrium": [],
        "observation": [],
        "forecasting": []
    }

const balancing = (name, number) => {
        switch (name) {
            case 'TTL_01T02: Agriculture, hunting, forestry':
                return number / 80 / 1.080
            case 'TTL_03: Fishing and aquaculture':
                return number / 365 / 80 / 1.080
            case 'TTL_05T06: Mining and quarrying, energy producing products':
                return number / 35 / 1.080
            case 'TTL_07T08: Mining and quarrying, non-energy producing products':
                return number / 150 / 1.080
            case 'TTL_09: Mining support service activities':
                return number / 365 / 5 / 1.080
            case 'TTL_10T12: Food products, beverages and tobacco':
                return number / 365 / 1.50 / 1.080
            case 'TTL_13T15: Textiles, textile products, leather and footwear':
                return number / 365 / 4.70 /  1.080
            case 'TTL_16: Wood and products of wood and cork':
                return number / 365 / 10 / 1.080
            case 'TTL_17T18: Paper products and printing':
                return number / 365 / 1.34 / 1.080
            case 'TTL_19: Coke and refined petroleum products':
                return number / 365 / 0.58 / 1.080
            case 'TTL_20: Chemical and chemical products':
                return number / 365 / 0.7 / 1.080
            case 'TTL_21: Pharmaceuticals, medicinal chemical and botanical products':
                return number / 365 / 3.10 / 1.080
            case 'TTL_22: Rubber and plastics products':
                return number / 365 / 2.2 / 1.080
            case 'TTL_23: Other non-metallic mineral products':
                return number / 365 / 1.80 / 1.080
            case 'TTL_24: Basic metals':
                return number / 365 / 0.24 / 1.080
            case 'TTL_25: Fabricated metal products':
                return number / 365 / 1.73 / 1.080
            case 'TTL_26: Computer, electronic and optical equipment':
                return number / 365 / 1.45 / 1.080
            case 'TTL_27: Electrical equipment':
                return number / 365 / 2.5 /  1.080
            case 'TTL_28: Machinery and equipment, nec':
                return number / 365 / 0.4 / 1.080
            case 'TTL_29: Motor vehicles, trailers and semi-trailers':
                return number / 365 / 1.24 / 1.080
            case 'TTL_30: Other transport equipment':
                return number / 365 / 0.78 /  1.080
            case 'TTL_31T33: Manufacturing nec; repair and installation of machinery and equipment':
                return number / 365 / 1.2 / 1.080
            case 'TTL_35: Electricity, gas, steam and air conditioning supply':
                return number / 365 / 0.6 / 1.080
            case 'TTL_36T39: Water supply; sewerage, waste management and remediation activities':
                return number / 365 / 4.8 / 1.080
            case 'TTL_41T43: Construction':
                return number / 365 / 0.22 / 1.080
            case 'TTL_45T47: Wholesale and retail trade; repair of motor vehicles':
                return number / 365 / 0.096 / 1.080
            case 'TTL_49: Land transport and transport via pipelines':
                return number / 365 / 0.26 / 1.080
            case 'TTL_50: Water transport':
                return number / 365 / 11.5 /  1.080
            case 'TTL_51: Air transport':
                return number / 365 / 4.2 / 1.080
            case 'TTL_52: Warehousing and support activities for transportation':
                return number / 365 / 1.4 / 1.080
            case 'TTL_53: Postal and courier activities':
                return number / 365 / 16 / 1.080
            case 'TTL_55T56: Accommodation and food service activities':
                return number / 365 / 1.2 / 1.080
            case 'TTL_58T60: Publishing, audiovisual and broadcasting activities':
                return number / 365 / 1.2 / 1.080
            case 'TTL_61: Telecommunications':
                return number / 365 / 1.14 / 1.080
            case 'TTL_62T63: IT and other information services':
                return number / 365 / 3.2 / 1.080
            case 'TTL_64T66: Financial and insurance activities':
                return number / 365 / 0.72 / 1.080
            case 'TTL_68: Real estate activities':
                return number / 365 / 7.5 / 1.080
            case 'TTL_69T75: Professional, scientific and technical activities':
                return number / 365 / 0.45 / 1.080
            case 'TTL_77T82: Administrative and support services':
                return number / 365 / 1.1 / 1.080
            case 'TTL_84: Public administration and defence; compulsory social security':
                return number / 365 / 0.24 / 1.080
            case 'TTL_85: Education':
                return number / 365 / 0.5 / 1.080
            case 'TTL_86T88: Human health and social work activities':
                return number / 365 / 0.52 / 1.080
            case 'TTL_90T93: Arts, entertainment and recreation':
                return number / 365 /  1.080
            case 'TTL_94T96: Other service activities':
                return number / 365 / 2.1 / 1.080
            default: 
                return number
        }
    }

    chartData[item.name]?.forEach((itm, index) => {
        dps['equilibrium'].push({
            x: index + 1,
            y: parseFloat(balancing(item?.name, itm?.data?.equilibrium['1'].root).toFixed(3))
        })
        dps['observation'].push({
            x: index + 1,
            y: parseFloat((itm?.data?.observation['1'].root * 100 * 300).toFixed(3))
        })
        dps['forecasting'].push({
            x: index + 1,
            y: parseFloat((itm?.data?.forecasting['1'].root * 100 * 190).toFixed(3))
        })
    })

    const options = {
        height: 500,
        title: {
            text: t("output"),
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
        },
        data: [{
            type: "spline",
            markerType: "square",
            markerSize: 1,
            lineColor: "#3a0ca3",
            name: t('equilibrium') + " - " + dps['equilibrium'][dps['equilibrium'].length - 1].y,
            // axisYType: "primary",
            showInLegend: true,
            dataPoints: dps['equilibrium']
        }, {
            type: "line",
            markerType: "circle",
            markerSize: 20,
            markerColor: "#4361ee",
            lineColor: "#4361ee",
            name: t('observation') + " - " + dps['observation'][dps['observation'].length - 1].y,
            // axisYType: "primary",
            showInLegend: true,
            dataPoints: dps['observation']
        }, {
            type: "line",
            markerType: "triangle",
            markerSize: 20,
            markerColor: "#4895ef",
            lineColor: "#4895ef",
            name: t('forecasting') + " - " + dps['forecasting'][dps['forecasting'].length - 1].y,
            // axisYType: "primary",
            showInLegend: true,
            dataPoints: dps['forecasting']
        }]
    }
    return (<CanvasJSChart options={options} />)
}

export default EOF
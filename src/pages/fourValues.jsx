import React from "react";
import { Row, Col } from 'react-bootstrap'

const FourValues = ({ index, item, chartData, currentTime }) => {

    const CRITERION_AT_THE_BORDER = { 1: 0.398697444288481, 2: 0.579463019350998, 3: 0.733398295088505 };
    const CRITERION_FOR_THE_EQUATION = { 1: 120.290460903314, 2: 72.3935839196748, 3: 42.1493997425231 };
    const EQUILIBRIUM_CRITERION = { 1: 0.809522966400431, 2: 1.1823122974944, 3: 1.5174732854438 };
    const FORECASTING_CRITERION = { 1: 1.01706456620769, 2: 1.00962213784764, 3: 1.01314381597942 };

    let arrs = {
        "K": {
            1: [],
            2: [],
            3: []
        },
        "slope": {
            1: [],
            2: [],
            3: []
        },
        "cell": [],
        "sum": []
    }

    chartData[item.name]?.forEach((itm, index) => {
        arrs['K'][1] = itm?.data?.K['1']
        arrs['K'][2] = itm?.data?.K['2']
        arrs['K'][3] = itm?.data?.K['3']

        arrs.slope[1] = itm?.data?.slope['1']
        arrs.slope[2] = itm?.data?.slope['2']
        arrs.slope[3] = itm?.data?.slope['3']

        arrs['cell'] = (itm?.data?.cell)
        arrs['sum'] = (itm?.data?.sum)
    })

    return (<>
        <Row>
            <Col className="col-3">
                <Row>
                    <Col className="col-12"><h6>BORDER<sub>1</sub> = {CRITERION_AT_THE_BORDER[1].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>BORDER<sub>2</sub> = {CRITERION_AT_THE_BORDER[2].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>BORDER<sub>3</sub> = {CRITERION_AT_THE_BORDER[3].toFixed(3)}</h6> </Col>
                </Row>
            </Col>
            <Col className="col-3">
                <Row>
                    <Col className="col-12"><h6>EQUATION<sub>1</sub> = {CRITERION_FOR_THE_EQUATION[1].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>EQUATION<sub>2</sub> = {CRITERION_FOR_THE_EQUATION[2].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>EQUATION<sub>3</sub> = {CRITERION_FOR_THE_EQUATION[3].toFixed(3)}</h6> </Col>
                </Row>
            </Col>
            <Col className="col-3">
                <Row>
                    <Col className="col-12"><h6>EQUILIBRIUM<sub>1</sub> = {EQUILIBRIUM_CRITERION[1].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>EQUILIBRIUM<sub>2</sub> = {EQUILIBRIUM_CRITERION[2].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>EQUILIBRIUM<sub>3</sub> = {EQUILIBRIUM_CRITERION[3].toFixed(3)}</h6> </Col>
                </Row>
            </Col>
            <Col className="col-3">
                <Row>
                    <Col className="col-12"><h6>FORECASTING<sub>1</sub> = {FORECASTING_CRITERION[1].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>FORECASTING<sub>2</sub> = {FORECASTING_CRITERION[2].toFixed(3)}</h6> </Col>
                    <Col className="col-12"><h6>FORECASTING<sub>3</sub> = {FORECASTING_CRITERION[3].toFixed(3)}</h6> </Col>
                </Row>
            </Col>
            <Col className="col-12">
                <hr />
            </Col>
            <Col className="col-4">
                <Row>
                    <Col className="col-12"><h3>K<sub>1</sub> = {arrs.K['1']}</h3> </Col>
                    <Col className="col-12"><h3>K<sub>2</sub> = {arrs.K['2']}</h3></Col>
                    <Col className="col-12"><h3>K<sub>3</sub> = {arrs.K['3']}</h3></Col>
                </Row>
            </Col>
            <Col className="col-4">
                <Row>
                    <Col className="col-12"><h3>slope<sub>1</sub> = {arrs.slope['1']}</h3></Col>
                    <Col className="col-12"><h3>slope<sub>2</sub> = {arrs.slope['2']}</h3></Col>
                    <Col className="col-12"><h3>slope<sub>3</sub> = {arrs.slope['3']}</h3></Col>
                </Row>
            </Col>
            <Col className="col-4 d-flex row align-items-center">
                <Row>
                    <Col className="col-12"><h3>SUM = {(arrs.sum).toFixed(1)}</h3></Col>
                </Row>
            </Col>
        </Row>

    </>)
}

export default FourValues
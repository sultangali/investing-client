import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useTranslation } from 'react-i18next';
const Instruments = () => {
    const {t} = useTranslation()
    return (<>
        <Container>
            <Row>
                <Col className="col-auto"  >
                <br />
                <h3>{t('instrument1')}</h3>
                <br />
                <iframe height="420"  className="w-100" title="instrument1" style={{ paddingTop: 0 }} src="https://ssltools.investing.com/currency-converter/?from=12&to=63&force_lang=7&with_powered_by=false"></iframe>
                </Col>
                <Col className="col-6">
                <br />
                <h3>{t('instrument2')}</h3>
                <br />
                <iframe className="w-100" frameborder="0" title="instrument2" scrolling="auto" height="650" allowtransparency="true" marginwidth="0" marginheight="0" src="https://ssltools.investing.com/fibonacci-calculator/index.php?force_lang=7"></iframe>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Instruments
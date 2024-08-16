import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
const Calendars = () => {
    const {t} = useTranslation()
    return (<>
        <Container>
            <Row>
                <Col className="col-12">
                <br />
                    
                </Col>
                <Col className="col-12">
                <h2>{t('calendar1')}</h2>
                    <iframe  src="https://sslecal2.investing.com?ecoDayBackground=%234261ed&innerBorderColor=%232600ff&columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,4,17,39,72,26,10,6,37,43,56,36,5,61,22,12,35&calType=week&timeZone=25&lang=7" 
                    // width="auto" height="467" 
                    title="calendar1"
                    frameborder="0"
                    className="w-100"
                    height={'700'}
                    allowtransparency="true" 
                    marginwidth="0" marginheight="0"></iframe>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Calendars
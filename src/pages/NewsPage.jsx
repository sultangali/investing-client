import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NewsPage = () => {

    const { t } = useTranslation()

    const newsArticles = [
        {
            title: t('news-1.title'),
            date:  t('news-1.date'),
            text:  t('news-1.desc'),
            image: "image.png"
        },
        {
            title: t('news-2.title'),
            date:  t('news-2.date'),
            text:  t('news-2.desc'),
            image: "image1.png"
        },
        {
            title: t('news-3.title'),
            date:  t('news-3.date'),
            text:  t('news-3.desc'),
            image: "image2.png"
        }
    ];

    return (
        <Container>
            <h2 className="my-4">{t('news-title')}</h2>
            <Row>
                {newsArticles.map((article, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card className='shadow'>
                            <Card.Img variant="top" style={{border: '1px solid #0B5ED7'}} src={article.image} />
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{article.date}</Card.Subtitle>
                                <Card.Text>
                                    {article.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsPage;

import React from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Form,
    Alert,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { fetchRegister, selectIsAuth } from "../redux/slices/user.js";
import { useTranslation } from "react-i18next";

const Registration = () => {
    const dispatch = useDispatch();

    const { t } = useTranslation()

    const isAuth = useSelector(selectIsAuth);

    const [phone, setPhone] = React.useState("+7");

    const [errorMessage, setErrorMessage] = React.useState("");

    const [matchedPass, setMatchedPass] = React.useState(true);

    console.log(matchedPass)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPass: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        if (values.password === values.confirmPass) {
            const data = await dispatch(
                fetchRegister({
                    username: values.username,
                    email: values.email,
                    phone: phone && phone,
                    password: values.password,
                })
            );

            setErrorMessage(data.payload.message);

            if ("token" in data.payload) {
                window.localStorage.setItem("token", data.payload.token);
            }
        } else {
            setMatchedPass(false);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Row className="d-flex row justify-content-center">
                <Col className="col-6 d-flex row align-items-center" style={{height: '80vh'}}>
                    <div >
                        <h4 style={{ color: "#4361ee", fontWeight: '700', marginBottom: '24px'}}>{t('signup-title')}</h4>
                        {errorMessage && errorMessage && (
                            <Alert
                                variant={errorMessage && errorMessage ? "danger" : "primary"}
                                style={
                                    errorMessage && errorMessage
                                        ? { borderColor: "red", borderRadius: "1px" }
                                        : { borderRadius: "1px" }
                                }>
                                {
                                    <div className="text-center" style={{ margin: "-12px" }}>
                                        {errorMessage && <span>{errorMessage}</span>}
                                    </div>
                                }
                            </Alert>
                        )}
                        
                        <Card className="static-card" style={{ border: 'none' }}>
                            <Form onSubmit={handleSubmit(onSubmit)} method="post">
                                <Row>
                                    <Col lg={12} xs={12}>
                                        <Form.Group className="mb-3">
                                            {errors && errors.username ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.username?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('signup-login')}</Form.Label>
                                            )}

                                            <Form.Control
                                                style={
                                                    Boolean(errors.username?.message)
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                className="form-control-input"
                                                {...register("username", {
                                                    required: "",
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            "",
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message:
                                                            "",
                                                    },
                                                })}
                                                type="text"
                                                placeholder=""
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={12} xs={12}>
                                        <Form.Group className="mb-3">
                                            {errors && errors.email ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.email?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('signup-email')}</Form.Label>
                                            )}

                                            <Form.Control
                                                style={
                                                    Boolean(errors.email?.message)
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                className="form-control-input"
                                                {...register("email", {
                                                    required: "",
                                                    pattern: {
                                                        value:
                                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "",
                                                    },
                                                })}
                                                type="email"
                                                placeholder=""
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} xs={12}>
                                        <Form.Group className="mb-3">
                                            {!phone ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {t('signup-phone')}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('signup-phone')}</Form.Label>
                                            )}

                                            <PhoneInput
                                                style={
                                                    !phone
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                className="form-control phone"
                                                defaultCountry="KZ"
                                                value={phone}
                                                onChange={setPhone}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-3">
                                            {errors && errors.password ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.password?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('signup-pass')}</Form.Label>
                                            )}

                                            <Form.Control
                                                className="form-control-input"
                                                style={
                                                    Boolean(errors.password?.message)
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                {...register("password", {
                                                    required: t('signup-pass'),
                                                    minLength: {
                                                        value: 6,
                                                        message:
                                                        t('signup-pass'),
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message:
                                                        t('signup-pass'),
                                                    },
                                                })}
                                                type="password"
                                                placeholder=""
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-3">
                                            {errors && errors.confirmPass ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.confirmPass?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('signup-confirmpass')}</Form.Label>
                                            )}

                                            <Form.Control
                                                className="form-control-input"
                                                style={
                                                    Boolean(errors.confirmPass?.message)
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                {...register("confirmPass", {
                                                    required: t('signup-confirmpass'),
                                                    validate: (val) => {
                                                        if (watch("password") !== val) {
                                                            return t('signup-confirmpass');
                                                        }
                                                    },
                                                })}
                                                type="password"
                                                placeholder=""
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col className="col-12"><br /></Col>                
                                <Col className="col-12 d-flex column justify-content-end align-items-center">
                                    <Link to="/login">
                                        <Button variant="link" className="btn outlined-btn">
                                        {t('switch-to-signin')}
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="primary"
                                        className="btn-signup"
                                        type="submit"
                                    >
                                        {t('signup-title')}
                                    </Button>
                                </Col>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Registration;
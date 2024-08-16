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

import { fetchLogin, selectIsAuth } from "../redux/slices/user.js";
import { useTranslation } from "react-i18next";

const Login = () => {

    const { t } = useTranslation()

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const [errorMessage, setErrorMessage] = React.useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: ""
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {

        const data = await dispatch(
            fetchLogin({
                login: values.login,
                password: values.password,
            })
        );

        setErrorMessage(data.payload.message);

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Container>

            <Row className="d-flex row justify-content-center">
                <Col className="col-5 d-flex row align-items-center" style={{height: '80vh'}}>
                    <div>
                        <h4 style={{ color: "#4361ee", fontWeight: '700' }}>{t('signin-title')}</h4>
                        {errorMessage && errorMessage && (
                            <Alert
                                variant={errorMessage && errorMessage ? "danger" : "primary"}
                                style={
                                    errorMessage && errorMessage
                                        ? { borderColor: "red", borderRadius: "1px" }
                                        : { borderRadius: "1px" }}>
                                {
                                    <div className="text-center" style={{ margin: "-12px" }}>
                                        {errorMessage && <span>{errorMessage}</span>}
                                    </div>
                                }
                            </Alert>
                        )}
                        <Card  style={{ border: 'none' }}>
                            <Form onSubmit={handleSubmit(onSubmit)} method="post">
                                <Row>
                                    <Col lg={12} xs={12}>
                                        <br />
                                        <Form.Group className="mb-3">
                                            {errors && errors.login ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.login?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('email')}</Form.Label>
                                            )}

                                            <Form.Control
                                                style={
                                                    Boolean(errors.login?.message)
                                                        ? {
                                                            borderColor: "red",
                                                        }
                                                        : { borderColor: "#4361ee" }
                                                }
                                                className="form-control-input"
                                                {...register("login", {
                                                    required: "",
                                                })}
                                                type="text"
                                                placeholder=""
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} xs={12}>
                                        <Form.Group className="mb-3">
                                            {errors && errors.password ? (
                                                <Form.Label style={{ color: "red" }}>
                                                    {errors.password?.message}
                                                </Form.Label>
                                            ) : (
                                                <Form.Label>{t('password')}</Form.Label>
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
                                                    required: "",
                                                    minLength: {
                                                        value: 6,
                                                        message:
                                                            "",
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message:
                                                            "",
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
                                    <Link to="/registration">
                                        <Button variant="link" className="btn outlined-btn" >
                                            {t('switch-to-signup')}
                                        </Button>
                                    </Link>
                                    <Button
                                        // disabled={!isValid}
                                        variant="primary"
                                        className="btn-signup"
                                        type="submit"
                                    >
                                        {t('signin-title')}
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

export default Login;
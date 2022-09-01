import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LoadingBox from '../Components/LoadingBox';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsClickedLogInButton(true);
    try {
      const { data } = await Axios.post(
        `https://www.geoware-gmbh.de/ViewerBackend/api/Login`,
        {
          headers: {
            Authorization: 'Basic ' + btoa(email + '' + password),
          },
        },
        {
          auth: {
            username: email,
            password: password,
          },
        }
      );
      ctxdispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setIsClickedLogInButton(false);
      alert('invalid email or password');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <Container className="mt-3">
      <Container className="small-container">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h3 className="my-3 text">Login</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3 text" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 text" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              {isClickedLogInButton ? (
                <div className="centerl">
                  <LoadingBox />
                </div>
              ) : (
                <div className="mb-3 text right-item">
                  <Button variant="outline-warning text" type="submit">
                    login
                  </Button>
                </div>
              )}
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginScreen;

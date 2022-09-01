import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '../Components/BreadCrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import EvaluationAnaylsisScreen from '../Screens/EvaluationAnalysisScreen';
import EvaluationDocumentsScreen from '../Screens/EvaluationDocumentScreen';
import EvaluationInformationScreen from '../Screens/EvaluationInformationScreen';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Theme from '../Components/Theme';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function EvaluationsScreen() {
  return (
    <Container>
      <Row>{/* <Breadcrumb /> */}</Row>
      <Row>
        <Col md={4}>
          <Row className="mt-3 mb-3 theme-height">{/* <Theme /> */}</Row>
          <Row className="mt-3 height">
            <ListGroup>
              <ListGroup.Item>
                <Link to="/EvaluationScreen/Analysis/:themeId">
                  Auswertungen
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/EvaluationScreen/Document/:themeId">Dokumente</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/EvaluationScreen/Information/:themeId">
                  Informationen
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
        <Col md={5}></Col>
        <Col md={3}>
          <Form className="height">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EvaluationsScreen;

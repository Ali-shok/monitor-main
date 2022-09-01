import React, { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BreadCrumb from '../Components/BreadCrumb';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import InformationTheme from '../Components/InformationTheme';
import { Container } from 'react-bootstrap';
import MessageBox from '../Components/MessageBox';
import LoadingBox from '../Components/LoadingBox';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FRETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, informations: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function EvaluationInformationScreen() {
  const { state } = useContext(Store);
  const { crumbs, userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      const fetchData = async () => {
        dispatch({ type: 'FRETCH_REQUEST' });
        try {
          const result = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetInformationen/46`,
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          );
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          console.log(result.data);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
      };
      fetchData();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const [{ loading, informations, error }, dispatch] = useReducer(reducer, {
    informations: [],
    error: '',
    loading: true,
  });

  return (
    <div className="container-fluid">
      <Row>
        <BreadCrumb crumbs={crumbs}></BreadCrumb>
        <Col md={3}>
          <h5 style={{ color: '#f5f5f5' }}>Bulding</h5>
          <div
            style={{
              cursor: 'auto',
              cursor: 'pointer',
              height: '8rem',
            }}
            className="card mt-3 "
          >
            <div className="card-body">
              <h5 className="card-title ">Sculen</h5>
            </div>
          </div>
          <div className="pt-3 ">
            <ul className="list-group color-button mb-3">
              <button
                onClick={() => {
                  navigate(`/evaluationAnalysis/${id}`);
                }}
                style={{
                  padding: '8px 0px',
                  border: 'none',
                  backgroundColor: '#2e2e2e',
                  color: '#f5f5f5',
                  textAlign: 'left',
                }}
                className="list-group-item"
              >
                Cras justo odio
              </button>
              <button
                onClick={() => {
                  navigate(`/evaluationDocument/${id}`);
                }}
                style={{
                  padding: '8px 0px',
                  border: 'none',
                  backgroundColor: '#2e2e2e',
                  color: '#f5f5f5',
                  textAlign: 'left',
                }}
                className="list-group-item"
              >
                Dapibus ac facilisis
              </button>
              <button
                onClick={() => {
                  navigate(`/evaluationInformation/${id}`);
                }}
                style={{
                  padding: '8px 0px',
                  border: 'none',
                  backgroundColor: '#2e2e2e',
                  color: '#f5f5f5',
                  textAlign: 'left',
                }}
                className="list-group-item color-butto"
              >
                - Morbi leo risus -
              </button>
            </ul>
          </div>
        </Col>
        <Col md={7}>
          <div
            style={{
              backgroundColor: '#5e5e5e',
              color: '#f5f5f5',
              overflow: 'auto',
              height: '500px',
            }}
          >
            {loading ? (
              <Container className="mt-3">
                <Row>
                  <Col md={12}>
                    <div className="center">
                      <LoadingBox />
                    </div>
                  </Col>
                </Row>
              </Container>
            ) : error ? (
              <Container className="mt-3">
                <MessageBox variant="warning">{error}</MessageBox>
              </Container>
            ) : (
              <Container>
                <div className="mt-3">
                  <Row>
                    {informations.map((info) => (
                      <Col key={info.ID} lg={4} className="mb-3 themes">
                        <InformationTheme info={info} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Container>
            )}
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
}
export default EvaluationInformationScreen;

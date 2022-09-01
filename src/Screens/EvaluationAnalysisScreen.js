import React, { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BreadCrumb from '../Components/BreadCrumb';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import AnalyisTheme from '../Components/AnalyisTheme';
import { Button } from 'react-bootstrap';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FRETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        elements: action.payload,
        loading: false,
        favourits: [],
      };
    case 'FETCH_SUCCESS_FAVOURITS':
      return {
        ...state,
        loading: false,
        favourits: action.payload,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function EvaluationAnalysisScreen() {
  const [isClicked, setIsClicked] = useState(false);
  const { state } = useContext(Store);
  const { crumbs, userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [{ loading, elements, error, favourits }, dispatch] = useReducer(
    reducer,
    {
      favourits: [],
      elements: [],
      error: '',
      loading: true,
    }
  );
  const getAllTheme = () => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      dispatch({ type: 'FRETCH_REQUEST' });
      try {
        const result = await axios.get(
          `https://www.geoware-gmbh.de/ViewerBackend/api/GetAuswertungen/${46}`,
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
    setIsClicked(false);
  };

  const getFavourite = async () => {
    const token = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const { data } = await axios.get(
        `https://www.geoware-gmbh.de/ViewerBackend/api/GetAuswertungen/${46}/Favorit`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: 'FETCH_SUCCESS_FAVOURITS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }
    setIsClicked(true);
  };

  useEffect(() => {
    if (userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      const fetchData = async () => {
        dispatch({ type: 'FRETCH_REQUEST' });
        try {
          const result = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetAuswertungen/${46}`,
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
                - Cras justo odio -
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
                className="list-group-item pl-0"
              >
                Morbi leo risus
              </button>
            </ul>
            <div className="d-grid gap-2 mb-2 mt-4">
              {!isClicked ? (
                <Button
                  onClick={() => getFavourite()}
                  variant="warning active"
                  style={{ backgroundColor: '#2e2e2e', color: '#f5f5f5' }}
                  size="md"
                >
                  Favuorite Theme
                </Button>
              ) : (
                <Button
                  onClick={() => getAllTheme()}
                  variant="warning active"
                  style={{ backgroundColor: '#2e2e2e', color: '#f5f5f5' }}
                  size="md"
                >
                  All Theme
                </Button>
              )}
            </div>
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
                    {!isClicked
                      ? elements.map((element) => (
                          <Col
                            key={element.ID}
                            sm={6}
                            lg={4}
                            className="mb-3 themes"
                          >
                            <AnalyisTheme element={element} />
                          </Col>
                        ))
                      : favourits.map((element) => (
                          <Col
                            key={element.ID}
                            sm={6}
                            lg={4}
                            className="mb-3 themes"
                          >
                            <AnalyisTheme element={element} />
                          </Col>
                        ))}
                  </Row>
                </div>
              </Container>
            )}
          </div>
        </Col>
        <Col md={2}>
          <h5 style={{ color: '#f5f5f5' }} className="m-auto">
            Beschreibung
          </h5>
          <textarea
            disabled
            style={{ backgroundColor: '#5e5e5e', color: '#f5f5f5' }}
            className=" mt-3 form-control"
            id="textAreaExample1"
            rows="5"
          ></textarea>
        </Col>
      </Row>
    </div>
  );
}

export default EvaluationAnalysisScreen;

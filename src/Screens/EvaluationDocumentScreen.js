import React, { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BreadCrumb from '../Components/BreadCrumb';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DocumentTheme from '../Components/DocumentTheme';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FRETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, documents: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_SUCCESS_FAVOURITS':
      return { ...state, favourits: action.payload, loading: false };

    default:
      return state;
  }
};

function EvaluationDocumentScreen() {
  const [{ loading, documents, error, favourits }, dispatch] = useReducer(
    reducer,
    {
      documents: [],
      favourits: [],
      error: '',
      loading: true,
    }
  );
  const { state } = useContext(Store);
  const { crumbs, userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      const fetchData = async () => {
        dispatch({ type: 'FRETCH_REQUEST' });
        try {
          const result = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetDokumente/46`,
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          );
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          const { data } = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetDokumente/46/Favorit
            `,
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          );
          dispatch({ type: 'FETCH_SUCCESS_FAVOURITS', payload: result.data });
          console.log(result.data);
          console.log(data);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
      };
      fetchData();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const getAllDocument = () => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      dispatch({ type: 'FRETCH_REQUEST' });
      try {
        const result = await axios.get(
          `https://www.geoware-gmbh.de/ViewerBackend/api/GetDokumente/${46}`,
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
        `https://www.geoware-gmbh.de/ViewerBackend/api/GetDokumente/${46}/Favorit`,
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
                - Dapibus ac facilisis -
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
                  onClick={() => getAllDocument()}
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
                      ? documents.map((document) => (
                          <Col key={document.ID} lg={12} className="mb-3">
                            <DocumentTheme document={document} />
                          </Col>
                        ))
                      : favourits.map((document) => (
                          <Col
                            key={document.ID}
                            lg={12}
                            className="mb-3 themes"
                          >
                            <DocumentTheme document={document} />
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

export default EvaluationDocumentScreen;

import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import Theme from '../Components/Theme';
import Breadcrumb from '../Components/BreadCrumb';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FRETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, themes: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, themes, error }, dispatch] = useReducer(reducer, {
    themes: [],
    error: '',
    loading: true,
  });
  const { state } = useContext(Store);
  const { userInfo, crumbs } = state;
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
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetThemen/${id}`,
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

  return loading ? (
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
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {crumbs.length === 1 ? (
        <Container>
          <h1 className="mb-3 text">Main Theme</h1>
        </Container>
      ) : null}
      {crumbs.length === 2 ? (
        <Container fluid>
          <Row>
            <Breadcrumb crumbs={crumbs} />
          </Row>
        </Container>
      ) : null}
      <Container>
        <div className="mt-3">
          <Row>
            {themes.map((theme) => (
              <Col key={theme.ID} sm={6} lg={4} className="mb-3 themes">
                <Theme theme={theme} route={`/theme/${theme.ThemenID}`} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default HomeScreen;

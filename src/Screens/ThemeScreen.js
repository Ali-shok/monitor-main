import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import Breadcrumb from "../Components/BreadCrumb.js";

import { Store } from "../Store";
import Theme from "../Components/Theme";

const reducer = (state, action) => {
  switch (action.type) {
    case "FRETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, analysiElement: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ThemeScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { themeId } = params;
  const crumbs = [];
  const [{ loading, analysiElement, error }, dispatch] = useReducer(reducer, {
    analysiElement: [],
    error: "",
    loading: true,
  });

  useEffect(() => {
    if (userInfo) {
      const fetchData = async () => {
        const token = JSON.parse(localStorage.getItem("userInfo"));
        dispatch({ type: "FRETCH_REQUEST" });
        try {
          const { data } = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetAuswertungen/${themeId}`,
            {
              headers: {
                jwtToken: `${token}`,
              },
            }
          );
          dispatch({ type: "FETCH_SUCCESS", payload: data });
          console.log(data);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: err.message });
        }
      };
      fetchData();
    } else {
      navigate("/login");
    }
  }, [themeId, userInfo, navigate]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="warning">{error}</MessageBox>
  ) : (
    <Container>
      <Breadcrumb crumbs={crumbs} />
      <Row>
        <Col>
          {analysiElement.map((theme) => (
            <Col key={theme.ID} sm={6} md={4} lg={4} className="mb-3">
              {/* <Theme theme={theme} route={`/theme/${theme.ThemenID}`} /> */}
            </Col>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ThemeScreen;

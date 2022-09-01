import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import LoginScreen from './Screens/LoginScreen';
import { useContext } from 'react';
import React from 'react';
import { Store } from './Store';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import EvaluationDocumentScreen from './Screens/EvaluationDocumentScreen';
import EvaluationInformationScreen from './Screens/EvaluationInformationScreen';
import EvaluationAnalysisScreen from './Screens/EvaluationAnalysisScreen';

function App() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxdispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text" href="/">
                  <img
                    alt=""
                    src="/assets/images/img_top_logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  InterMonitor
                </Navbar.Brand>
              </LinkContainer>
              {userInfo && (
                <Navbar.Brand>
                  <Link to="/login">
                    <Button
                      onClick={signOutHandler}
                      variant="outline-warning text"
                    >
                      Sign Out
                    </Button>
                  </Link>
                </Navbar.Brand>
              )}
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/theme/:id" element={<HomeScreen />} />
            <Route path="/" element={<Navigate to="/theme/0" />} />
            <Route
              path="/evaluationAnalysis/:id"
              element={<EvaluationAnalysisScreen />}
            />
            <Route
              path="/evaluationDocument/:id"
              element={<EvaluationDocumentScreen />}
            />
            <Route
              path="/evaluationInformation/:id"
              element={<EvaluationInformationScreen />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

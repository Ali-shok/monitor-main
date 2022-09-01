import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingBox() {
  return (
    <Spinner animation="border" role="status" style={{ color: '#dc9e1f' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingBox;

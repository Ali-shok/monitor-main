import React from 'react';
import Row from 'react-bootstrap/Row';

const breadcrumb = {
  backgroundColor: '#2e2e2e',
  border: '0.5px solid white',
  borderRadius: '0.37rem',
};

function Breadcrumb(props) {
  return (
    <ul className="breadcrumb" style={breadcrumb}>
      {props.crumbs.map((crumb, ci) => {
        return <li key={ci}>{crumb}</li>;
      })}
    </ul>
  );
}

export default Breadcrumb;

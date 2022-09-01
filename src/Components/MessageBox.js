import Alert from 'react-bootstrap/Alert';
import React from 'react';

function MessageBox(props) {
  return (
    <Alert
      style={{ backgroundColor: '#dc9e1f' }}
      variant={props.variant || 'warning'}
    >
      {props.children}
    </Alert>
  );
}

export default MessageBox;

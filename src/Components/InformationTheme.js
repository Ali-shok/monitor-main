import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function InformationTheme(props) {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>{props.info.Titel}</Accordion.Header>
        <Accordion.Body> {props.info.Text}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default InformationTheme;

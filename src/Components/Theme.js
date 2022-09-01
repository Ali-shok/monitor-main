import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Theme(props) {
  const { theme, route } = props;
  const fontColor = theme.Schriftfarbe;
  return (
    <Card
      style={{
        backgroundColor: theme.Hintergrundfarbe,
        color: fontColor,
      }}
    >
      <Card.Img
        variant="top"
        src={theme.Hintergrundbildpfad ? theme.Hintergrundbildpfad : null}
      />
      <Card.Body>
        <Link className="text" to={route}>
          <Card.Title>{theme.Name}</Card.Title>
        </Link>
        <Card.Text>d make up the bulk of the card's content.</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Theme;

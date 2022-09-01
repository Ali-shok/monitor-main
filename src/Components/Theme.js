import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

function Theme(props) {
  const { state, dispatch } = useContext(Store);
  const { crumbs } = state;
  const { theme, route } = props;
  const navigate = useNavigate();
  function handlerClick() {
    if (crumbs.length === 1) {
      crumbs.push(theme.Name);
      localStorage.setItem('crumbs', crumbs);
      navigate(route);
    } else if (crumbs.length === 2) {
      crumbs.push(theme.Name);
      localStorage.setItem('crumbs', crumbs);
      navigate(`/evaluationAnalysis/${theme.ID}`);
    }
  }

  return (
    <div
      onClick={handlerClick}
      className="card"
      style={{
        cursor: 'auto',
        cursor: 'pointer',
        width: '18rem',
        backgroundColor: theme.Hintergrundfarbe,
        fontColor: theme.Schriftfarbe,
      }}
    >
      {props.theme.Hintergrundbildpfad ? (
        <img
          className="card-img-top"
          src={`//www.geoware-gmbh.de/ViewerBackend/api/Img/${props.theme.Hintergrundbildpfad}`}
          alt="Card image cap"
        />
      ) : null}
      <div className="card-body">
        <h5 className="card-title ">{theme.Name}</h5>
      </div>
    </div>
  );
}

export default Theme;

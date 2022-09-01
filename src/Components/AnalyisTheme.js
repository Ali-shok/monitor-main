import React, { useState } from 'react';
import Axios from 'axios';
import LoadingBox from './LoadingBox';

function AnalyisTheme(props) {
  const [loading, setLoading] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const toggleFavourit = async (id) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo'));
    const { data } = await Axios.post(
      `https://www.geoware-gmbh.de/ViewerBackend/api/ToggleFavorit`,
      {
        elementTyp: 'Auswertung',
        elementId: `${id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    setLoading(false);
    if (data === 1) {
      props.element.IsFavorit1 = !props.element.IsFavorit1;
      setFavourite(true);
    }
  };
  return (
    <div className="gallery">
      {props.element.DateiName ? (
        <img
          src={`//www.geoware-gmbh.de/ViewerBackend/api/Img/${props.element.DateiName}`}
          alt="Cinque Terre"
          width="600"
          height="400"
        />
      ) : null}
      <div className="desc">
        {!loading ? (
          <i
            onClick={() => toggleFavourit(props.element.ID)}
            className={props.element.IsFavorit1 ? 'fas fa-star' : 'far fa-star'}
          ></i>
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
}

export default AnalyisTheme;

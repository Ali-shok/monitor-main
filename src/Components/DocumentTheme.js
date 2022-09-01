import React, { useState } from 'react';
import Axios from 'axios';
import LoadingBox from './LoadingBox';

function DocumentTheme(props) {
  const [loading, setLoading] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const toggleFavourit = async (id) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo'));
    const { data } = await Axios.post(
      `https://www.geoware-gmbh.de/ViewerBackend/api/ToggleFavorit`,
      {
        elementTyp: 'Dokument',
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
      props.document.IsFavorit1 = !props.document.IsFavorit1;
      setFavourite(true);
    }
  };

  return (
    <ul className="list-group-item" style={{ cursor: 'pointer' }}>
      <li className="list-item">
        <span>
          <i className="fa fa-file" style={{ fontSize: '24px' }}></i>
        </span>
        <span className="ps-2">{props.document.Name}</span>
        <span className="ps-1">
          {!loading ? (
            <i
              onClick={() => toggleFavourit(props.document.ID)}
              className={
                props.document.IsFavorit1 ? 'fas fa-star' : 'far fa-star'
              }
            ></i>
          ) : (
            <LoadingBox />
          )}
        </span>
      </li>
    </ul>
  );
}

export default DocumentTheme;

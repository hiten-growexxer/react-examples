import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewsItem(props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {hover && (
        <div
          style={{
            width: '20em',
            height: '25em',
            boxShadow: '1px 1px 15px grey',
            margin: '1em',
            display: 'flex',
            background: `grey`,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link to={props.article.url}  style={{ textDecoration: 'none', color: 'black' }}>View</Link>
        </div>
      )}
      {!hover && (
        <div
          style={{
            width: '20em',
            height: '25em',
            boxShadow: '1px 1px 15px grey',
            margin: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <img
            src={props.article.urlToImage}
            alt=""
            style={{ width: '20em', height: '20em', justifySelf: 'start' }}
          />
          <div style={{ margin: '10px' }}>
            {props.article.title.substring(0, 60)}...
          </div>
        </div>
      )}
    </div>
  );
}

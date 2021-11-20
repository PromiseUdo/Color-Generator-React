import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';
import { hex as contrast } from 'wcag-contrast';

const SingleColor = ({ rgb, weight}) => {
  const [alert, setAlert] = useState(false);
  const backgroundColor = rgb.join(',');
  const hex = rgbToHex(...rgb);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <article
      className={`color ${contrast(hex, '#fff') > 3 && 'color-light'} ${weight===0 && 'base-color'}`}
      style={{ background: `rgb(${backgroundColor})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;

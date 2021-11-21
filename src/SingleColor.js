import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';
import { hex as contrast } from 'wcag-contrast';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { Alert } from '@mui/material';

const SingleColor = ({ rgb, weight }) => {
  const [alert, setAlert] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);
  const [checked, setChecked] = useState(false);
  const backgroundColor = rgb.join(',');
  const hex = rgbToHex(...rgb);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
      setChecked(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <>
      <article
        className={`color ${contrast(hex, '#fff') > 3 && 'color-light'} ${
          weight === 0 && 'base-color'
        }`}
        style={{ background: `rgb(${backgroundColor})` }}
        onClick={() => {
          setAlert(true);
          setChecked(true);
          navigator.clipboard.writeText(hex);
        }}
        onMouseOver={() => setCopyIcon(true)}
        onMouseLeave={() => setCopyIcon(false)}
      >
        <p className="percent-value">{weight}%</p>
        <p className="color-value">{hex}</p>
        {alert ? (
          <DoneIcon
            style={{ fill: `${contrast(hex, '#fff') > 3 && 'beige'}` }}
          />
        ) : (
          copyIcon && (
            <ContentCopyIcon
              style={{ fill: `${contrast(hex, '#fff') > 3 && 'beige'}` }}
            />
          )
        )}
      </article>
      {alert && (
        <p className="alert">
          <Alert onClose={() => {}} severity="success">
            Copied to clipboard
          </Alert>
        </p>
      )}
    </>
  );
};

export default SingleColor;

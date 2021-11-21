import { useState, useEffect } from 'react';
import * as React from 'react';
import SingleColor from './SingleColor';
import { HexColorPicker } from 'react-colorful';
import {
  Button,
  TextField,
  Box,
  InputAdornment,
  withStyles,
} from '@mui/material';
import Values from 'values.js';
import { IconContext } from 'react-icons';

import { FaPercent } from 'react-icons/fa';

function App() {
  const [color, setColor] = useState('#f15025');
  const [percent, setPercent] = useState(10);
  const [inputError, setInputError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(percent));
  const [colorPicker, setColorPicker] = useState(false);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(percent);
    try {
      let colors = new Values(color).all(percent);
      setList(colors);
      setInputError(false);
    } catch (error) {
      setInputError(true);
    }
  };

  const handleChange = (color, percent) => {
    try {
      let colors = new Values(color).all(percent);
      setList(colors);
      setInputError(false);
    } catch (error) {
      setInputError(true);
    }
  };

  return (
    <>
      <Box className="container">
        <h3>Color Generator</h3>
        <button
          className="set-color-btn"
          style={{
            backgroundColor: !color ? '#f15025' : color,
            margin: '0 8px',
          }}
          onClick={() => {
            setColorPicker(!colorPicker);
          }}
        ></button>
        {colorPicker && (
          <HexColorPicker
            style={{ position: 'absolute' }}
            className="color-picker"
            color={color}
            onChange={(color) => {
              setColor(color);
              handleChange(color);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setColorPicker(false);
              }, 1000);
            }}
          />
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            label="Hex Code"
            color="primary"
            error={inputError && 'error'}
            onChange={(e) => {
              setColor(e.target.value);
              handleChange(e.target.value);
            }}
            value={color}
            placeholder="#f15025"
          />
          <TextField
            type="number"
            defaultValue="10"
            style={{ width: '100px', margin: '0 10px' }}
            onChange={(e) => {
              setPercent(parseInt(e.target.value));
              handleChange(color, parseInt(e.target.value));
            }}
            value={percent}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconContext.Provider value={{ color: 'beige' }}>
                    <FaPercent />
                  </IconContext.Provider>
                </InputAdornment>
              ),
            }}
            inputProps={{ min: 10, max: 100 }}
          />
        </form>
      </Box>

      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} {...color} />;
        })}
      </section>
    </>
  );
}

export default App;

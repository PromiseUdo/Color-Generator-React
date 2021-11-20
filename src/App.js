import React, { useState, useEffect } from 'react';
import SingleColor from './SingleColor';
import { HexColorPicker } from 'react-colorful';

import Values from 'values.js';

function App() {
  const [color, setColor] = useState('#f15025');
  const [percent, setPercent] = useState(10);
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(percent));
  const [colorPicker, setColorPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(percent);
    try {
      let colors = new Values(color).all(percent);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>

        <button
          className="set-color-btn"
          style={{
            backgroundColor: !color ? '#f15025' : color,
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
            onChange={setColor}
            onMouseLeave={() => {
              setTimeout(() => {
                setColorPicker(false);
              }, 1000);
            }}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            className={`${error ? 'error' : null} `}
            type="text"
            onChange={(e) => {
              setColor(e.target.value);
            }}
            value={color}
            placeholder="#f15025"
          />

          <input
            style={{ width: '80px', margin: '0 10px' }}
            type="number"
            value={percent}
            onChange={(e) => {
              setPercent(parseInt(e.target.value));
            }}
          />

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>

      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} {...color} />;
        })}
      </section>
    </>
  );
}

export default App;

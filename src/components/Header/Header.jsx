import React from 'react';
import { nanoid } from 'nanoid';

export default function Header({ baseValue }) {
  console.log(baseValue);
  console.log(Math.round(100 * 27.955555) / 100);

  return (
    <div>
      <ul>
        <h2>Buy</h2>
        {baseValue.map(el => (
          <li key={nanoid()}>
            {/* {el.ccy}: {el.buy} */}
            {el.ccy}: {Math.round(100 * el.buy) / 100}
          </li>
        ))}
      </ul>
      <ul>
        <h2>Sale</h2>
        {baseValue.map(el => (
          <li key={nanoid()}>
            {/* {el.ccy}: {el.sale} */}
            {el.ccy}: {Math.round(100 * el.sale) / 100}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import { nanoid } from 'nanoid';

export default function Header({ baseValue }) {
  const UAH = {
    ccy: 'UAH',
    buy: '1.00',
    sale: '1.00',
  };

  // console.log('baseValue', [...baseValue, UAH]);

  // console.log(Math.round(100 * 27.955555) / 100);

  return (
    <div>
      <ul>
        <h2>Buy</h2>
        {baseValue.map(el => (
          <li key={nanoid()}>
            {el.ccy}: {Math.round(100 * el.buy) / 100} {el.base_ccy}
          </li>
        ))}
      </ul>
      <ul>
        <h2>Sale</h2>
        {baseValue.map(el => (
          <li key={nanoid()}>
            {el.ccy}: {Math.round(100 * el.sale) / 100} {el.base_ccy}
          </li>
        ))}
      </ul>
    </div>
  );
}

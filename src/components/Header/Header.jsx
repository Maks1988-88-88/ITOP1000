import React from 'react';
import { nanoid } from 'nanoid';

export default function Header({ baseValue }) {

  const felterBaseValue = baseValue.filter(value => value.ccy !== 'UAH');

  return (
    <div>
      <ul>
        <h2>Buy</h2>
        {felterBaseValue.map(el => (
          <li key={nanoid()}>
            {el.ccy}: {Math.round(100 * el.buy) / 100} {el.base_ccy}
          </li>
        ))}
      </ul>
      <ul>
        <h2>Sale</h2>
        {felterBaseValue.map(el => (
          <li key={nanoid()}>
            {el.ccy}: {Math.round(100 * el.sale) / 100} {el.base_ccy}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';

import { nanoid } from 'nanoid';


export default function Convert({ baseValue, selectCurrency }) {
  return (
    <div>
      <input type="number" />
      <select value={selectCurrency}>
        {baseValue.map(value => (
          <option value={value.ccy} key={nanoid()}>
            {value.ccy}
          </option>
        ))}
      </select>
    </div>
  );
}

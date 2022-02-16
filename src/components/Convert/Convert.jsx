import React from 'react';

import { nanoid } from 'nanoid';

export default function Convert({
  baseValue,
  selectCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  console.log('amount', amount);
  //   async function max() {
  //     await amount;
  //       let a = amount;
  //       return a;
  //     }
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {baseValue.map(value => (
          <option value={value.ccy} key={nanoid()}>
            {value.ccy}
          </option>
        ))}
      </select>
    </div>
  );
}

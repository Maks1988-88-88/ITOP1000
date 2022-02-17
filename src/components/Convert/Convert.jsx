import React from 'react';
import PropTypes from 'prop-types';
import s from 'components/Convert/Convert.module.css';



import { nanoid } from 'nanoid';

export default function Convert({
  baseValue,
  selectCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  return (
    <div className={s.convertPostion}>
      <input
        type="number"
        value={amount}
        onChange={onChangeAmount}
        className={s.inputConvert}
      />
      <select
        value={selectCurrency}
        onChange={onChangeCurrency}
        className={s.selectConvert}
      >
        {baseValue.map(value => (
          <option value={value.ccy} key={nanoid()}>
            {value.ccy}
          </option>
        ))}
      </select>
    </div>
  );
}

Convert.propTypes = {
  baseValue: PropTypes.array,
  selectCurrency: PropTypes.string,
  onChangeCurrency: PropTypes.func,
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';
import s from 'components/Header/Header.module.css';



export default function Header({ baseValue }) {

  const felterBaseValue = baseValue.filter(value => value.ccy !== 'UAH');
  return (
    <div className={s.currencyPosition}>
      <ul className={s.currencyList}>
        {felterBaseValue.map(el => (
          <li key={el.ccy}>
            {el.ccy}: {Math.round(100 * el.buy) / 100} {el.base_ccy}
          </li>
        ))}
      </ul>
    </div>
  );
}

Header.propTypes = {
  baseValue: PropTypes.array.isRequired,
};
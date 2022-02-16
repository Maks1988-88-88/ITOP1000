import React, { useEffect, useState } from 'react';

import './App.css';
import Header from 'components/Header/Header';
import Convert from 'components/Convert/Convert';
import Section from 'components/Section/Section';

const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const UAH = {
  ccy: 'UAH',
  buy: '1.00',
  sale: '1.00',
};

function App() {
  const [baseValue, setBaseValue] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState([]);
  const [secondCurrency, setSecondCurrency] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data =>
        data.filter(value => value.ccy === 'USD' || value.ccy === 'EUR'),
      )
      .then(data => {
        setBaseValue(data);
        setFirstCurrency(data[0].ccy);
        setSecondCurrency(data[1].ccy);
      });
  }, []);

  return (
    <>
      <Section title="Header">
        <Header baseValue={baseValue} />
      </Section>
      <Section title="Convert">
        <Convert baseValue={baseValue} selectCurrency={firstCurrency} />
        <Convert baseValue={baseValue} selectCurrency={secondCurrency} />
      </Section>
    </>
  );
}

export default App;

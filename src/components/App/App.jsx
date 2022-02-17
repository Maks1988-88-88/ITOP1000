import React, { useEffect, useState } from 'react';

import './App.css';
import Header from 'components/Header/Header';
import Convert from 'components/Convert/Convert';
import Section from 'components/Section/Section';
import moment from 'moment';

const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const UAH = {
  ccy: 'UAH',
  buy: '1.00',
  sale: '1.00',
};

const today = `Exchange rate ${moment(Date.now()).format('DD/MM/YYYY')}`;

function App() {
  const [baseValue, setBaseValue] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [exchangeValue, setExchangeValue] = useState(1);
  const [exchangeSecondValue, setExchangeSecondValue] = useState(1);
  const [amountValue, setAmountValue] = useState(1);
  const [amountSecondCurrency, setAmountSecondCurrency] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => [UAH, ...data])
      .then(data =>
        data.filter(
          value =>
            value.ccy === 'USD' || value.ccy === 'EUR' || value.ccy === 'UAH',
        ),
      )
      .then(data => {
        setBaseValue(data);
        const firstSelectCurrency = data[1].ccy;
        const secondSelectCurrency = data[0].ccy;
        setFirstCurrency(firstSelectCurrency);
        setSecondCurrency(secondSelectCurrency);
        setExchangeValue(data[1].buy);
        setExchangeSecondValue(data[0].buy);
      });
  }, []);

  useEffect(() => {
    if (firstCurrency != null) {
      const exchangeValue = baseValue.filter(val => val.ccy === firstCurrency);
      setExchangeValue(exchangeValue[0].buy);
    }
  }, [firstCurrency, baseValue]);

  useEffect(() => {
    if (secondCurrency != null) {
      const exchangeValue = baseValue.filter(val => val.ccy === secondCurrency);
      setExchangeSecondValue(exchangeValue[0].buy);
    }
  }, [secondCurrency, baseValue]);

  function handleFirstChange(e) {
    setAmountValue(e.target.value);
    setAmountSecondCurrency(true);
  }

  function handleSecondChange(e) {
    setAmountValue(e.target.value);
    setAmountSecondCurrency(false);
  }

  let toAmount;
  let fromAmount;

  if (amountSecondCurrency) {
    fromAmount = amountValue;
    toAmount = (exchangeValue * amountValue) / exchangeSecondValue;
    toAmount = Math.round(100 * toAmount) / 100;
  } else {
    toAmount = amountValue;
    fromAmount = (exchangeSecondValue * amountValue) / exchangeValue;
    fromAmount = Math.round(100 * fromAmount) / 100;
  }

  return (
    <>
      <Section title={today}>
        <Header baseValue={baseValue} />
      </Section>
      <Section title="Convert">
        <Convert
          baseValue={baseValue}
          selectCurrency={firstCurrency}
          onChangeCurrency={e => setFirstCurrency(e.target.value)}
          onChangeAmount={handleFirstChange}
          amount={fromAmount}
        />
        <Convert
          baseValue={baseValue}
          selectCurrency={secondCurrency}
          onChangeCurrency={e => setSecondCurrency(e.target.value)}
          onChangeAmount={handleSecondChange}
          amount={toAmount}
        />
      </Section>
    </>
  );
}

export default App;

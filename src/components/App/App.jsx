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
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [exchangeValue, setExchangeValue] = useState();
  const [exchangeValue2, setExchangeValue2] = useState();
  const [amountValue, setAmountValue] = useState(1);
  const [amountSecondCurrency, setAmountSecondCurrency] = useState(true);

  // console.log('exchangeValue', exchangeValue);

  // let toAmount, fromAmount;
  // if (amountSecondCurrency) {
  //   fromAmount = amountValue;

  //   console.log('+++amountValue', amountValue);
  //   console.log('+++exchangeValue', exchangeValue);
  //   // console.log(amountValue);
  //   // console.log('exchangeValue', exchangeValue);
  //   toAmount = amountValue * exchangeValue;
  //   // console.log('toAmount', toAmount);
  //   console.log('---toAmount', toAmount);
  //   console.log('+++');
  // } else {
  //   toAmount = amountValue;

  //   console.log('---amountValue', amountValue);
  //   console.log('---exchangeValue', exchangeValue);

  //   fromAmount = amountValue / exchangeValue;
  //   // console.log('exchangeValue22', exchangeValue);
  //   console.log('---fromAmount', fromAmount);
  //   console.log('---');
  // }

  let toAmount, fromAmount;
  if (amountSecondCurrency) {
    fromAmount = amountValue;

    toAmount = (exchangeValue * amountValue) / exchangeValue2;
    console.log('exchangeValue', exchangeValue);
  } else {
    toAmount = amountValue;
    fromAmount = (exchangeValue2 * amountValue) / exchangeValue;
  }

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
        // console.log('baseValue', baseValue);
        setFirstCurrency(firstSelectCurrency);
        setSecondCurrency(secondSelectCurrency);
        setExchangeValue(data[1].buy);
        setExchangeValue2(data[0].buy);
      });
  }, []);

  useEffect(() => {
    if (firstCurrency != null && secondCurrency != null) {
      // console.log('maaxxxx');
      // console.log('setBaseValue', baseValue);
      // console.log('firstCurrency', firstCurrency);
      // console.log('secondCurrency', secondCurrency);
      // console.log('exchangeValue', exchangeValue);
      // console.log(baseValue.filter(val => val.ccy === secondCurrency));
      const test = baseValue.filter(val => val.ccy === firstCurrency);
      console.log(test[0].buy);
      setExchangeValue(test[0].buy);
    }
  }, [firstCurrency]);

  useEffect(() => {
    if (firstCurrency != null && secondCurrency != null) {
      // console.log('maaxxxx');
      // console.log('setBaseValue', baseValue);
      // console.log('firstCurrency', firstCurrency);
      // console.log('secondCurrency', secondCurrency);
      // console.log('exchangeValue', exchangeValue);
      // console.log(baseValue.filter(val => val.ccy === secondCurrency));

      const test = baseValue.filter(val => val.ccy === secondCurrency);
      console.log(test[0].buy);
      setExchangeValue2(test[0].buy);
      // setAmountValue(test[0].buy);
    }
  }, [secondCurrency]);

  async function handleFirstChange(e) {
    await setAmountValue(e.target.value);
    setAmountSecondCurrency(true);
    console.log('++--');
  }

  async function handleSecondChange(e) {
    await setAmountValue(e.target.value);
    setAmountSecondCurrency(false);
    console.log('+--+');
  }

  return (
    <>
      <Section title="Header">
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

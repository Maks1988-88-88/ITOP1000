import React, { useEffect, useState } from 'react';

import './App.css';
import Header from 'components/Header/Header';
import Section from 'components/Section/Section';


const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

function App() {
  const [baseValue, setBaseValue] = useState([]); 

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => data.filter(value => value.ccy === 'USD' || value.ccy === 'EUR'))
      .then(data => setBaseValue(data));
  }, []);

  return (
    <Section title="Header">
      <Header baseValue={baseValue} />
    </Section>
  );
}

export default App;

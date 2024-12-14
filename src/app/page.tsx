'use client';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import { Row } from './types';

const Home = () => {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    fetch('/api/sifre')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return data && <Table data={data} />;
};

export default Home;

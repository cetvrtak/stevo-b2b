'use client';
import { useEffect, useState } from 'react';
import Table from './components/Table';

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/sifre')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return data && <Table data={data} />;
};

export default Home;

'use client';
import { useEffect, useState } from 'react';
import ColumnSelection from './components/ColumnSelection';
import Table from './components/Table';
import { Row } from './types';

const Home = () => {
  const [data, setData] = useState<Row[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/sifre')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch('/api/kolone')
      .then((res) => res.json())
      .then((data) => setColumns(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => setSelectedColumns(columns), [columns]);

  const handleSelect = (column: string) => {
    setSelectedColumns((prev) => [...prev, column]);
  };

  const handleUnselect = (column: string) => {
    setSelectedColumns((prev) => prev.filter((col) => col !== column));
  };

  return (
    <>
      <Table data={data} selectedColumns={selectedColumns} columns={columns} />
      <ColumnSelection
        columns={columns}
        selectedColumns={selectedColumns}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
      />
    </>
  );
};

export default Home;

import { useState } from 'react';
import { Data, TableData } from '../types';

const Table: React.FC<Data> = (data) => {
  const tableData: TableData = data.data;

  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TableData>(tableData);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for 1 second delay
    const timeout = setTimeout(() => {
      if (value.length >= 3) {
        // Filter the table data
        const filtered = Object.values(tableData).filter((row) =>
          Object.values(row).some((cell) =>
            String(cell).toLowerCase().includes(value.toLowerCase())
          )
        );
        setFilteredData(filtered);
      } else {
        // Reset to full data if search term is less than 3 characters
        setFilteredData(tableData);
      }
    }, 1000);

    setDebounceTimeout(timeout);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />

      <table>
        <thead></thead>
        <tbody>
          {Object.values(filteredData).map((row) => {
            return (
              <tr key={row.id}>
                {Object.values(row).map((cell, index) => {
                  return <td key={`${row.id}-${index}`}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;

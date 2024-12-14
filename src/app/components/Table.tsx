import { useEffect, useState } from 'react';
import { Row } from '../types';

interface TableProps {
  data: Row[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for 1 second delay
    const timeout = setTimeout(() => {
      if (query.length >= 3) {
        // Filter the table data
        const filtered = data.filter((row) =>
          Object.values(row).some((cell) =>
            String(cell).toLowerCase().includes(query.toLowerCase())
          )
        );
        setFilteredData(filtered);
      } else {
        // Reset to full data if search term is less than 3 characters
        setFilteredData(data);
      }
    }, 1000);

    setDebounceTimeout(timeout);
  }, [data, query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
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
          {filteredData.map((row) => {
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

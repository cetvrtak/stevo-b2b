import { useEffect, useState } from 'react';
import { Row } from '../types';

interface TableProps {
  data: Row[];
  selectedColumns: string[];
}

const Table: React.FC<TableProps> = ({ data, selectedColumns }) => {
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
      const filtered = data.filter((row) =>
        selectedColumns.some(
          (column) =>
            query.length >= 3
              ? String(row[column]).toLowerCase().includes(query.toLowerCase()) // Filter by query if it's >= 3 characters
              : row[column] // Otherwise include rows where the column exists
        )
      );

      setFilteredData(filtered);
    }, 1000);

    setDebounceTimeout(timeout);
  }, [data, query, selectedColumns]);

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
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              {selectedColumns.map((column) => (
                <td key={`${row.id}-${column}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

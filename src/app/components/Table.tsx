import { useEffect, useState } from 'react';
import { Data, TableData } from '../types';

const Table = (data: Data) => {
  const [tableData, setTableData] = useState<TableData>(data.data);

  useEffect(() => {
    setTableData(data.data);
  }, [data]);

  return (
    <table>
      <thead></thead>
      <tbody>
        {Object.values(tableData).map((row) => {
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
  );
};

export default Table;

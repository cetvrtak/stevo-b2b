import React from 'react';

interface ColumnSelectionProps {
  columns: string[];
  selectedColumns: string[];
  onSelect: (column: string) => void;
  onUnselect: (column: string) => void;
}

const ColumnSelection: React.FC<ColumnSelectionProps> = ({
  columns,
  selectedColumns,
  onSelect,
  onUnselect,
}) => {
  const unselectedColumns = columns.filter(
    (col) => !selectedColumns.includes(col)
  );

  return selectedColumns.length === 0 ? (
    ''
  ) : (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #ccc',
        padding: '1rem',
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h3>Unselected Columns</h3>
        {columns
          .filter((column) => unselectedColumns.includes(column))
          .map((column) => (
            <div
              key={column}
              onDoubleClick={() => onSelect(column)}
              style={{
                padding: '0.5rem',
                border: '1px solid red',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {column}
            </div>
          ))}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h3>Selected Columns</h3>
        {columns
          .filter((column) => selectedColumns.includes(column))
          .map((column) => (
            <div
              key={column}
              onDoubleClick={() => onUnselect(column)}
              style={{
                padding: '0.5rem',
                border: '1px solid green',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {column}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColumnSelection;

import React from 'react';
import styles from '../page.module.css';

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
    <div className={styles.columnSelector}>
      <div className={styles.columnSelectorSection}>
        <h3>Unselected Columns</h3>
        {columns
          .filter((column) => unselectedColumns.includes(column))
          .map((column) => (
            <div
              key={column}
              onDoubleClick={() => onSelect(column)}
              className={styles.columnSelectorCard}
              style={{ border: '1px solid red' }}
            >
              {column.charAt(0).toLocaleUpperCase() + column.slice(1)}
            </div>
          ))}
      </div>
      <div className={styles.columnSelectorSection}>
        <h3>Selected Columns</h3>
        {columns
          .filter((column) => selectedColumns.includes(column))
          .map((column) => (
            <div
              key={column}
              onDoubleClick={() => onUnselect(column)}
              className={styles.columnSelectorCard}
              style={{ border: '1px solid green' }}
            >
              {column.charAt(0).toLocaleUpperCase() + column.slice(1)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColumnSelection;
